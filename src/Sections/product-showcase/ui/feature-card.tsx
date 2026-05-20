import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState, type JSX, type ReactNode } from "react"

import { useScrollReveal } from "@/Sections/product-showcase/hooks/use-scroll-reveal"
import type { FeatureItem } from "@/Sections/product-showcase/model/feature-data"
import {
  FeatureCta,
  FeatureProduct,
  FeatureTagline,
  FeatureText,
} from "@/Sections/product-showcase/ui/feature-text"
import {
  LabsVisual,
  RebateVisual,
  TerminalVisual,
} from "@/Sections/product-showcase/ui/visuals"

const STANDARD_VISUALS: Record<string, () => JSX.Element> = {
  "feature-terminal": TerminalVisual,
  "feature-rebate": RebateVisual,
  "feature-labs": LabsVisual,
}

interface FeatureCardProps {
  item: FeatureItem
  index: number
}

function VisualHover({ children }: { children: ReactNode }) {
  return (
    <div className="group overflow-hidden rounded-2xl">
      <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  )
}

function TerminalHero({ item }: { item: FeatureItem }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-12">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-3">
            <FeatureProduct item={item} />
            <div className="flex flex-col gap-4">
              <FeatureTagline item={item} />
              <p data-sr className="text-[20px] font-medium leading-[1.3] tracking-[-0.02em] text-[#D4D4D4]">
                {item.description}
              </p>
            </div>
          </div>
          <FeatureCta item={item} />
        </div>
        <p data-sr className="text-right text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-[#D4D4D4]">
          Charts, order books, positions, and live trader chat
          <br />
          — across Bybit, OKX, and Binance, all from one workflow
        </p>
      </div>

      <div
        className="mx-auto w-full"
        style={{ maxWidth: "min(1000px, calc(50vh * 1536 / 1024))" }}
      >
        <VisualHover>
          <TerminalVisual />
        </VisualHover>
      </div>
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

const REBATE_HORIZONTAL_PADDING = 240
const IPAD_SCREEN_RATIO = 0.8794
const REBATE_CARD_PIN_SCALE = 0.91

function RebateHero({ item }: { item: FeatureItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ipadFrameRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const rotateX = useMotionValue(20)
  const scale = useMotionValue(0.7)

  useEffect(() => {
    const card = containerRef.current?.closest("[data-feature-card]") as HTMLElement | null
    if (!card) return

    const motionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null
    let prefersReducedMotion = motionQuery?.matches ?? false

    const absTop = (el: HTMLElement) => {
      let top = 0
      let cur: HTMLElement | null = el
      while (cur) {
        top += cur.offsetTop
        cur = cur.offsetParent as HTMLElement | null
      }
      return top
    }

    let cardTop = 0
    let maxScale = 1
    let expandRange = 0
    let vhCache = 0
    let entryStart = 0
    let entryRange = 0
    let rafId: number | null = null

    const measure = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      vhCache = vh
      cardTop = absTop(card)
      expandRange = 0.6 * vh
      entryStart = cardTop - vh
      entryRange = vh - 0.25 * vh

      if (isMobile) {
        maxScale = 1
        return
      }

      const ipadNaturalWidth = Math.min(820, 0.546 * vh)
      const targetScreenWidth = vw - REBATE_HORIZONTAL_PADDING
      const maxScaleX =
        targetScreenWidth / (ipadNaturalWidth * REBATE_CARD_PIN_SCALE * IPAD_SCREEN_RATIO)

      const ipadFrame = ipadFrameRef.current
      const grid = gridRef.current
      let maxScaleY = Infinity
      if (ipadFrame && grid) {
        const ipadH = ipadFrame.offsetHeight
        const gap = grid.offsetTop - (ipadFrame.offsetTop + ipadH)
        if (ipadH > 0 && gap > 0) {
          maxScaleY = 1 + (2 * gap) / ipadH
        }
      }

      maxScale = Math.max(1, Math.min(maxScaleX, maxScaleY))
    }

    const update = () => {
      rafId = null
      const scrollTop = window.scrollY

      const ep = Math.max(0, Math.min(1, (scrollTop - entryStart) / entryRange))
      const easedEntry = 1 - Math.pow(1 - ep, 3)

      rotateX.set(prefersReducedMotion ? 0 : 20 * (1 - easedEntry))
      const entryScale = prefersReducedMotion
        ? 1
        : isMobile
          ? 0.7 + 0.2 * easedEntry
          : 0.7 + 0.3 * easedEntry

      if (isMobile || prefersReducedMotion) {
        scale.set(entryScale)
        return
      }

      const grid = gridRef.current
      let xp = 0
      if (grid) {
        const gridBottom = grid.getBoundingClientRect().bottom
        xp = Math.max(0, Math.min(1, (vhCache + expandRange - gridBottom) / expandRange))
      }
      const eased = 1 - Math.pow(1 - xp, 3)
      const expandFactor = 1 + (maxScale - 1) * eased

      scale.set(entryScale * expandFactor)
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      if (rafId === null) rafId = requestAnimationFrame(update)
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches
      if (rafId === null) rafId = requestAnimationFrame(update)
    }

    measure()
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    motionQuery?.addEventListener("change", onMotionChange)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      motionQuery?.removeEventListener("change", onMotionChange)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [isMobile, rotateX, scale])

  return (
    <div ref={containerRef} className="relative flex flex-col gap-20">
      <div
        ref={ipadFrameRef}
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: "min(820px, calc(42vh * 520 / 400))",
          perspective: "1000px",
        }}
      >
        <motion.div
          style={{
            rotateX,
            scale,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <RebateVisual />
        </motion.div>
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-12"
      >
        <FeatureText item={item} />
        <p data-sr className="text-right text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-[#D4D4D4]">
          Every fee you pay across Exchanges
          <br />
          — more is rebated on-chain to your EVM wallet within 36 hours
        </p>
      </div>
    </div>
  )
}

function StandardBody({ item, index }: FeatureCardProps) {
  const VisualComponent = STANDARD_VISUALS[item.id]
  if (!VisualComponent) return null

  if (item.id === "feature-terminal") return <TerminalHero item={item} />
  if (item.id === "feature-rebate") return <RebateHero item={item} />

  const textLeft = index % 2 === 0
  const visual = <VisualHover><VisualComponent /></VisualHover>

  return (
    <div className="features-row">
      {textLeft ? (
        <>
          <FeatureText item={item} />
          {visual}
        </>
      ) : (
        <>
          {visual}
          <FeatureText item={item} />
        </>
      )}
    </div>
  )
}

export function ProductFeatureCard({ item, index }: FeatureCardProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  useScrollReveal(rowRef)

  return (
    <div
      id={item.id}
      ref={rowRef}
      data-feature-card
      style={{ backgroundColor: item.bg }}
      className="features-band scroll-mt-28"
    >
      <div className="features-band-inner">
        <StandardBody item={item} index={index} />
      </div>
    </div>
  )
}
