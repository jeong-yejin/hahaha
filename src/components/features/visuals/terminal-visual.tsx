const CANDLES = [
  { left: 8,      h: 15.98,  top: 168.17, green: false },
  { left: 17.17,  h: 48.69,  top: 151.81, green: true  },
  { left: 26.34,  h: 33.47,  top: 159.42, green: true  },
  { left: 35.51,  h: 39.56,  top: 122.14, green: false },
  { left: 44.67,  h: 12.93,  top: 138.88, green: true  },
  { left: 53.84,  h: 23.58,  top: 144.20, green: false },
  { left: 63.01,  h: 31.19,  top: 126.71, green: true  },
  { left: 72.18,  h: 35.76,  top: 121.38, green: true  },
  { left: 81.35,  h: 44.13,  top: 150.29, green: false },
  { left: 90.52,  h: 19.78,  top: 191.37, green: false },
  { left: 99.69,  h: 29.67,  top: 163.22, green: true  },
  { left: 108.85, h: 46.41,  top: 163.22, green: false },
  { left: 118.02, h: 23.58,  top: 144.96, green: true  },
  { left: 127.19, h: 101.94, top: 127.47, green: false },
  { left: 136.36, h: 12.93,  top: 135.07, green: true  },
  { left: 145.53, h: 44.89,  top: 93.99,  green: true  },
  { left: 154.70, h: 108.03, top: 36.17,  green: true  },
  { left: 163.87, h: 61.62,  top: 99.32,  green: false },
  { left: 173.03, h: 31.19,  top: 153.33, green: false },
  { left: 182.20, h: 25.87,  top: 183,    green: false },
  { left: 191.37, h: 44.13,  top: 144.20, green: true  },
  { left: 200.54, h: 85.97,  top: 93.99,  green: true  },
  { left: 209.71, h: 66.19,  top: 163.22, green: false },
  { left: 218.88, h: 56.30,  top: 141.92, green: true  },
  { left: 228.05, h: 37.28,  top: 179.96, green: false },
  { left: 237.21, h: 44.13,  top: 154.09, green: true  },
  { left: 246.38, h: 12.93,  top: 169.69, green: false },
  { left: 255.55, h: 31.19,  top: 160.56, green: true  },
  { left: 264.72, h: 22.82,  top: 171.59, green: false },
  { left: 273.89, h: 16.74,  top: 167.79, green: true  },
]

const RED_WICKS = [
  { w: 162.05, left: 130.25, top: 109.97 },
  { w: 95.86,  left: 84.41,  top: 119.86 },
  { w: 39.56,  left: 93.57,  top: 193.65 },
  { w: 39.56,  left: 38.56,  top: 132.03 },
  { w: 98.14,  left: 166.92, top: 78.02  },
  { w: 55.54,  left: 176.09, top: 153.33 },
  { w: 55.54,  left: 212.77, top: 136.60 },
  { w: 78.36,  left: 231.10, top: 183    },
  { w: 55.54,  left: 267.78, top: 160.18 },
]

const GREEN_WICKS = [
  { w: 39.56, left: 47.73,  top: 122.90 },
  { w: 65.43, left: 157.75, top: 24     },
  { w: 82.16, left: 203.60, top: 56.71  },
  { w: 39.56, left: 194.43, top: 156.38 },
  { w: 39.56, left: 139.42, top: 122.14 },
  { w: 49.45, left: 102.74, top: 156.38 },
  { w: 39.56, left: 66.07,  top: 112.25 },
  { w: 39.56, left: 75.24,  top: 99.32  },
  { w: 60.10, left: 221.93, top: 119.86 },
  { w: 47.93, left: 240.27, top: 176.16 },
  { w: 39.56, left: 276.95, top: 154.85 },
]

const GRID_TOPS = [29, 92.39, 155.79, 219.18, 283.29]
const TIME_LABELS = ["22:00", "02:00", "08:00", "13:00", "17:00"]
const PRICE_LABELS = [
  { label: "1,100", top: 271.63 },
  { label: "1,125", top: 209.47 },
  { label: "1,150", top: 145.92 },
  { label: "1,175", top: 85.16  },
  { label: "1,200", top: 23     },
]
const INTERVALS = ["1s", "1m", "15m", "30m"]
const PCT_LABELS = ["1%", "25%", "50%", "75%", "100%"]

const RED   = "rgba(225, 26, 56, 0.60)"
const GREEN = "rgba(2, 193, 115, 0.60)"
const LIME  = "#CAFF5D"

function ChevronIcon({ color = "#A3A3A3", size = 12 }: { color?: string; size?: number }) {
  const inner = Math.round(size * 0.5)
  const wick  = Math.round(size * 0.33)
  return (
    <div style={{ width: size, height: size, padding: 2, overflow: "hidden", display: "inline-flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: inner, height: inner }} />
      <div style={{ width: wick, height: Math.round(size * 0.17), outline: `1.5px ${color} solid`, outlineOffset: "-0.75px" }} />
    </div>
  )
}

function BinanceDot({ size, inner, outlined = false }: { size: number; inner: string; outlined?: boolean }) {
  return (
    <div style={{
      width: size, height: size,
      background: "rgba(240, 185, 11, 0.70)",
      borderRadius: 999,
      padding: size === 16 ? 3 : 2,
      display: "flex", alignItems: "center", justifyContent: "center",
      outline: outlined ? "1px rgba(255,255,255,0.09) solid" : undefined,
    }}>
      <div style={{ flex: 1, alignSelf: "stretch", background: inner }} />
    </div>
  )
}

function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      {/* Left: exchange + pair selectors */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 4, borderRadius: 8 }}>
          <BinanceDot size={16} inner="white" />
          <span style={{ color: "#F5F5F5", fontSize: 11, fontFamily: "Manrope, sans-serif", fontWeight: 500, lineHeight: "17.6px" }}>Binance</span>
          <ChevronIcon size={16} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 4, borderRadius: 8 }}>
          <img style={{ width: 16, height: 16, borderRadius: 9999, outline: "1px rgba(255,255,255,0.09) solid" }} src="https://placehold.co/16x16" alt="" />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, lineHeight: "17.6px" }}>
            <span style={{ color: "#F5F5F5" }}>BTC</span>
            <span style={{ color: "#A3A3A3" }}>/USDT</span>
          </span>
          <ChevronIcon size={16} />
        </div>
      </div>

      {/* Right: chart-type toggle */}
      <div style={{ padding: "2px 4px", background: "#0C0B0B", borderRadius: 8 }}>
        <div style={{ background: "#101010", borderRadius: 4, display: "flex", alignItems: "center" }}>
          <div style={{ padding: "2px 6px", background: "#1B1B1B", borderRadius: 4 }}>
            <div style={{ width: 14, height: 14, position: "relative" }}>
              <div style={{ width: 8.17, height: 9.33, position: "absolute", left: 2.92, top: 2.33, background: "rgba(255,255,255,0.80)" }} />
            </div>
          </div>
          <div style={{ padding: "2px 6px", background: "#0C0B0B", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, padding: "3px 2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 8, outline: "1px #262626 solid", outlineOffset: "-0.5px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PriceRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <span style={{ color: "#0EC473", fontSize: 16, fontFamily: "Inter, sans-serif", fontWeight: 500, lineHeight: "19.2px" }}>81,182.29</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { label: "24h High", value: "81,205.90" },
          { label: "24h Low",  value: "79,800.10" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3.43 }}>
            <span style={{ color: "rgba(255,255,255,0.36)", fontSize: 8, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>{label}</span>
            <span style={{ color: "rgba(255,255,255,0.70)", fontSize: 8, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Chart() {
  return (
    <div style={{ flex: 1, minWidth: 0, height: 307, position: "relative", overflow: "hidden" }}>
      {/* Horizontal grid lines */}
      {GRID_TOPS.map((top) => (
        <div key={top} style={{ position: "absolute", left: 0, top, width: 353, height: 0.71, background: "rgba(255,255,255,0.08)", transform: "rotate(90deg)", transformOrigin: "top left" }} />
      ))}

      {/* Red wicks */}
      {RED_WICKS.map((w, i) => (
        <div key={`r${i}`} style={{ position: "absolute", left: w.left, top: w.top, width: w.w, height: 0, transform: "rotate(90deg)", transformOrigin: "top left", outline: `1px ${RED} solid`, outlineOffset: "-0.5px" }} />
      ))}

      {/* Green wicks */}
      {GREEN_WICKS.map((w, i) => (
        <div key={`g${i}`} style={{ position: "absolute", left: w.left, top: w.top, width: w.w, height: 0, transform: "rotate(90deg)", transformOrigin: "top left", outline: `1px ${GREEN} solid`, outlineOffset: "-0.5px" }} />
      ))}

      {/* Candle bodies */}
      {CANDLES.map((c, i) => (
        <div key={`c${i}`} style={{ position: "absolute", left: c.left, top: c.top, width: 6.11, height: c.h, background: c.green ? GREEN : RED, borderRadius: 2 }} />
      ))}

      {/* Time labels */}
      <div style={{ position: "absolute", left: 0, top: 294, width: 289, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {TIME_LABELS.map((t) => (
          <span key={t} style={{ color: "#98989A", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 400, lineHeight: "13px" }}>{t}</span>
        ))}
      </div>

      {/* Price labels */}
      {PRICE_LABELS.map(({ label, top }) => (
        <span key={label} style={{ position: "absolute", right: 0, top, color: "#98989A", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 400, lineHeight: "13px" }}>{label}</span>
      ))}

      {/* Interval tabs */}
      <div style={{ position: "absolute", left: -4, top: -1.64, display: "flex", alignItems: "center" }}>
        {INTERVALS.map((iv) => (
          <div key={iv} style={{ padding: "8px 12px" }}>
            <span style={{ color: "#D4D4D4", fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 600, lineHeight: "13.5px", letterSpacing: "0.09px" }}>{iv}</span>
          </div>
        ))}
        <div style={{ padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: LIME, fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 600, lineHeight: "13.5px", letterSpacing: "0.09px" }}>1H</span>
          <ChevronIcon color="#D4D4D4" size={16} />
        </div>
      </div>
    </div>
  )
}

function OrderPanel() {
  return (
    <div style={{ width: 188, flexShrink: 0, display: "flex", borderRadius: 12, flexDirection: "column", gap: 8 }}>
      <div style={{ padding: 8, borderRadius: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Order type tabs */}
        <div style={{ padding: 4, borderRadius: 12, display: "flex", alignItems: "center", gap: 4 }}>
          {(["Limit", "Market", "Stop Limit"] as const).map((tab) => {
            const active = tab === "Market"
            return (
              <div key={tab} style={{
                flex: 1,
                padding: "6px 12px",
                borderRadius: active ? 4 : 8,
                background: active ? "#1A1A1A" : undefined,
                boxShadow: active ? "0px 1px 4px rgba(255,255,255,0.08)" : undefined,
                display: "flex", justifyContent: "center", alignItems: "center",
              }}>
                <span style={{ color: active ? "rgba(255,255,255,0.70)" : "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: active ? 700 : 400, lineHeight: "12px", letterSpacing: "0.08px" }}>{tab}</span>
              </div>
            )
          })}
        </div>

        {/* Cross / Leverage */}
        <div style={{ display: "flex", gap: 4 }}>
          {["Cross", "3x"].map((lbl) => (
            <div key={lbl} style={{ flex: 1, paddingBottom: 8, borderBottom: "1px #5E5E5E solid", display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
              <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 500, lineHeight: "12px", letterSpacing: "0.12px" }}>{lbl}</span>
              <ChevronIcon color="rgba(245,245,245,0.70)" size={12} />
            </div>
          ))}
        </div>

        {/* Available balance row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 400, letterSpacing: "0.2px" }}>Available</span>
            <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 9, fontFamily: "Manrope, sans-serif", fontWeight: 700, letterSpacing: "0.2px" }}>0.00</span>
            <span style={{ color: "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 500, letterSpacing: "0.2px" }}>USDT</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <BinanceDot size={12} inner="rgba(245,245,245,0.70)" outlined />
            <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 600, lineHeight: "15px" }}>Binance</span>
          </div>
        </div>

        {/* Price input */}
        <div style={{ padding: "6px 10px", borderRadius: 8, outline: "1px rgba(255,255,255,0.20) solid", outlineOffset: "-1px", display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ color: "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 400, letterSpacing: "0.12px" }}>Price</span>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <span style={{ flex: 1, color: "#D4D4D4", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 700, lineHeight: "15px", letterSpacing: "0.1px" }}>0.0</span>
              <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 400, letterSpacing: "0.12px" }}>Last</span>
            </div>
            <div style={{ width: 12, height: 12, padding: 3, display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, alignSelf: "stretch", outline: "1px #A3A3A3 solid", outlineOffset: "-0.5px" }} />
            </div>
          </div>
        </div>

        {/* Amount input */}
        <div style={{ padding: "6px 10px", borderRadius: 8, outline: "1px rgba(255,255,255,0.20) solid", outlineOffset: "-1px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 400, letterSpacing: "0.12px" }}>Amount</span>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ flex: 1, color: "#D4D4D4", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 700, lineHeight: "15px", letterSpacing: "0.1px" }}>0.0</span>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <span style={{ color: "#A4A4A4", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 400, letterSpacing: "0.12px" }}>BTC</span>
              <ChevronIcon color="#A3A3A3" size={12} />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
            <div style={{ height: 8, background: "#262626", borderRadius: 8, flex: 1 }} />
            <div style={{ position: "absolute", left: -3, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{ width: 12, height: 12, background: "#A3A3A3", borderRadius: 9999, border: "3px rgba(34,34,34,0.70) solid" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {PCT_LABELS.map((pct, i) => (
              <span key={pct} style={{ color: i === 0 ? "rgba(245,245,245,0.70)" : "#737373", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: i === 0 ? 700 : 400, lineHeight: "12px", letterSpacing: "0.12px" }}>{pct}</span>
            ))}
          </div>
        </div>

        {/* Buy / Sell buttons */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { label: "Buy/Long",  bg: "rgba(22, 163, 74, 0.70)" },
            { label: "Sell/Short", bg: "rgba(220, 38, 38, 0.70)" },
          ].map(({ label, bg }) => (
            <button key={label} style={{ flex: 1, padding: "6px 10px", background: bg, borderRadius: 8, border: "none", cursor: "pointer" }}>
              <span style={{ color: "#D4D4D4", fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 700, lineHeight: "15px", letterSpacing: "0.15px" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function IconSidebar() {
  const items = [
    { label: "Chat",    iconTop: 2   },
    { label: "Ranking", iconTop: 2.3 },
  ]
  return (
    <div style={{ height: 289, flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 16, paddingBottom: 16, borderLeft: "0.5px rgba(255,255,255,0.10) solid", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {/* Collapse chevron */}
      <div style={{ padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 20, height: 20, padding: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 6.67, outline: "1px rgba(255,255,255,0.70) solid", outlineOffset: "-0.5px" }} />
        </div>
      </div>

      {items.map(({ label, iconTop }) => (
        <div key={label} style={{ padding: "8px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 16, height: 16, position: "relative" }}>
            <div style={{ position: "absolute", left: 2, top: iconTop, width: 12, height: 12, outline: "1px #A3A3A3 solid", outlineOffset: "-0.5px" }} />
          </div>
          <span style={{ color: "#A3A3A3", fontSize: 8, fontFamily: "Manrope, sans-serif", fontWeight: 500, lineHeight: "12px", letterSpacing: "0.12px" }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

export function TerminalVisual() {
  return (
    <div style={{
      width: "100%",
      paddingTop: 16,
      paddingLeft: 12,
      paddingRight: 12,
      background: "rgba(255,255,255,0.03)",
      overflow: "hidden",
      borderRadius: 12,
      outline: "1px rgba(255,255,255,0.08) solid",
      outlineOffset: "-1px",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        alignSelf: "stretch",
        position: "relative",
        padding: 12,
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%), #07070C",
        boxShadow: "0px 0px 24px rgba(255,255,255,0.04) inset",
        overflow: "hidden",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderLeft: "1px rgba(255,255,255,0.10) solid",
        borderTop: "1px rgba(255,255,255,0.10) solid",
        borderRight: "1px rgba(255,255,255,0.10) solid",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {/* Lime glow */}
        <div aria-hidden style={{
          width: 548, height: 385,
          position: "absolute", left: 337, top: -252,
          transform: "rotate(-6deg)",
          transformOrigin: "top left",
          opacity: 0.15,
          background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />

        <TopBar />
        <PriceRow />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flex: 1, minHeight: 0 }}>
          <Chart />
          <OrderPanel />
          <IconSidebar />
        </div>
      </div>
    </div>
  )
}
