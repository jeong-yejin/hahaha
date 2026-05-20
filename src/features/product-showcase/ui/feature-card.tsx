import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState, type CSSProperties, type JSX, type ReactNode } from "react"

import { useScrollReveal } from "@/features/product-showcase/hooks/use-scroll-reveal"
import type { FeatureItem } from "@/features/product-showcase/model/feature-data"
import {
  FeatureCta,
  FeatureProduct,
  FeatureTagline,
  FeatureText,
} from "@/features/product-showcase/ui/feature-text"
import {
  LabsVisual,
  RebateVisual,
  TerminalVisual,
} from "@/features/product-showcase/ui/visuals"

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
      <div className="flex w-full flex-col items-start gap-8">
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

      <div
        className="mx-auto w-full"
        style={{ maxWidth: "min(900px, calc(36vh * 1536 / 1024))" }}
      >
        <VisualHover>
          <TerminalVisual />
        </VisualHover>
      </div>

      <div className="flex w-full justify-end">
        <p data-sr className="text-right text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-[#D4D4D4]">
          Charts, order books, positions, and live trader chat
          <br />
          — across Bybit, OKX, and Binance, all from one workflow
        </p>
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

function RebateHero({ item }: { item: FeatureItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 25%"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1],
  )

  return (
    <div ref={containerRef} className="flex flex-col gap-10">
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "min(820px, calc(42vh * 520 / 400))",
          perspective: "1000px",
        }}
      >
        <motion.div style={{ rotateX, scale }}>
          <RebateVisual />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-12">
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

  const accentStyle = {
    "--accent": item.accent.primary,
    "--accent-rgb": item.accent.primaryRgb,
    "--atmosphere-from": item.accent.atmosphereFrom,
    "--atmosphere-to": item.accent.atmosphereTo,
  } as CSSProperties

  return (
    <div
      id={item.id}
      ref={rowRef}
      data-feature-card
      style={{ ...accentStyle, backgroundColor: item.bg }}
      className="features-band scroll-mt-28"
    >
      <div className="features-band-inner">
        <StandardBody item={item} index={index} />
      </div>
    </div>
  )
}
