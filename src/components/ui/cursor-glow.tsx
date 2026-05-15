import { useEffect, useRef } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: 900,
        height: 900,
        background:
          "radial-gradient(circle, rgba(202,255,93,0.045) 0%, transparent 60%)",
        left: -9999,
        top: -9999,
        willChange: "left, top",
      }}
    />
  )
}
