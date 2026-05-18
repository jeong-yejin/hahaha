import { AppChrome, VisualContainer, Dropdown, Pill } from "./visual-shell"

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

const ORDER_FIELDS = [
  ["Price", "67,842.00"],
  ["Qty (BTC)", "0.100"],
  ["Total", "$6,784"],
]

export function TerminalVisual() {
  return (
    <VisualContainer>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome
          right={
            <>
              <Dropdown label="BTC / USDT" />
              <Dropdown label="Binance" />
              <Dropdown label="Limit" />
              <div className="ml-auto flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#CAFF5D]" />
                <span className="font-mono text-[10px] text-[#CAFF5D]">LIVE</span>
              </div>
            </>
          }
        />
        <div className="flex shrink-0 items-center gap-1 border-b border-white/[0.05] px-3.5 py-2">
          <Pill>Chart</Pill>
          <Pill active>Order Book</Pill>
          <Pill>Trades</Pill>
          <Pill>Positions</Pill>
          <div className="ml-auto font-mono text-[13px] font-bold text-white">
            67,842.10 <span className="text-[10px] font-normal text-[#CAFF5D]">+2.41%</span>
          </div>
        </div>
        <div className="grid shrink-0 grid-cols-4 border-b border-white/[0.05] px-3.5 py-1.5">
          {["Price (USDT)", "Size (BTC)", "Total", "Depth"].map((heading) => (
            <span key={heading} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{heading}</span>
          ))}
        </div>
        {ASKS.map((ask) => (
          <div key={ask.price} className="relative grid grid-cols-4 border-b border-white/[0.03] px-3.5 py-[5px]">
            <div className="absolute inset-y-0 right-0 bg-[#FF6B6B]/[0.07]" style={{ width: `${ask.depth}%` }} />
            <span className="relative font-mono text-[11px] text-[#FF6B6B]/90">{ask.price}</span>
            <span className="relative font-mono text-[11px] text-white/40">{ask.size}</span>
            <span className="relative font-mono text-[11px] text-white/25">{ask.total}</span>
            <span className="relative font-mono text-[11px] text-white/20">{ask.depth}%</span>
          </div>
        ))}
        <div className="grid shrink-0 grid-cols-4 border-y border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5">
          <span className="col-span-2 font-mono text-[13px] font-bold text-white">67,842.10 <span className="text-[10px] font-normal text-[#CAFF5D]">↑</span></span>
          <span className="col-span-2 self-center font-mono text-[9px] text-white/20">Spread 0.004%</span>
        </div>
        {BIDS.map((bid) => (
          <div key={bid.price} className="relative grid grid-cols-4 border-b border-white/[0.03] px-3.5 py-[5px]">
            <div className="absolute inset-y-0 right-0 bg-[#CAFF5D]/[0.07]" style={{ width: `${bid.depth}%` }} />
            <span className="relative font-mono text-[11px] text-[#CAFF5D]/90">{bid.price}</span>
            <span className="relative font-mono text-[11px] text-white/40">{bid.size}</span>
            <span className="relative font-mono text-[11px] text-white/25">{bid.total}</span>
            <span className="relative font-mono text-[11px] text-white/20">{bid.depth}%</span>
          </div>
        ))}
        <div className="mt-auto flex shrink-0 items-center gap-2 border-t border-white/[0.06] bg-white/[0.01] px-3.5 py-2.5">
          <div className="flex shrink-0 overflow-hidden rounded-lg border border-white/[0.08]">
            <button className="bg-[#CAFF5D]/15 px-3.5 py-1.5 font-mono text-[10px] font-semibold text-[#CAFF5D]">BUY</button>
            <button className="px-3.5 py-1.5 font-mono text-[10px] text-white/25">SELL</button>
          </div>
          {ORDER_FIELDS.map(([label, value]) => (
            <div key={label} className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
              <p className="font-mono text-[8px] text-white/20">{label}</p>
              <p className="font-mono text-[11px] text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#07070C] to-transparent" />
      </div>
    </VisualContainer>
  )
}
