import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
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
      // Text entrance
      gsap.fromTo(
        [h1Ref.current, subtitleRef.current, ctaWrapRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }
      )
      // Radial entrance: rises up and expands from below
      gsap.fromTo(
        radialRef.current,
        { opacity: 0, scale: 0.6, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
      )
      // Continuous breath pulse after entrance
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
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8
      min-h-[calc(100vh-40px)] overflow-hidden
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]
      dark:bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)]
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem]
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div className="absolute inset-x-0 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] flex justify-center pointer-events-none">
        <div
          ref={radialRef}
          className="opacity-0 h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[1400px]
          rounded-[100%]
          bg-[radial-gradient(closest-side,#fff_82%,#000000)]
          dark:bg-[radial-gradient(closest-side,#000_82%,#ffffff)]"
        />
      </div>

      {/* Title */}
      <h1
        ref={h1Ref}
        className="opacity-0 text-balance
        bg-gradient-to-br from-black from-30% to-black/40
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter
        text-transparent sm:text-6xl md:text-7xl lg:text-8xl
        dark:from-white dark:to-white/40"
      >
        Trade Defined
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="opacity-0 mb-12 text-balance
        text-lg tracking-tight text-gray-600 dark:text-gray-400
        md:text-xl"
      >
        Professional-grade execution and real-time market access,
        built for traders who demand precision.
      </p>

      {/* CTA */}
      <div ref={ctaWrapRef} className="opacity-0 flex justify-center">
        <a
          ref={ctaRef}
          href="#"
          className="group inline-flex items-center gap-2 rounded-full bg-black pl-6 pr-2 py-2 mt-[-20px] z-20
          text-[14px] font-semibold text-white
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          hover:bg-black/80 active:scale-[0.97]
          dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Explore products
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 dark:bg-black/10">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </div>

      {/* Bottom Fade */}
      <div
        className="relative mt-32 [perspective:2000px]
        after:absolute after:inset-0 after:z-50
        after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      />
    </section>
  )
}
