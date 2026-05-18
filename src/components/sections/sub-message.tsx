import { useEffect, useRef, useState } from "react"
import SplitText from "@/components/ui/SplitText"

const LINES = [
  "Trade together",
  "Trade smarter",
  "Trade simpler",
]

export function SubMessage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handle = () => {
      const { top, height } = section.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const progress = Math.max(0, Math.min(1, -top / scrollable))
      setCurrentIndex(Math.min(Math.floor(progress * LINES.length), LINES.length - 1))
    }

    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return (
    <section ref={sectionRef} className="sub-section">
      <div className="sub-sticky">
        <div className="sub-inner">
          <div className="relative">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={`sub-line${i > 0 ? " sub-line-stacked" : ""}`}
                style={{
                  opacity: i === currentIndex ? 1 : 0,
                  pointerEvents: i === currentIndex ? "auto" : "none",
                }}
              >
                <SplitText
                  text={line}
                  animate={i === currentIndex}
                  className="sub-text"
                  delay={40}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
