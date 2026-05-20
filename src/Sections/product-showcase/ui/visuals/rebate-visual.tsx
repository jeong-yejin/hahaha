import { useEffect, useRef, useState } from "react"

import { Ipad } from "@/registry/eldoraui/ipad"
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion"

interface Row {
  date: string
  volume: string
  rate: string
  chain: string
  amount: string
  payout: string
}

const TABLE_ROWS: Row[] = [
  { date: "2026-04-02", volume: "$142,883", rate: "55%", chain: "+$491.28", amount: "+$491.28", payout: "2026-04-03" },
  { date: "2026-04-01", volume: "$156,420", rate: "55%", chain: "+$537.94", amount: "+$537.94", payout: "2026-04-02" },
  { date: "2026-03-30", volume: "$148,761", rate: "55%", chain: "+$510.73", amount: "+$510.73", payout: "2026-04-01" },
  { date: "2026-03-22", volume: "$164,778", rate: "55%", chain: "+$564.38", amount: "+$564.38", payout: "2026-04-01" },
]

const DURATION_MS = 1600

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function RebateVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) {
      setProgress(1)
      return
    }
    const el = rootRef.current
    if (!el) return

    let rafId: number | null = null
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1)
          setProgress(easeOutCubic(t))
          if (t < 1) {
            rafId = requestAnimationFrame(tick)
          } else {
            rafId = null
          }
        }
        rafId = requestAnimationFrame(tick)
      },
      { rootMargin: "-10% 0px -10% 0px" },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduced])

  const money = (target: number) =>
    (target * progress).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  const integer = (target: number) => Math.round(target * progress).toLocaleString()
  const percent = (target: number) => Math.round(target * progress)

  return (
    <div ref={rootRef} className="w-full">
      <Ipad className="text-[#07070C]">
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.06)_100%),_#07070C] p-5 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-48 h-[520px] w-[680px] blur-3xl"
            style={{
              rotate: "-8deg",
              opacity: 0.34,
            }}
          />
        </div>
      </Ipad>
    </div>
  )
}
