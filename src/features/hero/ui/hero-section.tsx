import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useHeroIntroAnimation } from "@/features/hero/hooks/use-hero-intro-animation"
import { useMagnetic } from "@/shared/hooks/use-magnetic"

export function HeroSection() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.35)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const radialRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  useHeroIntroAnimation({
    titleRef: h1Ref,
    subtitleRef,
    ctaWrapRef,
    radialRef,
    chevronRef,
  })

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid" />

      <div className="hero-radial-wrap">
        <div ref={radialRef} className="hero-radial" />
      </div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-8">
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
      </div>

      <div ref={chevronRef} className="hero-chevron" aria-hidden="true">
        <ChevronDown size={48} strokeWidth={1.5} />
      </div>

      <div className="hero-fade" />
    </section>
  )
}
