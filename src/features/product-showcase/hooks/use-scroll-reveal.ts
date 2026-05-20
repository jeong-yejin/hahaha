import { useEffect, type RefObject } from "react"

interface ScrollRevealOptions {
  selector?: string
  rootMargin?: string
  offsetY?: number
  durationMs?: number
  staggerMs?: number
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  {
    selector = "[data-sr]",
    rootMargin = "0px 0px -18% 0px",
    offsetY = 28,
    durationMs = 900,
    staggerMs = 90,
  }: ScrollRevealOptions = {},
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === "undefined") return

    const items = Array.from(container.querySelectorAll<HTMLElement>(selector))
    if (!items.length) return

    items.forEach((el, index) => {
      const delay = index * staggerMs
      el.style.opacity = "0"
      el.style.transform = `translateY(${offsetY}px)`
      el.style.willChange = "opacity, transform"
      el.style.transition =
        `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, ` +
        `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          items.forEach((el) => {
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
          })

          window.setTimeout(() => {
            items.forEach((el) => {
              el.style.willChange = ""
            })
          }, durationMs + items.length * staggerMs)

          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [containerRef, durationMs, offsetY, rootMargin, selector, staggerMs])
}
