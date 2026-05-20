import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { SUB_MESSAGE_LINES } from "@/features/sub-message/model/sub-message-copy"
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function SubMessageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const words = section.querySelectorAll<HTMLElement>("[data-sm-word]")
    if (!words.length) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(words, { opacity: 1 })
        return
      }

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: { each: 0.08, ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} className="sub-section">
      <div className="sub-sticky">
        <div className="sub-inner">
          <div className="flex flex-col items-center gap-4 text-center">
            {SUB_MESSAGE_LINES.map((line) => {
              const words = line.split(" ")
              return (
                <span key={line} className="sub-text">
                  {words.map((word, i) => (
                    <span
                      key={`${line}-${i}`}
                      data-sm-word
                      className="inline-block"
                      style={reduced ? undefined : { opacity: 0.1 }}
                    >
                      {word}
                      {i < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
