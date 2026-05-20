import { useEffect, useRef } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-0 rounded-full"
      style={{
        width: 900,
        height: 900,
        background:
          "radial-gradient(circle, rgba(202,255,93,0.045) 0%, transparent 60%)",
        left: 0,
        top: 0,
        transform: "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)",
        willChange: "transform",
      }}
    />
  )
}
