import { useEffect, useRef, type CSSProperties } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"

import { FEATURES, type FeatureItem } from "@/components/features/feature-data"
import { FeatureText } from "@/components/features/feature-text"
import { FEATURE_VISUALS } from "@/components/features/visuals"

gsap.registerPlugin(ScrollTrigger)

const STACK_POSITION_PCT = 0.18
const SCALE_END_PCT = 0.10
const ITEM_STACK_DISTANCE = 30
const BASE_SCALE = 0.88
const ITEM_SCALE = 0.03

interface FeatureRowProps {
  item: FeatureItem
  index: number
}

function FeatureRow({ item, index }: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const textLeft = index % 2 === 0
  const VisualComponent = FEATURE_VISUALS[index]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sr]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 82%",
          },
        },
      )
    }, rowRef)

    return () => ctx.revert()
  }, [])

  if (!VisualComponent) return null

  const accentStyle = {
    "--accent": item.accent.primary,
    "--accent-rgb": item.accent.primaryRgb,
    "--atmosphere-from": item.accent.atmosphereFrom,
    "--atmosphere-to": item.accent.atmosphereTo,
  } as CSSProperties

  const indexLabel = String(index + 1).padStart(2, "0")

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
      </div>
    </div>
  )
}

export function Features() {
  const stackRef = useRef<HTMLDivElement>(null)
  const entryRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "start 30%"],
  })
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

  useEffect(() => {
    const container = stackRef.current
    if (!container) return
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-feature-card]"),
    )
    if (!cards.length) return

    cards.forEach((card) => {
      card.style.willChange = "transform"
      card.style.transformOrigin = "top center"
      card.style.backfaceVisibility = "hidden"
    })

    let naturalTops: number[] = []
    let endTop = 0
    const last = new Map<number, { y: number; s: number }>()
    let rafId: number | null = null

    // offsetTop-based; ignores ancestor CSS transforms so the entry
    // animation's rotateX/scale doesn't bias the stack measurements.
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
      last.clear()
      naturalTops = cards.map(absoluteTop)
      const endEl = container.querySelector<HTMLElement>(".feature-stack-end")
      endTop = endEl
        ? absoluteTop(endEl)
        : naturalTops[naturalTops.length - 1] +
          cards[cards.length - 1].offsetHeight
    }

    const update = () => {
      const scrollTop = window.scrollY
      const vh = window.innerHeight
      const stackPx = STACK_POSITION_PCT * vh
      const scaleEndPx = SCALE_END_PCT * vh
      const pinEnd = endTop - vh / 2

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
    }
  }, [])

  return (
    <section id="features" className="features-section scroll-mt-24">
      <div ref={entryRef} style={{ perspective: "1200px" }}>
        <motion.div
          style={{
            rotateX,
            scale,
            transformOrigin: "top center",
          }}
        >
          <div ref={stackRef} className="features-bands">
            {FEATURES.map((feature, index) => (
              <FeatureRow key={feature.product} item={feature} index={index} />
            ))}
            <div className="feature-stack-end" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
