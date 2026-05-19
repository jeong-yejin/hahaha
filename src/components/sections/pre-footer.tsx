import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { GlowButton } from "@/components/ui/glow-button"
import { ShinyButton } from "@/components/ui/shiny-button"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-bg"

const GRADIENT_COLORS = ["#0A0A0A", "#101f02", "#0b1f10", "#071408", "#040d04", "#030808", "#0A0A0A"]
const GRADIENT_STOPS  = [35, 50, 60, 70, 80, 90, 100]

export function PreFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let fired = false
    const play = () => {
      if (fired) return
      fired = true

      gsap.to(el.querySelectorAll("[data-pf]"), {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      })

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 2,
        })
      }
    }

    gsap.set(el.querySelectorAll("[data-pf]"), { y: 32 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="pre-footer-section">
      <AnimatedGradientBackground
        gradientColors={GRADIENT_COLORS}
        gradientStops={GRADIENT_STOPS}
        startingGap={115}
        Breathing={true}
        breathingRange={4}
        animationSpeed={0.012}
        topOffset={10}
      />

      <div ref={containerRef} className="pre-footer-inner">
        <h2 data-pf style={{ opacity: 0 }} className="pre-footer-heading">
          ReboundX defines
          <br />
          <span className="pre-footer-highlight">
            <span className="pre-footer-gradient-text">what trade can be</span>
            <span
              ref={glowRef}
              aria-hidden
              className="pre-footer-gradient-text absolute inset-0"
              style={{ filter: "url(#pf-glow)", opacity: 0 }}
            >
              what trade can be
            </span>
          </span>
        </h2>

        <p data-pf style={{ opacity: 0 }} className="pre-footer-sub">
          For every trader, every market, every trade
        </p>

        <div data-pf style={{ opacity: 0 }} className="pre-footer-cta">
          <GlowButton label="Start trading" className="h-10" />
          <ShinyButton className="h-10" style={{ "--primary": "80 100% 68%" }}>
            Partner with us
          </ShinyButton>
        </div>
      </div>

      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id="pf-glow"
            colorInterpolationFilters="sRGB"
            x="-50%" y="-200%"
            width="200%" height="500%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="blur2"  />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9"  result="blur4"  />
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur10" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur15" />

            <feColorMatrix in="blur2"  result="c0" type="matrix" values="0.90 0 0 0 0  0 1.00 0 0 0  0 0 0.55 0 0  0 0 0 0.35 0" />
            <feOffset in="c0" result="l0" dx="0" dy="0" />
            <feColorMatrix in="blur10" result="c1" type="matrix" values="0.792 0 0 0 0  0 1.00 0 0 0  0 0 0.365 0 0  0 0 0 0.40 0" />
            <feOffset in="c1" result="l1" dx="0" dy="2" />
            <feColorMatrix in="blur4"  result="c2" type="matrix" values="0.65 0 0 0 0  0 0.85 0 0 0  0 0 0.30 0 0  0 0 0 0.25 0" />
            <feOffset in="c2" result="l2" dx="0" dy="2" />
            <feColorMatrix in="blur15" result="c3" type="matrix" values="0.55 0 0 0 0  0 0.75 0 0 0  0 0 0.25 0 0  0 0 0 0.30 0" />
            <feOffset in="c3" result="l3" dx="0" dy="2" />

            <feMerge>
              <feMergeNode in="l0" />
              <feMergeNode in="l1" />
              <feMergeNode in="l2" />
              <feMergeNode in="l3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  )
}
