import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PreFooter() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-pf]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-40">
      {/* Top circle glow */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 animate-[pfCircleIn_1.6s_ease-out_forwards] opacity-0"
        style={{
          width: "min(90vw, 760px)",
          height: "min(90vw, 760px)",
          top: "calc(min(90vw, 760px) * -0.52)",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(202,255,93,0.55) 0%, rgba(202,255,93,0.12) 40%, transparent 70%)",
        }}
      />
      {/* Bottom circle glow */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 animate-[pfCircleIn_1.6s_ease-out_0.15s_forwards] opacity-0"
        style={{
          width: "min(90vw, 760px)",
          height: "min(90vw, 760px)",
          bottom: "calc(min(90vw, 760px) * -0.52)",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(140,210,45,0.38) 0%, rgba(140,210,45,0.07) 40%, transparent 65%)",
        }}
      />

      <div ref={containerRef} className="relative mx-auto max-w-[1200px] px-6 md:px-8 text-center">
        <h2
          data-pf
          style={{ opacity: 0 }}
          className="text-[32px] md:text-[56px] font-semibold leading-[1.15] tracking-[-0.03em] text-white"
        >
          ReboundX defines
          <br />
          {/* Illuminated glow span — SVG filter creates bloom from the gradient text */}
          <span
            className="relative inline-block"
            style={{ filter: "url(#pf-glow)" }}
          >
            <span className="inline-block bg-[linear-gradient(0deg,#CAFF5D_20%,#ffffff_70%)] bg-clip-text text-transparent">
              what trade can be
            </span>
          </span>
        </h2>

        <p
          data-pf
          style={{ opacity: 0 }}
          className="mt-6 text-[16px] md:text-[20px] font-normal leading-[1.5] text-[#A3A3A3]"
        >
          For every trader, every market, every trade
        </p>

        <div data-pf style={{ opacity: 0 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-[#CAFF5D] pl-6 pr-2 py-2
            text-[14px] font-semibold text-[#0A0A0A]
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            hover:brightness-110 active:scale-[0.97]"
          >
            Start trading
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A0A0A]/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full
            border border-white/15 text-white text-[14px] font-medium
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            hover:bg-white/5 hover:border-white/25 active:scale-[0.97]"
          >
            Partner with us
          </a>
        </div>
      </div>

      {/* SVG glow filter — CAFF5D (#CA=0.792, #FF=1.0, #5D=0.365) tuned */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id="pf-glow"
            colorInterpolationFilters="sRGB"
            x="-50%" y="-200%"
            width="200%" height="500%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="blur4"  />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9"  result="blur9"  />
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur19" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30" />

            {/* Layer 0 — tight core, near-white CAFF5D tint */}
            <feColorMatrix in="blur4" result="c0" type="matrix"
              values="0.90 0 0 0 0
                      0 1.00 0 0 0
                      0 0 0.55 0 0
                      0 0 0 0.80 0" />
            <feOffset in="c0" result="l0" dx="0" dy="0" />

            {/* Layer 1 — primary CAFF5D glow (blur=19) */}
            <feColorMatrix in="blur19" result="c1" type="matrix"
              values="0.792 0 0 0 0
                      0 1.00 0 0 0
                      0 0 0.365 0 0
                      0 0 0 1.00 0" />
            <feOffset in="c1" result="l1" dx="0" dy="2" />

            {/* Layer 2 — inner halo (blur=9) */}
            <feColorMatrix in="blur9" result="c2" type="matrix"
              values="0.65 0 0 0 0
                      0 0.85 0 0 0
                      0 0 0.30 0 0
                      0 0 0 0.65 0" />
            <feOffset in="c2" result="l2" dx="0" dy="2" />

            {/* Layer 3 — wide aura (blur=30) */}
            <feColorMatrix in="blur30" result="c3" type="matrix"
              values="0.55 0 0 0 0
                      0 0.75 0 0 0
                      0 0 0.25 0 0
                      0 0 0 1.00 0" />
            <feOffset in="c3" result="l3" dx="0" dy="2" />

            {/* Layer 4 — mid drop shadow (dy=16) */}
            <feColorMatrix in="blur30" result="c4" type="matrix"
              values="0.20 0 0 0 0
                      0 0.30 0 0 0
                      0 0 0.08 0 0
                      0 0 0 1.00 0" />
            <feOffset in="c4" result="l4" dx="0" dy="16" />

            {/* Layer 5 — deep shadow (dy=64) */}
            <feColorMatrix in="blur30" result="c5" type="matrix"
              values="0.12 0 0 0 0
                      0 0.18 0 0 0
                      0 0 0.05 0 0
                      0 0 0 1.00 0" />
            <feOffset in="c5" result="l5" dx="0" dy="64" />

            {/* Layer 6 — darkest shadow (dy=64) */}
            <feColorMatrix in="blur30" result="c6" type="matrix"
              values="0.06 0 0 0 0
                      0 0.09 0 0 0
                      0 0 0.02 0 0
                      0 0 0 1.00 0" />
            <feOffset in="c6" result="l6" dx="0" dy="64" />

            {/* Layer 7 — pure dark vignette (dy=64) */}
            <feColorMatrix in="blur30" result="c7" type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.68 0" />
            <feOffset in="c7" result="l7" dx="0" dy="64" />

            <feMerge>
              <feMergeNode in="l0" />
              <feMergeNode in="l1" />
              <feMergeNode in="l2" />
              <feMergeNode in="l3" />
              <feMergeNode in="l4" />
              <feMergeNode in="l5" />
              <feMergeNode in="l6" />
              <feMergeNode in="l7" />
              <feMergeNode in="l0" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  )
}
