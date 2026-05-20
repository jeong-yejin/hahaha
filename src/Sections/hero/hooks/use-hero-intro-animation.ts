import { useEffect, type RefObject } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion"

interface HeroIntroRefs {
  titleRef: RefObject<HTMLHeadingElement | null>
  subtitleRef: RefObject<HTMLParagraphElement | null>
  ctaWrapRef: RefObject<HTMLDivElement | null>
  radialRef: RefObject<HTMLDivElement | null>
  chevronRef: RefObject<HTMLDivElement | null>
}

export function useHeroIntroAnimation({
  titleRef,
  subtitleRef,
  ctaWrapRef,
  radialRef,
  chevronRef,
}: HeroIntroRefs) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealTargets = [
        titleRef.current,
        subtitleRef.current,
        ctaWrapRef.current,
        chevronRef.current,
      ].filter(Boolean)

      if (reduced) {
        gsap.set([...revealTargets, radialRef.current].filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      if (revealTargets.length) {
        gsap.fromTo(
          revealTargets,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
        )
      }

      if (radialRef.current) {
        gsap.fromTo(
          radialRef.current,
          { opacity: 0, scale: 0.6, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.3 },
        )
        gsap.to(radialRef.current, {
          scale: 1.06,
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.7,
        })
      }

      if (chevronRef.current) {
        gsap.timeline({ repeat: -1, delay: 1.6 })
          .to(chevronRef.current, {
            y: 6,
            duration: 0.625,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 7,
          })
          .to(chevronRef.current, {
            opacity: 0,
            duration: 1.0,
            ease: "sine.inOut",
          })
          .to(chevronRef.current, {
            opacity: 1,
            duration: 1.0,
            ease: "sine.inOut",
          }, "+=5")
      }
    })

    return () => ctx.revert()
  }, [reduced, ctaWrapRef, chevronRef, radialRef, subtitleRef, titleRef])
}
