import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  LineChart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Repeat2,
} from "lucide-react"

const MAIN_PANEL_W = 563
const MAIN_PANEL_H = 467
const FEED_PANEL_W = 480
const FEED_PANEL_H = 390
const FEED_INNER_H = 812

const LIME = "#CAFF5D"
const GREEN = "#0EC473"
const GREEN_SOFT = "rgba(2, 193, 115, 0.60)"
const RED_SOFT = "rgba(225, 26, 56, 0.60)"
const YELLOW = "rgba(240, 185, 11, 0.70)"
const WHITE = "#F5F5F5"
const TEXT_MUTED = "#A3A3A3"
const TEXT_DIM = "#737373"
const TEXT_INACTIVE = "#7F7F7F"
const TEXT_LIGHT = "#D4D4D4"
const PANEL_BG = "rgba(255, 255, 255, 0.03)"
const PANEL_BORDER = "rgba(255, 255, 255, 0.08)"
const PANEL_INNER_BG = "#07070C"
const PANEL_INNER_BORDER = "rgba(255, 255, 255, 0.10)"

const FONT_MANROPE = "Manrope, sans-serif"
const FONT_INTER = "Inter, sans-serif"

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
const ORDER_TABS = ["Limit", "Market", "Stop Limit"] as const
const ACTIVE_ORDER_TAB = "Market"

interface ResponsiveFrameProps {
  width: number
  height: number
  children: ReactNode
}

function ResponsiveFrame({ width, height, children }: ResponsiveFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  const frameStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width,
    height,
    transformOrigin: "top left",
    transform: `scale(${scale})`,
  }

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={frameStyle}>{children}</div>
    </div>
  )
}

function AmbientGlow() {
  return (
    <div
      aria-hidden
      style={{
        width: 548,
        height: 385,
        position: "absolute",
        left: 337,
        top: -252,
        transform: "rotate(-6deg)",
        transformOrigin: "top left",
        opacity: 0.15,
        background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
        filter: "blur(50px)",
        pointerEvents: "none",
      }}
    />
  )
}

interface PanelProps {
  width: number
  height: number
  innerPaddingTop: number
  children: ReactNode
}

function Panel({ width, height, innerPaddingTop, children }: PanelProps) {
  return (
    <div
      style={{
        width,
        height,
        background: PANEL_BG,
        borderRadius: 12,
        outline: `1px ${PANEL_BORDER} solid`,
        outlineOffset: "-1px",
        overflow: "hidden",
        paddingTop: innerPaddingTop,
        paddingLeft: 12,
        paddingRight: 12,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%), ${PANEL_INNER_BG}`,
          boxShadow: "0 0 24px rgba(255,255,255,0.04) inset",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderLeft: `1px ${PANEL_INNER_BORDER} solid`,
          borderTop: `1px ${PANEL_INNER_BORDER} solid`,
          borderRight: `1px ${PANEL_INNER_BORDER} solid`,
          overflow: "hidden",
        }}
      >
        <AmbientGlow />
        {children}
      </div>
    </div>
  )
}

function BinanceDot({ size, inner, outlined = false }: { size: number; inner: string; outlined?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: YELLOW,
        borderRadius: 999,
        padding: size === 16 ? 3 : 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: outlined ? `1px ${PANEL_BORDER} solid` : undefined,
      }}
    >
      <div style={{ flex: 1, alignSelf: "stretch", background: inner }} />
    </div>
  )
}

function OkxLogo({ size = 14 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: 0.6,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gap: 1,
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const filled = i === 0 || i === 2 || i === 4 || i === 6 || i === 8
        return <div key={i} style={{ background: filled ? TEXT_MUTED : "transparent" }} />
      })}
    </div>
  )
}

function Avatar({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: "#5E5E5E",
        border: "1px solid #6B7280",
        boxShadow: "0 2px 6px rgba(255,255,255,0.14)",
        flexShrink: 0,
      }}
    />
  )
}

function MarketHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 4 }}>
          <BinanceDot size={16} inner="white" />
          <span style={{ color: WHITE, fontSize: 11, fontFamily: FONT_MANROPE, fontWeight: 500 }}>Binance</span>
          <ChevronDown size={12} color={TEXT_MUTED} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: 9999, background: "#444", outline: `1px ${PANEL_BORDER} solid` }} />
          <span style={{ fontFamily: FONT_MANROPE, fontSize: 11, fontWeight: 500 }}>
            <span style={{ color: WHITE }}>BTC</span>
            <span style={{ color: TEXT_MUTED }}>/USDT</span>
          </span>
          <ChevronDown size={12} color={TEXT_MUTED} />
        </div>
      </div>

      <div style={{ padding: "2px 4px", background: "#0C0B0B", borderRadius: 8 }}>
        <div style={{ background: "#101010", borderRadius: 4, display: "flex", alignItems: "center" }}>
          <div style={{ padding: "2px 6px", background: "#1B1B1B", borderRadius: 4 }}>
            <LineChart size={10} color="rgba(255,255,255,0.8)" />
          </div>
          <div style={{ padding: "2px 6px", borderRadius: 4 }}>
            <div style={{ width: 10, height: 8, outline: "1px #262626 solid", outlineOffset: "-0.5px" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PriceStats() {
  const rows = [
    { label: "24h High", value: "81,205.90" },
    { label: "24h Low", value: "79,800.10" },
  ]
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <span style={{ color: GREEN, fontSize: 16, fontFamily: FONT_INTER, fontWeight: 500 }}>81,182.29</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {rows.map(({ label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.36)", fontSize: 8, fontFamily: FONT_INTER }}>{label}</span>
            <span style={{ color: "rgba(255,255,255,0.70)", fontSize: 8, fontFamily: FONT_INTER }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CandleChart() {
  return (
    <div style={{ flex: 1, minWidth: 0, height: 307, position: "relative", overflow: "hidden" }}>
      {GRID_TOPS.map((top) => (
        <div key={top} style={{ position: "absolute", left: 0, top, width: "100%", height: 1, background: "rgba(255,255,255,0.08)" }} />
      ))}

      {RED_WICKS.map((w, i) => (
        <div
          key={`r${i}`}
          style={{
            position: "absolute",
            left: w.left,
            top: w.top,
            width: 1,
            height: w.w,
            background: RED_SOFT,
          }}
        />
      ))}

      {GREEN_WICKS.map((w, i) => (
        <div
          key={`g${i}`}
          style={{
            position: "absolute",
            left: w.left,
            top: w.top,
            width: 1,
            height: w.w,
            background: GREEN_SOFT,
          }}
        />
      ))}

      {CANDLES.map((c, i) => (
        <div
          key={`c${i}`}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: 6.11,
            height: c.h,
            background: c.green ? GREEN_SOFT : RED_SOFT,
            borderRadius: 2,
          }}
        />
      ))}

      <div style={{ position: "absolute", left: 0, top: 294, width: 289, display: "flex", justifyContent: "space-between" }}>
        {TIME_LABELS.map((t) => (
          <span key={t} style={{ color: "#98989A", fontSize: 10, fontFamily: FONT_MANROPE }}>{t}</span>
        ))}
      </div>

      {PRICE_LABELS.map(({ label, top }) => (
        <span key={label} style={{ position: "absolute", right: 0, top, color: "#98989A", fontSize: 10, fontFamily: FONT_MANROPE }}>
          {label}
        </span>
      ))}

      <div style={{ position: "absolute", left: -4, top: -1.64, display: "flex", alignItems: "center" }}>
        {INTERVALS.map((iv) => (
          <div key={iv} style={{ padding: "8px 12px" }}>
            <span style={{ color: TEXT_LIGHT, fontSize: 9, fontFamily: FONT_INTER, fontWeight: 600 }}>{iv}</span>
          </div>
        ))}
        <div style={{ padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: LIME, fontSize: 9, fontFamily: FONT_INTER, fontWeight: 600 }}>1H</span>
          <ChevronDown size={12} color={TEXT_LIGHT} />
        </div>
      </div>
    </div>
  )
}

interface OrderInputRowProps {
  label: string
  value: string
  trailing: ReactNode
}

function OrderInputRow({ label, value, trailing }: OrderInputRowProps) {
  return (
    <div
      style={{
        padding: "6px 10px",
        borderRadius: 8,
        outline: "1px rgba(255,255,255,0.20) solid",
        outlineOffset: "-1px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span style={{ color: TEXT_MUTED, fontSize: 8, fontFamily: FONT_MANROPE }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: TEXT_LIGHT, fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 700 }}>{value}</span>
        {trailing}
      </div>
    </div>
  )
}

function AmountSlider() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ height: 8, background: "#262626", borderRadius: 8, flex: 1 }} />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: "50%",
            transform: "translateY(-50%)",
            width: 12,
            height: 12,
            background: TEXT_MUTED,
            borderRadius: 9999,
            border: "3px rgba(34,34,34,0.70) solid",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {PCT_LABELS.map((pct, i) => (
          <span
            key={pct}
            style={{
              color: i === 0 ? "rgba(245,245,245,0.70)" : "#737373",
              fontSize: 8,
              fontFamily: FONT_MANROPE,
              fontWeight: i === 0 ? 700 : 400,
            }}
          >
            {pct}
          </span>
        ))}
      </div>
    </div>
  )
}

function OrderPanel() {
  return (
    <div style={{ width: 188, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, padding: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {ORDER_TABS.map((tab) => {
          const active = tab === ACTIVE_ORDER_TAB
          return (
            <div
              key={tab}
              style={{
                flex: 1,
                padding: "6px 12px",
                borderRadius: active ? 4 : 8,
                background: active ? "#1A1A1A" : undefined,
                boxShadow: active ? "0 1px 4px rgba(255,255,255,0.08)" : undefined,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: active ? "rgba(255,255,255,0.70)" : TEXT_MUTED,
                  fontSize: 8,
                  fontFamily: FONT_MANROPE,
                  fontWeight: active ? 700 : 400,
                  letterSpacing: "0.08px",
                }}
              >
                {tab}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {["Cross", "3x"].map((lbl) => (
          <div
            key={lbl}
            style={{
              flex: 1,
              paddingBottom: 8,
              borderBottom: "1px #5E5E5E solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 8, fontFamily: FONT_MANROPE, fontWeight: 500 }}>{lbl}</span>
            <ChevronDown size={10} color="rgba(245,245,245,0.70)" />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: TEXT_MUTED, fontSize: 8, fontFamily: FONT_MANROPE }}>Available</span>
          <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>0.00</span>
          <span style={{ color: TEXT_MUTED, fontSize: 8, fontFamily: FONT_MANROPE, fontWeight: 500 }}>USDT</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <BinanceDot size={12} inner="rgba(245,245,245,0.70)" outlined />
          <span style={{ color: "rgba(245,245,245,0.70)", fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 600 }}>Binance</span>
        </div>
      </div>

      <OrderInputRow label="Price" value="0.0" trailing={<span style={{ color: "rgba(245,245,245,0.70)", fontSize: 8, fontFamily: FONT_MANROPE }}>Last</span>} />
      <OrderInputRow label="Amount" value="0.0" trailing={<span style={{ color: "#A4A4A4", fontSize: 8, fontFamily: FONT_MANROPE }}>BTC</span>} />

      <AmountSlider />

      <div style={{ display: "flex", gap: 4 }}>
        {[
          { label: "Buy/Long", bg: "rgba(22, 163, 74, 0.70)" },
          { label: "Sell/Short", bg: "rgba(220, 38, 38, 0.70)" },
        ].map(({ label, bg }) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: "6px 10px",
              background: bg,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <span style={{ color: TEXT_LIGHT, fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 700 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function IconSidebar() {
  return (
    <div
      style={{
        height: 289,
        flexShrink: 0,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 16,
        paddingBottom: 16,
        borderLeft: "0.5px rgba(255,255,255,0.10) solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ padding: "16px 0" }}>
        <ChevronRight size={12} color="rgba(255,255,255,0.7)" style={{ transform: "rotate(180deg)" }} />
      </div>
      {[
        { label: "Chat", icon: <MessageCircle size={12} color={TEXT_MUTED} /> },
        { label: "Ranking", icon: <LineChart size={12} color={TEXT_MUTED} /> },
      ].map(({ label, icon }) => (
        <div key={label} style={{ padding: "8px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          {icon}
          <span style={{ color: TEXT_MUTED, fontSize: 8, fontFamily: FONT_MANROPE, fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

function MainPanel() {
  return (
    <Panel width={MAIN_PANEL_W} height={MAIN_PANEL_H} innerPaddingTop={16}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 8px 12px 12px", height: "100%" }}>
        <MarketHeader />
        <PriceStats />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flex: 1, minHeight: 0 }}>
          <CandleChart />
          <OrderPanel />
          <IconSidebar />
        </div>
      </div>
    </Panel>
  )
}

function HallOfFameTitle() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px" }}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: "1.2px solid rgba(45,212,191,0.4)",
          background: "rgba(94,234,212,0.1)",
          boxShadow: "0 4px 7px rgba(45,212,191,0.11)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LineChart size={9} color="#2DD4BF" strokeWidth={1.4} />
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "baseline", gap: 8 }}>
        <span style={{ color: TEXT_MUTED, fontSize: 13, fontFamily: FONT_MANROPE, fontWeight: 700 }}>Hall of Fame</span>
        <span style={{ color: TEXT_MUTED, fontSize: 10, fontFamily: FONT_MANROPE }}>-50+ likes</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>More</span>
        <ChevronRight size={10} color={TEXT_MUTED} />
      </div>
    </div>
  )
}

function ReactionStat({ icon, count, muted = false }: { icon: ReactNode; count: string; muted?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {icon}
      <span
        style={{
          color: muted ? TEXT_INACTIVE : "#9B9B9B",
          fontSize: 10,
          fontFamily: FONT_MANROPE,
        }}
      >
        {count}
      </span>
    </div>
  )
}

function FeaturedPostCard() {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #262626",
        boxShadow: "0 2px 6px rgba(227,255,138,0.12)",
        borderRadius: 12,
        padding: "8px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}>
        <div style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(74,222,128,0.4)" }} />
        <span style={{ color: "rgba(74,222,128,0.4)", fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
          Trading Journal
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ color: TEXT_INACTIVE, fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
            BTC 10x Long +34% Recap
          </span>
          <span style={{ color: TEXT_INACTIVE, fontSize: 9, fontFamily: FONT_MANROPE }}>2h ago</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <ReactionStat icon={<Heart size={10} color={TEXT_INACTIVE} strokeWidth={1.4} />} count="87" muted />
          <ReactionStat icon={<MessageCircle size={10} color={TEXT_INACTIVE} strokeWidth={1.4} />} count="23" muted />
        </div>
      </div>
    </div>
  )
}

function HallOfFameSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <HallOfFameTitle />
      <FeaturedPostCard />
    </div>
  )
}

function LatestPostsDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
      <span style={{ color: TEXT_MUTED, fontSize: 10, fontFamily: FONT_MANROPE }}>Latest Posts</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
    </div>
  )
}

function CategoryBadge() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}>
      <div style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(139,92,246,0.4)" }} />
      <span style={{ color: "rgba(139,92,246,0.4)", fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
        News &amp; Insights
      </span>
    </div>
  )
}

interface TierBadgeProps {
  label: string
  color: string
  bg: string
}

function TierBadge({ label, color, bg }: TierBadgeProps) {
  return (
    <div style={{ padding: "0 4px", background: bg, borderRadius: 4 }}>
      <span style={{ color, fontSize: 12, fontFamily: FONT_MANROPE, fontWeight: 700 }}>{label}</span>
    </div>
  )
}

function PostHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <Avatar size={24} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: TEXT_MUTED, fontSize: 11, fontFamily: FONT_MANROPE, fontWeight: 700 }}>Trdlkee</span>
            <TierBadge label="Master" color="rgba(254,240,138,0.5)" bg="rgba(254,240,138,0.1)" />
          </div>
          <span style={{ color: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MANROPE }}>1h</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#262626", borderRadius: 8, padding: "6px 10px" }}>
          <Plus size={10} color={TEXT_DIM} strokeWidth={1.5} />
          <span style={{ color: TEXT_DIM, fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 700 }}>Follow</span>
        </div>
        <MoreHorizontal size={14} color="white" />
      </div>
    </div>
  )
}

function TradeBody() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 4px 4px 32px" }}>
      <span style={{ color: TEXT_MUTED, fontSize: 12, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
        What is happening
      </span>
      <span style={{ color: TEXT_MUTED, fontSize: 10, fontFamily: FONT_MANROPE }}>OMG</span>

      <div
        style={{
          background: "rgba(34,197,94,0.06)",
          borderRadius: 8,
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <OkxLogo size={12} />
            <span style={{ color: TEXT_MUTED, fontSize: 11, fontFamily: FONT_MANROPE, fontWeight: 700 }}>Okx</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: TEXT_MUTED, fontSize: 11, fontFamily: FONT_MANROPE, fontWeight: 700 }}>BTC/USDT</span>
            <div style={{ padding: "0 4px", background: "rgba(34,197,94,0.1)", borderRadius: 4 }}>
              <span style={{ color: "rgba(22,163,74,0.5)", fontSize: 9, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
                Long 10x
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ color: TEXT_DIM, fontSize: 10, fontFamily: FONT_MANROPE }}>Realized PnL</span>
          <div style={{ display: "flex", gap: 4, color: "rgba(34,197,94,0.5)", fontSize: 11, fontFamily: FONT_MANROPE, fontWeight: 700 }}>
            <span>+100.0</span>
            <span>(+0.85%)</span>
          </div>
        </div>
      </div>

      <div
        style={{
          alignSelf: "flex-start",
          padding: "2px 8px",
          borderRadius: 8,
          border: "1px solid rgba(54,83,20,0.5)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <span style={{ color: "rgba(150,201,65,0.5)", fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 700 }}>$BTC </span>
        <span style={{ color: "rgba(239,68,68,0.5)", fontSize: 10, fontFamily: FONT_MANROPE, fontWeight: 700 }}>-1.1%</span>
      </div>
    </div>
  )
}

function PostReactions() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 32, paddingTop: 2, paddingBottom: 2 }}>
      <ReactionStat icon={<Heart size={11} color="#9B9B9B" strokeWidth={1.4} />} count="20" />
      <ReactionStat icon={<MessageCircle size={11} color="#9B9B9B" strokeWidth={1.4} />} count="10" />
      <ReactionStat icon={<Repeat2 size={11} color="#9B9B9B" strokeWidth={1.4} />} count="18" />
      <Bookmark size={11} color="#9B9B9B" strokeWidth={1.4} />
    </div>
  )
}

function CommentComposer() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 40px" }}>
      <Avatar size={24} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            background: "#262626",
            borderRadius: 8,
            border: `1px solid ${LIME}`,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: TEXT_MUTED, fontSize: 14, fontFamily: FONT_MANROPE }}>Placeholder</span>
          <ChevronDown size={12} color="white" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 16,
              height: 16,
              background: "#262626",
              border: `1px solid ${LIME}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={10} color="#B3E84E" strokeWidth={2} />
          </div>
          <span style={{ color: WHITE, fontSize: 11, fontFamily: FONT_MANROPE }}>Comment anonymously</span>
        </div>
      </div>
    </div>
  )
}

interface CommentProps {
  nickname: string
  tier: TierBadgeProps
  body: ReactNode
  reactions: { likes: string; replyLabel: string }
}

function Comment({ nickname, tier, body, reactions }: CommentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 40, paddingTop: 16, paddingBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar size={24} />
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ color: TEXT_MUTED, fontSize: 14, fontFamily: FONT_MANROPE, fontWeight: 700 }}>{nickname}</span>
            <TierBadge {...tier} />
            <span style={{ color: TEXT_MUTED, fontSize: 12, fontFamily: FONT_MANROPE }}>2h ago</span>
          </div>
        </div>
        <MoreHorizontal size={16} color="white" />
      </div>
      <div style={{ padding: "4px 0 4px 40px", color: TEXT_MUTED, fontSize: 14, fontFamily: FONT_MANROPE }}>
        {body}
      </div>
      <div style={{ display: "flex", gap: 8, paddingLeft: 40, paddingTop: 2, paddingBottom: 2 }}>
        <ReactionStat
          icon={<Heart size={11} color={TEXT_MUTED} strokeWidth={1.4} />}
          count={reactions.likes}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MessageCircle size={11} color={TEXT_MUTED} strokeWidth={1.4} />
          <span style={{ color: TEXT_MUTED, fontSize: 13, fontFamily: FONT_MANROPE }}>{reactions.replyLabel}</span>
        </div>
      </div>
    </div>
  )
}

function MoreRepliesButton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 40, paddingTop: 4, paddingBottom: 4 }}>
      <span style={{ color: WHITE, fontSize: 14, fontFamily: FONT_MANROPE, fontWeight: 700 }}>More Replies</span>
      <ChevronDown size={12} color="white" strokeWidth={1.5} />
    </div>
  )
}

function PostSection() {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "0 8px",
      }}
    >
      <CategoryBadge />
      <PostHeader />
      <TradeBody />
      <PostReactions />
      <CommentComposer />
      <Comment
        nickname="{NickName1}"
        tier={{ label: "Master", color: "#FEF08A", bg: "rgba(254,240,138,0.1)" }}
        body="Body"
        reactions={{ likes: "{int}", replyLabel: "Reply" }}
      />
      <Comment
        nickname="{NickName}"
        tier={{ label: "Elite", color: "#FBBF24", bg: "rgba(251,191,36,0.1)" }}
        body={
          <span>
            <span style={{ color: LIME }}>@NisckName1</span>{" "}
            <span style={{ color: TEXT_MUTED }}>Body</span>
          </span>
        }
        reactions={{ likes: "{int}", replyLabel: "Reply" }}
      />
      <MoreRepliesButton />
    </div>
  )
}

function FeedPanel() {
  return (
    <Panel width={FEED_PANEL_W} height={FEED_PANEL_H} innerPaddingTop={12}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, height: FEED_INNER_H }}>
        <HallOfFameSection />
        <LatestPostsDivider />
        <PostSection />
      </div>
    </Panel>
  )
}

export function TerminalMainPanel() {
  return (
    <ResponsiveFrame width={MAIN_PANEL_W} height={MAIN_PANEL_H}>
      <MainPanel />
    </ResponsiveFrame>
  )
}

export function TerminalFeedPanel() {
  return (
    <ResponsiveFrame width={FEED_PANEL_W} height={FEED_PANEL_H}>
      <FeedPanel />
    </ResponsiveFrame>
  )
}
