import { AppChrome, VisualContainer, Dropdown } from "./visual-shell"

const REBATE_BARS = [38, 55, 42, 70, 61, 83, 75]

const FILLS = [
  { id: "#1847", venue: "Binance", side: "BUY", size: "0.0023 BTC", price: "$67,841", rebate: "+$0.38", status: "settled" },
  { id: "#1846", venue: "OKX", side: "SELL", size: "0.0019 BTC", price: "$67,839", rebate: "+$0.31", status: "settled" },
  { id: "#1845", venue: "Bybit", side: "BUY", size: "0.0031 BTC", price: "$67,844", rebate: "+$0.49", status: "settled" },
  { id: "#1844", venue: "Binance", side: "BUY", size: "0.0017 BTC", price: "$67,838", rebate: "+$0.27", status: "pending" },
]

export function RebateVisual() {
  return (
    <VisualContainer>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome right={<span className="font-mono text-[11px] font-semibold text-white/50">ReboundX Rebate</span>} />
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
        <div className="flex h-14 shrink-0 items-end gap-1 border-b border-white/[0.05] px-3.5 py-2.5">
          {REBATE_BARS.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-[2px]"
              style={{ height: `${height}%`, background: index === 6 ? "#CAFF5D" : "rgba(202,255,93,0.14)" }}
            />
          ))}
        </div>
        <div className="grid shrink-0 grid-cols-[40px_1fr_44px_80px_60px_52px_52px] border-b border-white/[0.05] px-3.5 py-1.5">
          {["ID", "Venue", "Side", "Size", "Price", "Rebate", "Status"].map((heading) => (
            <span key={heading} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{heading}</span>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          {FILLS.map((fill) => (
            <div key={fill.id} className="grid grid-cols-[40px_1fr_44px_80px_60px_52px_52px] items-center border-b border-white/[0.03] px-3.5 py-[5px]">
              <span className="font-mono text-[9px] text-white/25">{fill.id}</span>
              <span className="font-mono text-[10px] text-white/60">{fill.venue}</span>
              <span className={`font-mono text-[10px] ${fill.side === "BUY" ? "text-[#CAFF5D]/80" : "text-[#FF6B6B]/80"}`}>{fill.side}</span>
              <span className="font-mono text-[10px] text-white/40">{fill.size}</span>
              <span className="font-mono text-[10px] text-white/30">{fill.price}</span>
              <span className="font-mono text-[10px] text-[#CAFF5D]">{fill.rebate}</span>
              <span className={`w-fit rounded-full px-1.5 py-0.5 font-mono text-[8px] ${fill.status === "settled" ? "bg-[#CAFF5D]/10 text-[#CAFF5D]" : "bg-white/5 text-white/30"}`}>{fill.status}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.05] px-3.5 py-1.5">
          <span className="font-mono text-[8px] text-white/20">COUNT 12,847</span>
          <span className="font-mono text-[8px] text-white/20">1-4 of 12,847 · PAGE 1 of 3,212</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#07070C] to-transparent" />
      </div>
    </VisualContainer>
  )
}
