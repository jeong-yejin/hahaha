import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LINES = [
  "Trade together",
  "Trade smarter",
  "Trade simpler",
]

export function SubMessage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>("[data-sm]")
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, filter: "blur(12px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="sub-section">
      <div className="sub-sticky">
        <div className="sub-inner">
          <div className="flex flex-col items-center text-center">
            {LINES.map((line) => (
              <span
                key={line}
                data-sm
                className="sub-text"
                style={{ opacity: 0, filter: "blur(12px)" }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
