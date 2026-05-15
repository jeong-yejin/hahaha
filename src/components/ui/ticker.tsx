const TICKERS = [
  { symbol: "BTC/USDT", price: "67,842.10", change: "+2.41%", up: true },
  { symbol: "ETH/USDT", price: "3,241.88", change: "+1.12%", up: true },
  { symbol: "SOL/USDT", price: "182.55",   change: "-0.63%", up: false },
  { symbol: "BNB/USDT", price: "594.22",   change: "+0.84%", up: true },
  { symbol: "XRP/USDT", price: "0.5821",   change: "+3.17%", up: true },
  { symbol: "ADA/USDT", price: "0.4432",   change: "-1.08%", up: false },
  { symbol: "AVAX/USDT", price: "38.42",   change: "+2.05%", up: true },
  { symbol: "DOT/USDT", price: "7.84",     change: "-0.42%", up: false },
]

const items = [...TICKERS, ...TICKERS, ...TICKERS]

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-2.5 select-none">
      <div
        className="flex gap-10 w-max"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        {items.map((t, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2.5">
            <span className="font-mono text-[12px] font-semibold text-white/80">
              {t.symbol}
            </span>
            <span className="font-mono text-[12px] text-[#A3A3A3]">{t.price}</span>
            <span
              className={`font-mono text-[11px] font-semibold ${
                t.up ? "text-[#CAFF5D]" : "text-[#FF6B6B]"
              }`}
            >
              {t.change}
            </span>
            <div className="h-3 w-px bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
