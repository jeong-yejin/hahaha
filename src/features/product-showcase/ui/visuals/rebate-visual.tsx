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
              background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
              rotate: "-8deg",
              opacity: 0.34,
            }}
          />

          <div className="relative">
            <h4 className="text-[16px] font-bold tracking-tight text-white">Exchange Rebate Details</h4>

            <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 ring-1 ring-white/10">
              <span className="text-[11px] font-medium text-[#A3A3A3]">UID</span>
              <span className="text-[12px] font-semibold tracking-wide text-white tabular-nums">12048293</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                <div className="text-[11px] text-[#A3A3A3]">Total Payback Earned</div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[22px] font-bold tabular-nums tracking-tight text-white">{money(2104.33)}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]">USDT</span>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                <div className="text-[11px] text-[#A3A3A3]">Total Trading Volume</div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[22px] font-bold tabular-nums tracking-tight text-white">{integer(612842)}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]">USDT</span>
                </div>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-white/10">
                <div className="grid grid-cols-[1.05fr_1fr_0.65fr_0.95fr_0.95fr_1fr_0.75fr] gap-2 border-b border-white/[0.06] px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-[#777]">
                  <div>Trade Date</div>
                  <div>Trading Volume</div>
                  <div>Rate (%)</div>
                  <div>On-Chain</div>
                  <div>Payback</div>
                  <div>Payout Date</div>
                  <div>Method</div>
                </div>
                {TABLE_ROWS.map((r) => (
                  <div
                    key={r.date}
                    className="grid grid-cols-[1.05fr_1fr_0.65fr_0.95fr_0.95fr_1fr_0.75fr] items-center gap-2 border-b border-white/[0.04] px-4 py-2.5 text-[11px] text-[#D4D4D4] last:border-0"
                  >
                    <div className="tabular-nums">{r.date}</div>
                    <div className="tabular-nums">{r.volume}</div>
                    <div className="tabular-nums">{r.rate}</div>
                    <div className="tabular-nums text-[#9CF98F]">{r.chain}</div>
                    <div className="tabular-nums text-[#9CF98F]">{r.amount}</div>
                    <div className="tabular-nums">{r.payout}</div>
                    <div>
                      <span className="inline-flex items-center rounded bg-[#CAFF5D]/15 px-2 py-0.5 text-[9px] font-bold text-[#CAFF5D]">
                        On-chain
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute right-3 top-6 w-[240px] rounded-2xl bg-[#16161A]/95 p-4 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur">
                <div className="text-[12px] font-bold text-white">Share PnL</div>
                <div className="mt-3 flex items-start gap-3">
                  <div className="text-[28px] font-bold leading-none tabular-nums tracking-tight text-[#CAFF5D]">
                    +{percent(55)}%
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#A3A3A3]">Total Trading Fees</div>
                    <div className="text-[12px] font-bold tabular-nums text-white">{money(3826.05)} USDT</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-[#A3A3A3]">Total Payback</div>
                    <div className="text-[12px] font-bold tabular-nums text-white">{money(3826.05)} USDT</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#A3A3A3]">Payback Rate</div>
                    <div className="text-[12px] font-bold tabular-nums text-[#CAFF5D]">{percent(55)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Ipad>
    </div>
  )
}
