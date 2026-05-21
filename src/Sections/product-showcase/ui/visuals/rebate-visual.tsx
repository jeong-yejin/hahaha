import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { Ipad } from "@/registry/eldoraui/ipad"
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion"

const ASSET_BASE = "/rebate-calc"
const DESIGN_WIDTH = 820

const MIN_TRADES = 3
const MAX_TRADES = 50
const PER_TRADE_USDT = 19.2

const ANIM_RAMP = 2500

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function RebateVisual() {
  const screenRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [trades, setTrades] = useState<number>(MIN_TRADES)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const el = screenRef.current
    if (!el) return
    const update = () => {
      setScale(el.clientWidth / DESIGN_WIDTH)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = screenRef.current
    if (!el) return

    if (reducedMotion) {
      setTrades(MAX_TRADES)
      return
    }

    let raf = 0
    let startTime = 0
    let started = false
    let finished = false

    const tick = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime

      if (elapsed >= ANIM_RAMP) {
        setTrades(MAX_TRADES)
        finished = true
        return
      }
      const t = easeInOutCubic(elapsed / ANIM_RAMP)
      setTrades(MIN_TRADES + (MAX_TRADES - MIN_TRADES) * t)
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started && !finished) {
          started = true
          startTime = 0
          raf = requestAnimationFrame(tick)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <div className="w-full">
      <Ipad className="text-[#07080a]">
        <div
          ref={screenRef}
          className="relative h-full w-full overflow-hidden bg-[#07080a]"
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: DESIGN_WIDTH,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <RebateCalculator trades={trades} />
          </div>
        </div>
      </Ipad>
    </div>
  )
}

function RebateCalculator({ trades }: { trades: number }) {
  return (
    <div className="flex h-full w-full flex-col gap-5 p-6">
      <Heading />
      <div className="flex flex-1 items-stretch gap-10">
        <InputColumn trades={trades} />
        <ResultPanel trades={trades} />
      </div>
    </div>
  )
}

function Heading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-1 text-[24px] font-bold leading-[1.4] tracking-[-0.005em] whitespace-nowrap">
        <span className="text-white">Check Expected Rebates in</span>
        <span className="text-[#caff5d]">3 Seconds</span>
      </div>
      <p className="text-[16px] leading-[1.6] text-[#d4d4d4]">
        See how much you’re leaking in fees
      </p>
    </div>
  )
}

function InputColumn({ trades }: { trades: number }) {
  return (
    <div className="flex w-[380px] shrink-0 flex-col gap-5">
      <ExchangeSelector />
      <SeedAmountField />
      <LeverageSlider />
      <FrequencySlider trades={trades} />
    </div>
  )
}

function ExchangeSelector() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-bold leading-[1.4] text-white">
        Please select an exchange
      </p>
      <div className="flex items-center gap-4">
        <ExchangeBinance selected />
        <ExchangeHyperliquid />
        <ExchangeBybit />
        <ExchangeFlipster />
        <ExchangeOKX />
        <ExchangeBitget />
      </div>
    </div>
  )
}

function ExchangeBinance({ selected }: { selected?: boolean }) {
  return (
    <div
      className={`flex size-9 items-center justify-center rounded-full bg-[#f0b90b] p-1 ${
        selected ? "border-[3px] border-[#f5f5f5]" : ""
      }`}
    >
      <img
        src={`${ASSET_BASE}/binance.svg`}
        alt="Binance"
        className="block size-full"
      />
    </div>
  )
}

function ExchangeHyperliquid() {
  return (
    <div className="size-9 opacity-70">
      <img
        src={`${ASSET_BASE}/hyperliquid.png`}
        alt="Hyperliquid"
        className="block size-full"
      />
    </div>
  )
}

function ExchangeBybit() {
  return (
    <div className="flex size-9 items-center justify-center rounded-3xl border border-white/20 bg-[#15192a] opacity-70">
      <span className="text-[10px] font-bold tracking-[-0.02em] text-white">
        BY<span className="text-[#F6A500]">·</span>BIT
      </span>
    </div>
  )
}

function ExchangeFlipster() {
  return (
    <div className="relative size-9 opacity-70">
      <img
        src={`${ASSET_BASE}/flipster-circle.svg`}
        alt=""
        className="absolute inset-0 size-full"
      />
      <img
        src={`${ASSET_BASE}/flipster-icon.svg`}
        alt="Flipster"
        className="absolute left-1/2 top-1/2 h-6 w-4 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}

function ExchangeOKX() {
  return (
    <div className="size-9 opacity-70">
      <img
        src={`${ASSET_BASE}/okx.svg`}
        alt="OKX"
        className="block size-full"
      />
    </div>
  )
}

function ExchangeBitget() {
  return (
    <div className="flex size-9 items-center justify-center rounded-3xl border border-white/[0.06] bg-[#0a0a0a] opacity-70">
      <img
        src={`${ASSET_BASE}/bitget.svg`}
        alt="Bitget"
        className="block size-8"
      />
    </div>
  )
}

function SeedAmountField() {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-[16px] font-bold leading-[1.6] text-[#d4d4d4]">
        Seed Amount(USDT)
      </p>
      <div className="flex w-full items-center rounded-xl border border-white/20 bg-[#171717] px-3 py-3">
        <p className="flex-1 text-[16px] leading-[1.6] text-[#f5f5f5]">1000</p>
      </div>
    </div>
  )
}

function LeverageSlider() {
  return (
    <SliderBlock
      label="Leverage"
      tooltip="100x"
      progressPercent={98.78}
      labels={["1x", "50x", "100x"]}
    />
  )
}

function FrequencySlider({ trades }: { trades: number }) {
  const percent = ((trades - 1) / (100 - 1)) * 100
  const rounded = Math.round(trades)
  const tooltip = rounded === 1 ? "1 time" : `${rounded} times`
  return (
    <SliderBlock
      label="Daily Trade Frequency"
      tooltip={tooltip}
      progressPercent={percent}
      labels={["1 time", "50 times", "100 times"]}
    />
  )
}

interface SliderBlockProps {
  label: string
  tooltip: string
  progressPercent: number
  labels: [string, string, string]
}

function SliderBlock({ label, tooltip, progressPercent, labels }: SliderBlockProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-[16px] font-bold leading-[1.6] text-white">{label}</p>
      <div className="flex w-full flex-col justify-center rounded-lg border border-white/60 px-6 pt-10 pb-3">
        <div className="relative h-5 w-full">
          <div className="absolute inset-x-0 top-1.5 h-2 rounded-full bg-[#f1f5f9]" />
          <div
            className="absolute left-0 top-1.5 h-2 rounded-full bg-[#caff5d]"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute top-[-2px] size-4"
            style={{ left: `calc(${progressPercent}% - 10px)` }}
          >
            <img
              src={`${ASSET_BASE}/indicator.svg`}
              alt=""
              className="block size-full"
            />
          </div>
          <p
            className="absolute top-[-32px] text-[13px] font-bold leading-[1.5] tracking-[0.015em] text-white whitespace-nowrap"
            style={{
              left: `${progressPercent}%`,
              transform: "translateX(-50%)",
            }}
          >
            {tooltip}
          </p>
        </div>
        <div className="mt-4 flex w-full justify-between text-[13px] leading-[1.5] tracking-[0.015em] text-[#a3a3a3]">
          <p>{labels[0]}</p>
          <p>{labels[1]}</p>
          <p className="text-right">{labels[2]}</p>
        </div>
      </div>
    </div>
  )
}

function ResultPanel({ trades }: { trades: number }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center rounded-3xl border-[2.5px] border-white/60 bg-[#0a0a0a] px-6 py-5"
      style={{ filter: "drop-shadow(0px 4px 7px rgba(227, 255, 138, 0.18))" }}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <ResultHeader />
          <ResultRows trades={trades} />
          <ResultNotice />
        </div>
        <ResultCta />
      </div>
    </div>
  )
}

function ResultHeader() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <p className="whitespace-nowrap text-[16px] font-bold leading-[1.6] text-white">
          Expected Payback
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[14px] leading-[1.5] tracking-[0.01em] text-[#a3a3a3]">
            Exchange
          </p>
          <div className="flex items-center gap-1.5 rounded-3xl border border-white/80 bg-black/80 px-2.5 py-1">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#f0b90b] p-0.5">
              <img
                src={`${ASSET_BASE}/binance.svg`}
                alt=""
                aria-hidden
                className="block size-full"
              />
            </span>
            <span className="text-[12px] font-bold leading-[1.5] text-white">
              Binance
            </span>
          </div>
        </div>
      </div>
      <div
        className="w-full border-t border-dashed border-white/20"
        aria-hidden
      />
    </div>
  )
}

function formatUsdt(value: number) {
  return Math.round(value).toLocaleString("en-US")
}

function ResultRows({ trades }: { trades: number }) {
  const day1 = trades * PER_TRADE_USDT
  const month3 = day1 * 90
  const month6 = day1 * 180
  return (
    <div className="flex w-full flex-col px-2 py-2">
      <ResultRow label="1 Day" amount={formatUsdt(day1)} bordered />
      <ResultRow label="3 Months" amount={formatUsdt(month3)} bordered />
      <ResultRow label="6 Months" amount={formatUsdt(month6)} highlight />
    </div>
  )
}

function ResultRow({
  label,
  amount,
  bordered,
  highlight,
}: {
  label: string
  amount: string
  bordered?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`flex w-full items-center justify-between py-3 ${
        bordered ? "border-b border-white/20" : ""
      }`}
    >
      <p className="text-[16px] leading-[1.6] tracking-[0.011em] text-[#a3a3a3]">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <p
          className={`text-right text-[18px] font-bold leading-[1.6] tabular-nums ${
            highlight ? "text-[#caff5d]" : "text-white"
          }`}
        >
          {amount}
        </p>
        <p className="text-[13px] leading-[1.5] tracking-[0.01em] text-[#a3a3a3]">
          USDT
        </p>
      </div>
    </div>
  )
}

function ResultNotice() {
  return (
    <div className="flex w-full flex-col gap-0.5 text-[12px] leading-[1.5] tracking-[0.015em] text-[#a3a3a3]">
      <p>Payback amounts may vary slightly</p>
      <p>depending on actual fees and exchange conditions.</p>
    </div>
  )
}

function ResultCta() {
  return (
    <div
      className="flex w-full items-center justify-center rounded-[10px] px-4 py-2"
      style={{
        background:
          "linear-gradient(to top, #a1e53c 0%, #caff5d 50%, #edff9f 100%)",
      }}
    >
      <p className="text-[14px] font-bold leading-[1.5] tracking-[0.01em] text-[#0a0a0a]">
        Start Reducing My Fees
      </p>
    </div>
  )
}
