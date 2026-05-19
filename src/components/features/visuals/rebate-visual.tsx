const ROWS = [
  { date: "2026-04-02", volume: "$142,883", rate: "55%", onChain: "+$491.28", payback: "+$491.28", payout: "2026-04-03" },
  { date: "2026-04-01", volume: "$156,420", rate: "55%", onChain: "+$537.94", payback: "+$537.94", payout: "2026-04-02" },
  { date: "2026-03-30", volume: "$148,761", rate: "55%", onChain: "+$510.73", payback: "+$510.73", payout: "2026-04-01" },
  { date: "2026-03-22", volume: "$164,778", rate: "55%", onChain: "+$564.38", payback: "+$564.38", payout: "2026-04-01" },
]

const HEADERS = ["Trade Date", "Trading Volume", "Rate (%)", "On-Chain", "Payback Amount", "Payout Date", "Method"]

const s = {
  cell: { color: "#A6A6A6", fontSize: 10, fontFamily: "Inter", fontWeight: 400, lineHeight: "15px", letterSpacing: 0.10 } as React.CSSProperties,
  cellVal: { color: "#A3A3A3", fontSize: 10, fontFamily: "Inter", fontWeight: 500, lineHeight: "15px", letterSpacing: 0.10 } as React.CSSProperties,
}

export function RebateVisual() {
  return (
    <div style={{
      width: "100%",
      padding: 16,
      position: "relative",
      background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%), #07070C",
      boxShadow: "0px 0px 24px rgba(255,255,255,0.04) inset",
      overflow: "hidden",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderLeft: "1px solid rgba(255,255,255,0.10)",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      borderRight: "1px solid rgba(255,255,255,0.10)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      {/* Lime glow */}
      <div aria-hidden style={{
        width: 548, height: 385,
        position: "absolute", left: 337, top: -252,
        transform: "rotate(-6deg)", transformOrigin: "top left",
        opacity: 0.15,
        background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
        filter: "blur(50px)",
        pointerEvents: "none",
      }} />

      {/* Title */}
      <div style={{ color: "white", fontSize: 15, fontFamily: "Inter", fontWeight: 500, lineHeight: "18px" }}>
        Exchange Rebate Details
      </div>

      {/* UID badge */}
      <div style={{
        paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
        background: "rgba(255,255,255,0.02)",
        boxShadow: "0px 0px 24px 1px rgba(255,255,255,0.06) inset",
        borderRadius: 6,
        outline: "1px solid rgba(255,255,255,0.05)",
        display: "inline-flex", alignItems: "center", gap: 12,
      }}>
        <span style={{ color: "#D4D4D4", fontSize: 12, fontFamily: "Inter", fontWeight: 400 }}>UID</span>
        <span style={{ color: "white", fontSize: 12, fontFamily: "Inter", fontWeight: 500 }}>12048293</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { label: "Total Payback Earned", value: "2,104.33" },
          { label: "Total Trading Volume", value: "612,842" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1,
            paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
            background: "radial-gradient(ellipse 63.59% 47.44% at 50% 50%, rgba(202,255,93,0) 0%, rgba(202,255,93,0.06) 100%)",
            boxShadow: "0px 0px 24px 1px rgba(255,255,255,0.06) inset",
            borderRadius: 6,
            outline: "1px solid rgba(255,255,255,0.05)",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <div style={{ color: "#D4D4D4", fontSize: 10, fontFamily: "Inter", fontWeight: 400 }}>{label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
              <span style={{ color: "white", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>{value}</span>
              <span style={{ color: "white", fontSize: 10, fontFamily: "Inter", fontWeight: 300 }}>USDT</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        padding: 8,
        background: "rgba(255,255,255,0.02)",
        boxShadow: "0px 0px 24px 1px rgba(255,255,255,0.06) inset",
        borderRadius: 8,
        outline: "1px solid rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {/* Header */}
        <div style={{
          padding: 8,
          background: "rgba(255,255,255,0.02)",
          display: "flex", justifyContent: "space-between",
        }}>
          {HEADERS.map(h => (
            <div key={h} style={s.cell}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ROWS.map((row, i) => (
            <div key={row.date} style={{
              paddingLeft: 8, paddingRight: 8, paddingTop: 12, paddingBottom: 12,
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              borderBottom: i < ROWS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
            }}>
              <span style={{ ...s.cellVal, fontWeight: 400, width: 58 }}>{row.date}</span>
              <span style={{ ...s.cellVal, width: 75 }}>{row.volume}</span>
              <span style={{ ...s.cellVal, width: 41 }}>{row.rate}</span>
              <span style={{ ...s.cellVal, width: 50 }}>{row.onChain}</span>
              <span style={{ ...s.cellVal, width: 82 }}>{row.payback}</span>
              <span style={{ ...s.cellVal, fontWeight: 400 }}>{row.payout}</span>
              <div style={{
                paddingLeft: 4, paddingRight: 4,
                background: "rgba(34,197,94,0.16)",
                borderRadius: 4,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ color: "#22C55E", fontSize: 10, fontFamily: "Manrope", fontWeight: 700, lineHeight: "15px", letterSpacing: 0.15 }}>
                  On-chain
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share PnL card (floating) */}
      <div style={{
        position: "absolute", left: 254, top: 160,
        padding: "11px 16px",
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%), #07070C",
        boxShadow: "0px 0px 24px rgba(255,255,255,0.04) inset",
        overflow: "hidden",
        borderRadius: 12,
        outline: "1px solid rgba(255,255,255,0.10)",
        display: "flex", flexDirection: "column", gap: 9,
      }}>
        {/* Inner glow */}
        <div aria-hidden style={{
          width: 351, height: 105,
          position: "absolute", left: -9, top: 150,
          background: "rgba(214,253,116,0.60)",
          borderRadius: 9999,
          filter: "blur(118px)",
          pointerEvents: "none",
        }} />

        <div style={{ color: "rgba(255,255,255,0.80)", fontSize: 12, fontFamily: "Inter", fontWeight: 500, lineHeight: "15.6px" }}>
          Share PnL
        </div>

        <div style={{
          width: 250,
          padding: 12,
          background: "rgba(255,255,255,0.02)",
          boxShadow: "0px 0px 24px 1px rgba(255,255,255,0.06) inset",
          borderRadius: 6,
          outline: "1px solid rgba(255,255,255,0.05)",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {/* Top row: +55% + fees */}
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ color: "rgba(255,255,255,0.80)", fontSize: 20, fontFamily: "Inter", fontWeight: 500, lineHeight: "24px" }}>
              +55%
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ color: "rgba(255,255,255,0.36)", fontSize: 10, fontFamily: "Inter", fontWeight: 400, lineHeight: "12px" }}>
                Total Trading Fees
              </span>
              <span style={{ color: "rgba(255,255,255,0.80)", fontSize: 12, fontFamily: "Inter", fontWeight: 600, lineHeight: "14.4px" }}>
                3,826.05 USDT
              </span>
            </div>
          </div>

          {/* Bottom row: payback + rate */}
          <div style={{ display: "flex", gap: 11 }}>
            {[
              { label: "Total Payback", value: "3,826.05 USDT", lime: false },
              { label: "Payback Rate", value: "55%", lime: true },
            ].map(({ label, value, lime }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ color: "rgba(255,255,255,0.36)", fontSize: 10, fontFamily: "Inter", fontWeight: 400, lineHeight: "12px" }}>
                  {label}
                </span>
                <span style={{
                  fontSize: 12, fontFamily: "Inter", lineHeight: "14.4px",
                  fontWeight: lime ? 400 : 600,
                  color: lime ? "rgba(202,255,93,0.70)" : "rgba(255,255,255,0.80)",
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
