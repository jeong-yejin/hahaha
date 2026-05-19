import { useEffect, useRef, type CSSProperties } from "react"

import { FEATURES, type FeatureItem } from "@/components/features/feature-data"
import {
  FeatureCta,
  FeatureDescription,
  FeatureTagline,
  FeatureText,
} from "@/components/features/feature-text"
import {
  LabsVisual,
  RebateVisual,
  TerminalFeedPanel,
  TerminalMainPanel,
} from "@/components/features/visuals"

const STACK_POSITION_PCT = 0.18
const SCALE_END_PCT = 0.10
const ITEM_STACK_DISTANCE = 30
const BASE_SCALE = 0.88
const ITEM_SCALE = 0.03
const ENTRY_ROTATE_X = 20
const ENTRY_SCALE_FROM = 1.05
const ENTRY_END_PCT = 0.30

const TERMINAL_ID = "feature-terminal"

const STANDARD_VISUALS: Record<string, () => JSX.Element> = {
  "feature-rebate": RebateVisual,
  "feature-labs": LabsVisual,
}

interface FeatureBodyProps {
  item: FeatureItem
  index: number
}

function StandardBody({ item, index }: FeatureBodyProps) {
  const VisualComponent = STANDARD_VISUALS[item.id]
  if (!VisualComponent) return null
  const textLeft = index % 2 === 0

  return (
    <div className="features-row">
      {textLeft ? (
        <>
          <FeatureText item={item} />
          <VisualComponent />
        </>
      ) : (
        <>
          <VisualComponent />
          <FeatureText item={item} />
        </>
      )}
    </div>
  )
}

function TerminalBody({ item }: { item: FeatureItem }) {
  return (
    <div className="features-terminal-grid">
      <div className="features-terminal-left">
        <div>
          <FeatureTagline item={item} />
          <div className="mt-9">
            <FeatureCta item={item} />
          </div>
        </div>
        <TerminalMainPanel />
      </div>
      <div className="features-terminal-right">
        <TerminalFeedPanel />
        <FeatureDescription item={item} />
      </div>
    </div>
  )
}

function FeatureRow({ item, index }: FeatureBodyProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const items = Array.from(
      row.querySelectorAll<HTMLElement>("[data-sr]"),
    )
    if (!items.length) return

    items.forEach((el, i) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(28px)"
      el.style.willChange = "opacity, transform"
      el.style.transition =
        `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 90}ms, ` +
        `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 90}ms`
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          items.forEach((el) => {
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
          })
          window.setTimeout(() => {
            items.forEach((el) => {
              el.style.willChange = ""
            })
          }, 900 + items.length * 90)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    )
    io.observe(row)

    return () => io.disconnect()
  }, [])

  const accentStyle = {
    "--accent": item.accent.primary,
    "--accent-rgb": item.accent.primaryRgb,
    "--atmosphere-from": item.accent.atmosphereFrom,
    "--atmosphere-to": item.accent.atmosphereTo,
  } as CSSProperties

  const indexLabel = String(index + 1).padStart(2, "0")
  const isTerminal = item.id === TERMINAL_ID

  return (
    <div
      id={item.id}
      ref={rowRef}
      data-feature-card
      style={{ ...accentStyle, backgroundColor: item.bg }}
      className="features-band scroll-mt-28"
    >
      <div className="features-band-inner">
        <div data-sr className="features-meta">
          <span className="features-index">{indexLabel}</span>
          <span className="features-meta-divider" />
          <span className="features-meta-product">{item.product}</span>
        </div>
        {isTerminal ? <TerminalBody item={item} /> : <StandardBody item={item} index={index} />}
      </div>
    </div>
  )
}

export function Features() {
  const stackRef = useRef<HTMLDivElement>(null)
  const entryRef = useRef<HTMLDivElement>(null)
  const transformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = stackRef.current
    const entryEl = entryRef.current
    const transformEl = transformRef.current
    if (!container || !entryEl || !transformEl) return
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-feature-card]"),
    )
    if (!cards.length) return

    cards.forEach((card) => {
      card.style.willChange = "transform"
      card.style.transformOrigin = "top center"
      card.style.backfaceVisibility = "hidden"
    })
    transformEl.style.willChange = "transform"
    transformEl.style.transformOrigin = "top center"
    transformEl.style.backfaceVisibility = "hidden"

    let naturalTops: number[] = []
    let endTop = 0
    let entryTop = 0
    const last = new Map<number, { y: number; s: number }>()
    let lastEntry: { r: number; s: number } | null = null
    let rafId: number | null = null

    const absoluteTop = (el: HTMLElement) => {
      let top = 0
      let curr: HTMLElement | null = el
      while (curr) {
        top += curr.offsetTop
        curr = curr.offsetParent as HTMLElement | null
      }
      return top
    }

    const measure = () => {
      cards.forEach((c) => {
        c.style.transform = ""
      })
      transformEl.style.transform = ""
      last.clear()
      lastEntry = null
      naturalTops = cards.map(absoluteTop)
      const endEl = container.querySelector<HTMLElement>(".feature-stack-end")
      endTop = endEl
        ? absoluteTop(endEl)
        : naturalTops[naturalTops.length - 1] +
          cards[cards.length - 1].offsetHeight
      entryTop = absoluteTop(entryEl)
    }

    const update = () => {
      const scrollTop = window.scrollY
      const vh = window.innerHeight
      const stackPx = STACK_POSITION_PCT * vh
      const scaleEndPx = SCALE_END_PCT * vh
      const pinEnd = endTop - vh / 2

      const entryStart = entryTop - vh
      const entryEnd = entryTop - ENTRY_END_PCT * vh
      const ep =
        scrollTop < entryStart
          ? 0
          : scrollTop > entryEnd
            ? 1
            : (scrollTop - entryStart) / (entryEnd - entryStart)
      const rx = ENTRY_ROTATE_X * (1 - ep)
      const esc = ENTRY_SCALE_FROM - (ENTRY_SCALE_FROM - 1) * ep
      const nrx = Math.round(rx * 100) / 100
      const nesc = Math.round(esc * 1000) / 1000
      if (
        !lastEntry ||
        Math.abs(lastEntry.r - nrx) > 0.01 ||
        Math.abs(lastEntry.s - nesc) > 0.001
      ) {
        transformEl.style.transform = `rotateX(${nrx}deg) scale(${nesc})`
        lastEntry = { r: nrx, s: nesc }
      }

      cards.forEach((card, i) => {
        const cardTop = naturalTops[i]
        const pinStart = cardTop - stackPx - ITEM_STACK_DISTANCE * i
        const triggerEnd = cardTop - scaleEndPx

        const sp =
          scrollTop < pinStart
            ? 0
            : scrollTop > triggerEnd
              ? 1
              : (scrollTop - pinStart) / (triggerEnd - pinStart)

        const target = BASE_SCALE + i * ITEM_SCALE
        const scale = 1 - sp * (1 - target)

        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPx + ITEM_STACK_DISTANCE * i
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPx + ITEM_STACK_DISTANCE * i
        }

        const ny = Math.round(translateY * 100) / 100
        const ns = Math.round(scale * 1000) / 1000
        const prev = last.get(i)
        if (
          !prev ||
          Math.abs(prev.y - ny) > 0.1 ||
          Math.abs(prev.s - ns) > 0.001
        ) {
          card.style.transform = `translate3d(0, ${ny}px, 0) scale(${ns})`
          last.set(i, { y: ny, s: ns })
        }
      })
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (rafId !== null) cancelAnimationFrame(rafId)
      cards.forEach((c) => {
        c.style.transform = ""
        c.style.willChange = ""
        c.style.transformOrigin = ""
        c.style.backfaceVisibility = ""
      })
      transformEl.style.transform = ""
      transformEl.style.willChange = ""
      transformEl.style.transformOrigin = ""
      transformEl.style.backfaceVisibility = ""
    }
  }, [])

  return (
    <section id="features" className="features-section scroll-mt-24">
      <div ref={entryRef} style={{ perspective: "1200px" }}>
        <div ref={transformRef}>
          <div ref={stackRef} className="features-bands">
            {FEATURES.map((feature, index) => (
              <FeatureRow key={feature.product} item={feature} index={index} />
            ))}
            <div className="feature-stack-end" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
