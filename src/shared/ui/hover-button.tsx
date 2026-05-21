import * as React from "react"
import { cn } from "@/shared/lib/utils"

type HoverButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: React.MouseEventHandler
}

export function HoverButton({ className, children, href, onClick }: HoverButtonProps) {
  const elRef = React.useRef<HTMLElement>(null)
  const [isListening, setIsListening] = React.useState(false)
  const lastAddedRef = React.useRef(0)
  const [circles, setCircles] = React.useState<Array<{
    id: number
    x: number
    y: number
    fadeState: "in" | "out" | null
  }>>([])

  const createCircle = React.useCallback((x: number, y: number) => {
    setCircles(prev => [...prev, { id: Date.now(), x, y, fadeState: null }])
  }, [])

  const handlePointerMove = React.useCallback((e: React.PointerEvent) => {
    if (!isListening) return
    const now = Date.now()
    if (now - lastAddedRef.current < 100) return
    lastAddedRef.current = now
    const rect = e.currentTarget.getBoundingClientRect()
    createCircle(e.clientX - rect.left, e.clientY - rect.top)
  }, [isListening, createCircle])

  const handlePointerEnter = React.useCallback(() => setIsListening(true), [])
  const handlePointerLeave = React.useCallback(() => setIsListening(false), [])

  React.useEffect(() => {
    circles.forEach(circle => {
      if (circle.fadeState !== null) return
      setTimeout(() => setCircles(prev =>
        prev.map(c => c.id === circle.id ? { ...c, fadeState: "in" } : c)
      ), 0)
      setTimeout(() => setCircles(prev =>
        prev.map(c => c.id === circle.id ? { ...c, fadeState: "out" } : c)
      ), 800)
      setTimeout(() => setCircles(prev => prev.filter(c => c.id !== circle.id)), 2000)
    })
  }, [circles])

  const shared = {
    ref: elRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    className: cn(
      "relative isolate overflow-hidden cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF5D] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:z-[1]",
      "before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_0%,transparent_50%)]",
      "before:shadow-[inset_0_0_0_1px_rgba(202,255,93,1),inset_0_0_18px_0_rgba(202,255,93,0.07),inset_0_-4px_12px_0_rgba(0,0,0,0.45),0_1px_3px_0_rgba(0,0,0,0.6),0_4px_20px_0_rgba(202,255,93,0.18)]",
      "before:transition-transform before:duration-300 active:before:scale-[0.975]",
      className
    ),
  }

  const inner = (
    <>
      {circles.map(({ id, x, y, fadeState }) => (
        <span
          key={id}
          className={cn(
            "absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "blur-xl pointer-events-none z-[-1] transition-opacity duration-300",
            fadeState === "in"  && "opacity-60",
            fadeState === "out" && "opacity-0 !duration-[1.2s]",
            !fadeState          && "opacity-0"
          )}
          style={{ left: x, top: y, background: "rgba(255,255,255,0.9)" }}
        />
      ))}
      {children}
    </>
  )

  if (href) {
    return <a href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} {...shared}>{inner}</a>
  }

  return (
    <button type="button" onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} {...shared}>
      {inner}
    </button>
  )
}
