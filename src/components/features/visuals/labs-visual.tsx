import { AppChrome, VisualContainer, Pill } from "./visual-shell"

const STEPS = [
  { label: "Entity registration", done: true },
  { label: "Compliance review", done: true },
  { label: "Exchange integration", done: true },
  { label: "Live go-to-market", done: false },
]

const EXCHANGES = [
  { name: "Upbit", region: "Korea", pairs: 214, vol: "KRW 1.8T", users: "8.2M", status: "live" as const },
  { name: "Bithumb", region: "Korea", pairs: 187, vol: "KRW 0.6T", users: "3.1M", status: "live" as const },
  { name: "Coinone", region: "Korea", pairs: 96, vol: "KRW 0.2T", users: "1.4M", status: "setup" as const },
]

export function LabsVisual() {
  return (
    <VisualContainer>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <AppChrome
          right={
            <>
              <span className="font-mono text-[11px] font-semibold text-white/50">ReboundX Labs</span>
              <div className="ml-auto flex items-center gap-1.5 rounded-full border border-[#CAFF5D]/20 bg-[#CAFF5D]/10 px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#CAFF5D]" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#CAFF5D]">Active</span>
              </div>
            </>
          }
        />
        <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.05] px-3.5 py-2">
          <Pill active>Korea</Pill>
          <Pill>Singapore</Pill>
          <Pill>Japan</Pill>
        </div>
        <div className="flex shrink-0 items-center border-b border-white/[0.05] px-4 py-3">
          {STEPS.map((step, index) => (
            <div key={step.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full ${step.done ? "bg-[#CAFF5D]/15 ring-1 ring-[#CAFF5D]/30" : "bg-white/5 ring-1 ring-white/10"}`}>
                  {step.done ? <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF5D]" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/15" />}
                </div>
                <span className={`whitespace-nowrap font-mono text-[8px] ${step.done ? "text-[#CAFF5D]/60" : "text-white/20"}`}>{step.label.split(" ")[0]}</span>
              </div>
              {index < STEPS.length - 1 && <div className={`mx-1.5 mb-3 h-px flex-1 ${step.done ? "bg-[#CAFF5D]/25" : "bg-white/[0.08]"}`} />}
            </div>
          ))}
        </div>
        <div className="grid shrink-0 grid-cols-[1fr_52px_44px_52px_44px_44px] border-b border-white/[0.05] px-3.5 py-1.5">
          {["Exchange", "Region", "Pairs", "Daily Vol", "Users", "Status"].map((heading) => (
            <span key={heading} className="font-mono text-[8px] uppercase tracking-wider text-white/20">{heading}</span>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          {EXCHANGES.map((exchange) => (
            <div key={exchange.name} className="grid grid-cols-[1fr_52px_44px_52px_44px_44px] items-center border-b border-white/[0.03] px-3.5 py-[7px]">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
                  <span className="font-mono text-[8px] font-bold text-white/40">{exchange.name[0]}</span>
                </div>
                <span className="font-mono text-[11px] text-white/75">{exchange.name}</span>
              </div>
              <span className="font-mono text-[10px] text-white/35">{exchange.region}</span>
              <span className="font-mono text-[10px] text-white/50">{exchange.pairs}</span>
              <span className="font-mono text-[10px] text-white/50">{exchange.vol}</span>
              <span className="font-mono text-[10px] text-white/35">{exchange.users}</span>
              <span className={`w-fit rounded-full px-1.5 py-0.5 font-mono text-[8px] ${exchange.status === "live" ? "bg-[#CAFF5D]/10 text-[#CAFF5D]" : "bg-white/5 text-white/25"}`}>
                {exchange.status === "live" ? "Live" : "Setup"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.05] px-3.5 py-1.5">
          <span className="font-mono text-[8px] text-white/20">3 exchanges · 2 live · 1 setup</span>
          <span className="font-mono text-[8px] text-white/20">KRW total 2.6T daily</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#07070C] to-transparent" />
      </div>
    </VisualContainer>
  )
}
