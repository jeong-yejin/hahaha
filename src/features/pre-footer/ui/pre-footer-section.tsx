import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion"
import { GlowButton } from "@/shared/ui/glow-button"
import { ShinyButton } from "@/shared/ui/shiny-button"
import { Starfield } from "@/shared/ui/starfield"

export function PreFooterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const targets = el.querySelectorAll("[data-pf]")

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    let fired = false
    const play = () => {
      if (fired) return
      fired = true

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      })
    }

    gsap.set(targets, { y: 32 })

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
  }, [reduced])

  return (
    <section className="pre-footer-section">
      <Starfield
        starColor="rgba(255,255,255,0.9)"
        bgColor="#0A0A0A"
        speed={0.6}
        quantity={420}
      />

      <div ref={containerRef} className="pre-footer-inner">
        <h2 data-pf style={{ opacity: reduced ? 1 : 0 }} className="pre-footer-heading">
          ReboundX defines
          <br />
          <span className="pre-footer-gradient-text">what trade can be</span>
        </h2>

        <p data-pf style={{ opacity: reduced ? 1 : 0 }} className="pre-footer-sub">
          For every trader, every market, every trade
        </p>

        <div data-pf style={{ opacity: reduced ? 1 : 0 }} className="pre-footer-cta">
          <GlowButton label="Start trading" className="h-10" />
          <ShinyButton className="h-10" style={{ "--primary": "80 100% 68%" }}>
            Partner with us
          </ShinyButton>
        </div>
      </div>

    </section>
  )
}
