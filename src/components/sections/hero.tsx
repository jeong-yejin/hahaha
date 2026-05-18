import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useMagnetic } from "@/hooks/use-magnetic"

export function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.35)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const radialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [h1Ref.current, subtitleRef.current, ctaWrapRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }
      )
      gsap.fromTo(
        radialRef.current,
        { opacity: 0, scale: 0.6, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
      )
      gsap.to(radialRef.current, {
        scale: 1.06,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.7,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid" />

      <div className="hero-radial-wrap">
        <div ref={radialRef} className="hero-radial" />
      </div>

      <h1 ref={h1Ref} className="hero-title">
        Trade, Defined
      </h1>

      <p ref={subtitleRef} className="hero-subtitle">
        Professional-grade execution and real-time market access,
        built for traders who demand precision.
      </p>

      <div ref={ctaWrapRef} className="hero-cta-wrap">
        <a ref={ctaRef} href="#features" className="group hero-cta-primary">
          See the platform
        </a>
      </div>

      <div className="hero-fade" />
    </section>
  )
}
