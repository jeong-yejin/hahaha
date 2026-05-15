import { useEffect, useRef } from "react"
import gsap from "gsap"

interface AnimVars {
  opacity?: number
  y?: number
  x?: number
  [key: string]: unknown
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: "chars" | "words"
  from?: AnimVars
  to?: AnimVars
  threshold?: number
  rootMargin?: string
  textAlign?: string
  onLetterAnimationComplete?: () => void
  showCallback?: boolean
  // external trigger — when provided, skips IntersectionObserver
  animate?: boolean
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback,
  animate,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const spans = () =>
    Array.from(containerRef.current?.querySelectorAll<HTMLElement>(".sc") ?? [])

  // set initial invisible state on mount
  useEffect(() => {
    gsap.set(spans(), from)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // external animate prop mode
  useEffect(() => {
    if (animate === undefined) return
    if (animate) {
      gsap.to(spans(), {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: showCallback ? onLetterAnimationComplete : undefined,
      })
    } else {
      gsap.set(spans(), from)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate])

  // IntersectionObserver mode (no animate prop passed)
  useEffect(() => {
    if (animate !== undefined) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(spans(), {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: showCallback ? onLetterAnimationComplete : undefined,
        })
        obs.disconnect()
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tokens =
    splitType === "chars"
      ? text.split("")
      : text.split(/(\s+)/)

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "block", textAlign: textAlign as React.CSSProperties["textAlign"] }}
      aria-label={text}
    >
      {tokens.map((token, i) =>
        token.trim() === "" ? (
          <span key={i} style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        ) : (
          <span key={i} className="sc" style={{ display: "inline-block" }}>
            {token}
          </span>
        ),
      )}
    </span>
  )
}
