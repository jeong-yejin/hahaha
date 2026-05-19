import { useEffect, useRef } from "react"
import { geoEquirectangular, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import type { Topology, GeometryCollection } from "topojson-specification"
import type { Feature, MultiPolygon } from "geojson"
import worldData from "world-atlas/land-110m.json"

function MapCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    const topology = worldData as unknown as Topology
    const land = feature(
      topology,
      topology.objects.land as GeometryCollection,
    ) as unknown as Feature<MultiPolygon>

    // Scale/translate derived from the user-specified dot positions so the
    // cities (Seoul, Tokyo, London, NY, Jakarta…) align with the rendered map.
    const projection = geoEquirectangular()
      .scale(121.7)
      .translate([201, 340])

    const off = document.createElement("canvas")
    off.width = w
    off.height = h
    const offCtx = off.getContext("2d")
    if (!offCtx) return

    offCtx.fillStyle = "#fff"
    offCtx.beginPath()
    geoPath(projection, offCtx)(land)
    offCtx.fill()

    const data = offCtx.getImageData(0, 0, w, h).data

    ctx.clearRect(0, 0, w, h)
    const step = 5
    const r = 1.4
    ctx.fillStyle = "#444E57"

    for (let px = step / 2; px < w; px += step) {
      for (let py = step / 2; py < h; py += step) {
        const idx = (Math.floor(py) * w + Math.floor(px)) * 4
        if (data[idx + 3] > 128) {
          ctx.beginPath()
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }, [])

  return (
    <canvas
      ref={ref}
      width={555}
      height={483}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  )
}

// Coordinates from Figma (relative to 555×483 inner card)
const LIME = "#CAFF5D"
const LIGHT_LIME = "#E6FFB3"

const SMALL_DOTS = [
  { x: 471, y: 263, color: LIME },
  { x: 470, y: 256, color: LIME },
  { x: 494, y: 257, color: LIGHT_LIME },
  { x: 295, y: 321, color: LIGHT_LIME },
  { x: 42,  y: 257, color: LIGHT_LIME },
  { x: 201, y: 228, color: LIGHT_LIME },
  { x: 429, y: 357, color: LIGHT_LIME },
]

const GLOWS = [
  { x: 461, y: 252, size: 20, color: LIME,       blur: 22 },
  { x: 494, y: 254, size: 10, color: LIGHT_LIME, blur: 21 },
  { x: 429, y: 357, size: 10, color: LIGHT_LIME, blur: 21 },
  { x: 294, y: 318, size: 10, color: LIGHT_LIME, blur: 21 },
  { x: 41,  y: 254, size: 10, color: LIGHT_LIME, blur: 21 },
  { x: 198, y: 225, size: 10, color: LIGHT_LIME, blur: 21 },
]

const W = 555
const H = 483
const pct = (v: number, total: number) => `${(v / total) * 100}%`

function KoreanFlag({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 16" width={size} height={size * (16 / 24)} aria-hidden>
      <rect width="24" height="16" fill="#ffffff" />
      <g transform="translate(12 8)">
        <circle r="4" fill="#CD2E3A" />
        <path d="M -4 0 A 4 4 0 0 1 4 0 A 2 2 0 0 1 0 0 A 2 2 0 0 0 -4 0 Z" fill="#0047A0" />
      </g>
      <g fill="#000" stroke="none">
        <rect x="2" y="2"  width="3" height="0.6" />
        <rect x="2" y="3.2" width="3" height="0.6" />
        <rect x="2" y="4.4" width="3" height="0.6" />
        <rect x="19" y="2"  width="3" height="0.6" />
        <rect x="19" y="3.2" width="3" height="0.6" />
        <rect x="19" y="4.4" width="3" height="0.6" />
        <rect x="2" y="11"  width="3" height="0.6" />
        <rect x="2" y="12.2" width="3" height="0.6" />
        <rect x="2" y="13.4" width="3" height="0.6" />
        <rect x="19" y="11"  width="3" height="0.6" />
        <rect x="19" y="12.2" width="3" height="0.6" />
        <rect x="19" y="13.4" width="3" height="0.6" />
      </g>
    </svg>
  )
}

export function LabsVisual() {
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
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${W} / ${H}`,
        overflow: "hidden",
        borderRadius: 6,
      }}>
        {/* Ambient lime gradient blur */}
        <div aria-hidden style={{
          position: "absolute",
          left: "-45%", top: "61%",
          width: "115%", height: "110%",
          background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
          opacity: 0.15,
          filter: "blur(240px)",
          pointerEvents: "none",
        }} />

        {/* World map */}
        <MapCanvas />

        {/* Glow halos */}
        {GLOWS.map((g, i) => (
          <div
            key={`glow-${i}`}
            aria-hidden
            style={{
              position: "absolute",
              left: pct(g.x - g.size / 2, W),
              top: pct(g.y - g.size / 2, H),
              width: pct(g.size, W),
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background: g.color,
              filter: `blur(${g.blur}px)`,
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Small lime dots */}
        {SMALL_DOTS.map((d, i) => (
          <div
            key={`dot-${i}`}
            aria-hidden
            style={{
              position: "absolute",
              left: pct(d.x - 3, W),
              top: pct(d.y - 3, H),
              width: pct(6, W),
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background: d.color,
              boxShadow: `0 0 6px ${d.color}`,
            }}
          />
        ))}

        {/* SE [flag] UL tagline */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: pct(439, W),
            top: pct(238, H),
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#F5F5F5",
            fontSize: 11,
            fontFamily: "Manrope, Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: "14px",
            whiteSpace: "nowrap",
          }}
        >
          <span>SE</span>
          <KoreanFlag size={12} />
          <span>UL</span>
        </div>
      </div>
    </div>
  )
}
