import { useEffect, useRef, useState } from "react"
import SplitText from "@/components/ui/SplitText"

const LINES = [
  "For sharper trading",
  "For deeper markets",
  "For clearer infrastructure",
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
    <section
      ref={sectionRef}
      style={{ height: "180vh" }}
      className="relative bg-[#0A0A0A]"
    >
      <div className="sticky top-0 flex items-center h-screen">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8">
          <div className="relative">
            {LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: i === currentIndex ? 1 : 0,
                  pointerEvents: i === currentIndex ? "auto" : "none",
                  transition: "opacity 0.35s ease",
                  ...(i > 0 && { position: "absolute", top: 0, left: 0, width: "100%" }),
                }}
              >
                <SplitText
                  text={line}
                  animate={i === currentIndex}
                  className="text-[36px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-white"
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
