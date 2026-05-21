import { useCallback, useEffect, useRef, type ReactNode } from "react"

interface BezelProps {
  children: ReactNode
}

interface AppChromeProps {
  right?: ReactNode
}

interface PillProps {
  children: ReactNode
  active?: boolean
}

interface DropdownProps {
  label: string
}

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number | null = null
    type Star = { x: number; y: number; o: number; speed: number; r: number }
    let stars: Star[] = []

    const resize = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = width
      canvas.height = height
      stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        o: Math.random(),
        speed: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.005),
        r: 0.4 + Math.random() * 0.9,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        star.o += star.speed
        if (star.o >= 1) {
          star.o = 1
          star.speed *= -1
        }
        if (star.o <= 0) {
          star.o = 0
          star.speed *= -1
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.o * 0.55})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    resize()

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      stop()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}

export function VisualContainer({ children }: BezelProps) {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: 16,
        paddingLeft: 12,
        paddingRight: 12,
        background: "rgba(255, 255, 255, 0.03)",
        overflow: "hidden",
        borderRadius: 12,
        outline: "1px rgba(255, 255, 255, 0.08) solid",
        outlineOffset: "-1px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%), #07070C",
          boxShadow: "0px 0px 24px rgba(255, 255, 255, 0.04) inset",
          overflow: "hidden",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderLeft: "1px rgba(255, 255, 255, 0.10) solid",
          borderTop: "1px rgba(255, 255, 255, 0.10) solid",
          borderRight: "1px rgba(255, 255, 255, 0.10) solid",
          aspectRatio: "4 / 3",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 548,
            maxWidth: 606,
            height: 385,
            position: "absolute",
            left: 337,
            top: -252,
            transform: "rotate(-6deg)",
            transformOrigin: "top left",
            opacity: 0.18,
            background: "linear-gradient(180deg, #BAFF38 0%, #FFFF38 100%)",
            filter: "blur(50px)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    </div>
  )
}

export function Bezel({ children }: BezelProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = outerRef.current?.getBoundingClientRect()
    if (!rect || !glowRef.current) return

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(202,255,93,0.18), transparent 55%)`
  }, [])

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "none"
  }, [])

  return (
    <div
      ref={outerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-[2rem] p-[1px] shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-[2rem]" style={{ transition: "background 0.12s ease" }} />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.07]" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-1px)] bg-[#0C0C0C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <StarCanvas />
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#CAFF5D]/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[#4A9EFF]/[0.03] blur-3xl" />
        {children}
      </div>
    </div>
  )
}

export function AppChrome({ right }: AppChromeProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.01] px-3.5 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      {right && <div className="ml-2 flex flex-1 items-center gap-2">{right}</div>}
    </div>
  )
}

export function Pill({ children, active }: PillProps) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${active ? "bg-[#CAFF5D]/15 text-[#CAFF5D]" : "text-white/45"}`}>
      {children}
    </span>
  )
}

export function Dropdown({ label }: DropdownProps) {
  return (
    <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/50">
      {label}
    </span>
  )
}
