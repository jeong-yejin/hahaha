import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - (left + width / 2)) * strength
      const y = (e.clientY - (top + height / 2)) * strength
      gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" })
    }

    const reset = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" })
    }

    el.addEventListener("mousemove", move)
    el.addEventListener("mouseleave", reset)
    return () => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", reset)
    }
  }, [strength])

  return ref
}
