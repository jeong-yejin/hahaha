import { useCallback, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface FeatureItem {
  product: string
  tagline: string
  description: string
  cta: string
  href: string
}

const FEATURES: FeatureItem[] = [
  {
    product: "ReboundX Terminal",
    tagline: "Trade with sharper edges",
    description: "Execution, position visibility, and settlement in one screen",
    cta: "View Terminal",
    href: "#",
  },
  {
    product: "ReboundX Rebate",
    tagline: "Every fill, rewarded",
    description: "Automated rebate tracking and payout across all connected venues",
    cta: "View Rebate",
    href: "#",
  },
  {
    product: "ReboundX Labs",
    tagline: "The fastest path to Korean traders",
    description: "Distribution, compliance, and integration support for markets entering Korea",
    cta: "View Labs",
    href: "#",
  },
]

function TextBlock({ item }: { item: FeatureItem }) {
  return (
    <div className="flex flex-col justify-center">
      <p data-sr className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CAFF5D]">
        {item.product}
      </p>
      <h3 data-sr className="mt-4 text-[28px] md:text-[42px] font-bold leading-[1.15] tracking-[-0.03em] text-white">
        {item.tagline}
      </h3>
      <p data-sr className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[#A3A3A3] max-w-[340px]">
        {item.description}
      </p>
      <a
        data-sr
        href={item.href}
        className="group mt-9 inline-flex items-center gap-2 rounded-full border border-[#CAFF5D]/25 pl-5 pr-2 py-2 text-[13px] font-semibold text-[#CAFF5D] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#CAFF5D]/50 hover:bg-[#CAFF5D]/5 active:scale-[0.97] w-fit"
      >
        {item.cta}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CAFF5D]/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </div>
  )
}

/* ── Twinkling star canvas ── */
function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf: number
    type Star = { x: number; y: number; o: number; speed: number; r: number }
    let stars: Star[] = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        o: Math.random(),
        speed: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.005),
        r: 0.4 + Math.random() * 0.9,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        s.o += s.speed
        if (s.o >= 1) { s.o = 1; s.speed *= -1 }
        if (s.o <= 0) { s.o = 0; s.speed *= -1 }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.o * 0.55})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    resize()
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}

/* ── Magical-border Bezel ── */
function Bezel({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = outerRef.current?.getBoundingClientRect()
    if (!rect || !glowRef.current) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background =
      `radial-gradient(480px circle at ${x}px ${y}px, rgba(202,255,93,0.18), transparent 55%)`
  }, [])

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "none"
  }, [])

  return (
    <div
      ref={outerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-[2rem] p-[1px] shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      {/* Mouse-tracking glow border */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-[2rem]" style={{ transition: "background 0.12s ease" }} />
      {/* Static hairline border */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.07]" />
      {/* Inner card */}
      <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#0C0C0C] aspect-[4/3] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <StarCanvas />
        {/* Ambient light spots */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#CAFF5D]/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[#4A9EFF]/[0.03] blur-3xl" />
        {children}
      </div>
    </div>
  )
}


/* ── Shared app chrome ── */
function AppChrome({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.01] px-3.5 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      {right && <div className="ml-2 flex flex-1 items-center gap-2">{right}</div>}
    </div>
  )
}

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${active ? "bg-[#CAFF5D]/15 text-[#CAFF5D]" : "text-white/25"}`}>
      {children}
    </span>
  )
}

function Dropdown({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/50">
      {label}
    </span>
  )
}

/* ── Terminal Visual ── */
const BIDS = [
  { price: "67,840", size: "0.842", total: "$57,145", depth: 78 },
  { price: "67,836", size: "1.210", total: "$82,080", depth: 55 },
  { price: "67,831", size: "0.390", total: "$26,294", depth: 30 },
]
const ASKS = [
  { price: "67,844", size: "0.631", total: "$42,840", depth: 62 },
  { price: "67,848", size: "1.050", total: "$71,240", depth: 40 },
  { price: "67,853", size: "0.270", total: "$18,120", depth: 20 },
]

function TerminalVisual() {
  return (
    <Bezel>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome right={
          <>
            <Dropdown label="BTC / USDT" />
            <Dropdown label="Binance" />
            <Dropdown label="Limit" />
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF5D] animate-pulse" />
              <span className="font-mono text-[10px] text-[#CAFF5D]">LIVE</span>
            </div>
          </>
        } />
        {/* Tab bar + price */}
        <div className="flex shrink-0 items-center gap-1 border-b border-white/[0.05] px-3.5 py-2">
          <Pill>Chart</Pill>
          <Pill active>Order Book</Pill>
          <Pill>Trades</Pill>
          <Pill>Positions</Pill>
          <div className="ml-auto font-mono text-[13px] font-bold text-white">
            67,842.10 <span className="text-[10px] font-normal text-[#CAFF5D]">+2.41%</span>
          </div>
        </div>
        {/* Table header */}
        <div className="grid shrink-0 grid-cols-4 border-b border-white/[0.05] px-3.5 py-1.5">
          {["Price (USDT)", "Size (BTC)", "Total", "Depth"].map((h) => (
            <span key={h} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{h}</span>
          ))}
        </div>
        {/* Asks */}
        {ASKS.map((a) => (
          <div key={a.price} className="relative grid grid-cols-4 border-b border-white/[0.03] px-3.5 py-[5px]">
            <div className="absolute inset-y-0 right-0 bg-[#FF6B6B]/[0.07]" style={{ width: `${a.depth}%` }} />
            <span className="relative font-mono text-[11px] text-[#FF6B6B]/90">{a.price}</span>
            <span className="relative font-mono text-[11px] text-white/40">{a.size}</span>
            <span className="relative font-mono text-[11px] text-white/25">{a.total}</span>
            <span className="relative font-mono text-[11px] text-white/20">{a.depth}%</span>
          </div>
        ))}
        {/* Spread */}
        <div className="grid shrink-0 grid-cols-4 border-y border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5">
          <span className="col-span-2 font-mono text-[13px] font-bold text-white">67,842.10 <span className="text-[10px] font-normal text-[#CAFF5D]">↑</span></span>
          <span className="col-span-2 self-center font-mono text-[9px] text-white/20">Spread 0.004%</span>
        </div>
        {/* Bids */}
        {BIDS.map((b) => (
          <div key={b.price} className="relative grid grid-cols-4 border-b border-white/[0.03] px-3.5 py-[5px]">
            <div className="absolute inset-y-0 right-0 bg-[#CAFF5D]/[0.07]" style={{ width: `${b.depth}%` }} />
            <span className="relative font-mono text-[11px] text-[#CAFF5D]/90">{b.price}</span>
            <span className="relative font-mono text-[11px] text-white/40">{b.size}</span>
            <span className="relative font-mono text-[11px] text-white/25">{b.total}</span>
            <span className="relative font-mono text-[11px] text-white/20">{b.depth}%</span>
          </div>
        ))}
        {/* Order entry */}
        <div className="mt-auto flex shrink-0 items-center gap-2 border-t border-white/[0.06] bg-white/[0.01] px-3.5 py-2.5">
          <div className="flex shrink-0 overflow-hidden rounded-lg border border-white/[0.08]">
            <button className="bg-[#CAFF5D]/15 px-3.5 py-1.5 font-mono text-[10px] font-semibold text-[#CAFF5D]">BUY</button>
            <button className="px-3.5 py-1.5 font-mono text-[10px] text-white/25">SELL</button>
          </div>
          {[["Price", "67,842.00"], ["Qty (BTC)", "0.100"], ["Total", "$6,784"]].map(([label, val]) => (
            <div key={label} className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
              <p className="font-mono text-[8px] text-white/20">{label}</p>
              <p className="font-mono text-[11px] text-white">{val}</p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
      </div>
    </Bezel>
  )
}

/* ── Rebate Visual ── */
const REBATE_BARS = [38, 55, 42, 70, 61, 83, 75]
const FILLS = [
  { id: "#1847", venue: "Binance", side: "BUY",  size: "0.0023 BTC", price: "$67,841", rebate: "+$0.38", status: "settled" },
  { id: "#1846", venue: "OKX",     side: "SELL", size: "0.0019 BTC", price: "$67,839", rebate: "+$0.31", status: "settled" },
  { id: "#1845", venue: "Bybit",   side: "BUY",  size: "0.0031 BTC", price: "$67,844", rebate: "+$0.49", status: "settled" },
  { id: "#1844", venue: "Binance", side: "BUY",  size: "0.0017 BTC", price: "$67,838", rebate: "+$0.27", status: "pending" },
]

function RebateVisual() {
  return (
    <Bezel>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome right={
          <span className="font-mono text-[11px] font-semibold text-white/50">ReboundX Rebate</span>
        } />
        {/* Filter bar */}
        <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.05] px-3.5 py-2">
          <Dropdown label="All venues" />
          <Dropdown label="This week" />
          <Dropdown label="USD" />
          <div className="ml-auto flex items-baseline gap-2">
            <span className="font-mono text-[18px] font-bold text-white">
              $4,821<span className="text-[13px] text-[#CAFF5D]">.36</span>
            </span>
            <span className="rounded-full bg-[#CAFF5D]/10 px-1.5 py-0.5 font-mono text-[9px] text-[#CAFF5D]">+18.4%</span>
          </div>
        </div>
        {/* Mini bar chart */}
        <div className="flex shrink-0 items-end gap-1 border-b border-white/[0.05] px-3.5 py-2.5 h-14">
          {REBATE_BARS.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-[2px]"
              style={{ height: `${h}%`, background: i === 6 ? "#CAFF5D" : "rgba(202,255,93,0.14)" }} />
          ))}
        </div>
        {/* Table header */}
        <div className="grid shrink-0 grid-cols-[40px_1fr_44px_80px_60px_52px_52px] border-b border-white/[0.05] px-3.5 py-1.5">
          {["ID", "Venue", "Side", "Size", "Price", "Rebate", "Status"].map((h) => (
            <span key={h} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{h}</span>
          ))}
        </div>
        {/* Rows */}
        <div className="flex flex-1 flex-col">
          {FILLS.map((f) => (
            <div key={f.id} className="grid grid-cols-[40px_1fr_44px_80px_60px_52px_52px] items-center border-b border-white/[0.03] px-3.5 py-[5px]">
              <span className="font-mono text-[9px] text-white/25">{f.id}</span>
              <span className="font-mono text-[10px] text-white/60">{f.venue}</span>
              <span className={`font-mono text-[10px] ${f.side === "BUY" ? "text-[#CAFF5D]/80" : "text-[#FF6B6B]/80"}`}>{f.side}</span>
              <span className="font-mono text-[10px] text-white/40">{f.size}</span>
              <span className="font-mono text-[10px] text-white/30">{f.price}</span>
              <span className="font-mono text-[10px] text-[#CAFF5D]">{f.rebate}</span>
              <span className={`w-fit rounded-full px-1.5 py-0.5 font-mono text-[8px] ${f.status === "settled" ? "bg-[#CAFF5D]/10 text-[#CAFF5D]" : "bg-white/5 text-white/30"}`}>{f.status}</span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.05] px-3.5 py-1.5">
          <span className="font-mono text-[8px] text-white/20">COUNT 12,847</span>
          <span className="font-mono text-[8px] text-white/20">1–4 of 12,847 · PAGE 1 of 3,212</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
      </div>
    </Bezel>
  )
}

/* ── Labs Visual ── */
const STEPS = [
  { label: "Entity registration", done: true },
  { label: "Compliance review", done: true },
  { label: "Exchange integration", done: true },
  { label: "Live go-to-market", done: false },
]
const EXCHANGES = [
  { name: "Upbit",   region: "Korea", pairs: 214, vol: "₩1.8T", users: "8.2M", status: "live"  as const },
  { name: "Bithumb", region: "Korea", pairs: 187, vol: "₩0.6T", users: "3.1M", status: "live"  as const },
  { name: "Coinone", region: "Korea", pairs:  96, vol: "₩0.2T", users: "1.4M", status: "setup" as const },
]

function LabsVisual() {
  return (
    <Bezel>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome right={
          <>
            <span className="font-mono text-[11px] font-semibold text-white/50">ReboundX Labs</span>
            <div className="ml-auto flex items-center gap-1.5 rounded-full border border-[#CAFF5D]/20 bg-[#CAFF5D]/10 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF5D] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#CAFF5D]">Active</span>
            </div>
          </>
        } />
        {/* Region tabs */}
        <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.05] px-3.5 py-2">
          <Pill active>Korea</Pill>
          <Pill>Singapore</Pill>
          <Pill>Japan</Pill>
        </div>
        {/* Progress stepper */}
        <div className="flex shrink-0 items-center border-b border-white/[0.05] px-4 py-3">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`h-4 w-4 rounded-full flex items-center justify-center ${s.done ? "bg-[#CAFF5D]/15 ring-1 ring-[#CAFF5D]/30" : "bg-white/5 ring-1 ring-white/10"}`}>
                  {s.done
                    ? <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF5D]" />
                    : <span className="h-1.5 w-1.5 rounded-full bg-white/15" />}
                </div>
                <span className={`font-mono text-[8px] whitespace-nowrap ${s.done ? "text-[#CAFF5D]/60" : "text-white/20"}`}>{s.label.split(" ")[0]}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-1.5 mb-3 ${s.done ? "bg-[#CAFF5D]/25" : "bg-white/[0.08]"}`} />}
            </div>
          ))}
        </div>
        {/* Table header */}
        <div className="grid shrink-0 grid-cols-[1fr_52px_44px_52px_44px_44px] border-b border-white/[0.05] px-3.5 py-1.5">
          {["Exchange", "Region", "Pairs", "Daily Vol", "Users", "Status"].map((h) => (
            <span key={h} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{h}</span>
          ))}
        </div>
        {/* Exchange rows */}
        <div className="flex flex-1 flex-col">
          {EXCHANGES.map((ex) => (
            <div key={ex.name} className="grid grid-cols-[1fr_52px_44px_52px_44px_44px] items-center border-b border-white/[0.03] px-3.5 py-[7px]">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
                  <span className="font-mono text-[8px] font-bold text-white/40">{ex.name[0]}</span>
                </div>
                <span className="font-mono text-[11px] text-white/75">{ex.name}</span>
              </div>
              <span className="font-mono text-[10px] text-white/35">{ex.region}</span>
              <span className="font-mono text-[10px] text-white/50">{ex.pairs}</span>
              <span className="font-mono text-[10px] text-white/50">{ex.vol}</span>
              <span className="font-mono text-[10px] text-white/35">{ex.users}</span>
              <span className={`w-fit rounded-full px-1.5 py-0.5 font-mono text-[8px] ${ex.status === "live" ? "bg-[#CAFF5D]/10 text-[#CAFF5D]" : "bg-white/5 text-white/25"}`}>
                {ex.status === "live" ? "Live" : "Setup"}
              </span>
            </div>
          ))}
        </div>
        {/* Footer stats */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.05] px-3.5 py-1.5">
          <span className="font-mono text-[8px] text-white/20">3 exchanges · 2 live · 1 setup</span>
          <span className="font-mono text-[8px] text-white/20">KRW total ₩2.6T daily</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
      </div>
    </Bezel>
  )
}

const VISUALS = [TerminalVisual, RebateVisual, LabsVisual]

function FeatureRow({ item, index }: { item: FeatureItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const textLeft = index % 2 === 0
  const VisualComponent = VISUALS[index]

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
        }
      )
    }, rowRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rowRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
      {textLeft ? (
        <>
          <TextBlock item={item} />
          <VisualComponent />
        </>
      ) : (
        <>
          <VisualComponent />
          <TextBlock item={item} />
        </>
      )}
    </div>
  )
}

export function Features() {
  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="mb-20 md:mb-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CAFF5D]">
            Products
          </p>
          <h2 className="mt-3 text-[32px] md:text-[52px] font-bold leading-[1.1] tracking-[-0.03em] text-white max-w-lg">
            At every layer of trading
          </h2>
        </div>
        <div className="space-y-24 md:space-y-36">
          {FEATURES.map((feature, i) => (
            <FeatureRow key={feature.product} item={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
