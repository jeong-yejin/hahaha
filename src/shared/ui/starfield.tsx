import { useEffect, useRef } from "react"

interface StarfieldProps {
  starColor?: string
  bgColor?: string
  mouseAdjust?: boolean
  tiltAdjust?: boolean
  easing?: number
  clickToWarp?: boolean
  hyperspace?: boolean
  warpFactor?: number
  opacity?: number
  speed?: number
  quantity?: number
}

type Star = {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
  nextX: number
  nextY: number
  visible: boolean
}

const createStar = (width: number, height: number, depth: number): Star => ({
  x: Math.random() * width * 2 - width,
  y: Math.random() * height * 2 - height,
  z: Math.max(1, Math.random() * depth),
  prevX: 0,
  prevY: 0,
  nextX: 0,
  nextY: 0,
  visible: true,
})

export function Starfield({
  starColor = "rgba(255,255,255,1)",
  bgColor = "rgba(0,0,0,1)",
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const dimensions = { width: 0, height: 0, centerX: 0, centerY: 0, depth: 0 }
    const runtime = { rafId: 0, warp: hyperspace }
    let stars: Star[] = []

    const fillColor = () =>
      runtime.warp ? `rgba(0,0,0,${opacity})` : bgColor

    const measure = () => {
      const width = parent.clientWidth
      const height = parent.clientHeight
      const changed = width !== dimensions.width || height !== dimensions.height

      if (!changed) return

      dimensions.width = width
      dimensions.height = height
      dimensions.centerX = Math.round(width / 2)
      dimensions.centerY = Math.round(height / 2)
      dimensions.depth = Math.max(1, (width + height) / 2)

      canvas.width = width
      canvas.height = height

      if (target.x === 0 || target.y === 0) {
        target.x = dimensions.centerX
        target.y = dimensions.centerY
      }

      stars = Array.from({ length: quantity }, () =>
        createStar(width, height, dimensions.depth),
      )
    }

    const updateStars = () => {
      const adjustedEasing = Math.max(1, easing)
      pointer.x = (target.x - dimensions.centerX) / adjustedEasing
      pointer.y = (target.y - dimensions.centerY) / adjustedEasing

      const ratio = quantity / 2
      const computedSpeed = runtime.warp ? speed * warpFactor : speed

      for (const star of stars) {
        star.visible = true
        star.prevX = star.nextX
        star.prevY = star.nextY
        star.x += pointer.x >> 4
        star.y += pointer.y >> 4
        star.z -= computedSpeed

        if (star.x > dimensions.centerX << 1) {
          star.x -= dimensions.width << 1
          star.visible = false
        }
        if (star.x < -dimensions.centerX << 1) {
          star.x += dimensions.width << 1
          star.visible = false
        }
        if (star.y > dimensions.centerY << 1) {
          star.y -= dimensions.height << 1
          star.visible = false
        }
        if (star.y < -dimensions.centerY << 1) {
          star.y += dimensions.height << 1
          star.visible = false
        }
        if (star.z > dimensions.depth) {
          star.z -= dimensions.depth
          star.visible = false
        }
        if (star.z < 1) {
          star.z += dimensions.depth
          star.visible = false
        }

        star.nextX = dimensions.centerX + (star.x / star.z) * ratio
        star.nextY = dimensions.centerY + (star.y / star.z) * ratio
      }
    }

    const draw = () => {
      ctx.fillStyle = fillColor()
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      ctx.strokeStyle = starColor

      const colorRatio = 1 / dimensions.depth
      for (const star of stars) {
        if (
          star.prevX <= 0 ||
          star.prevX >= dimensions.width ||
          star.prevY <= 0 ||
          star.prevY >= dimensions.height ||
          !star.visible
        ) {
          continue
        }

        ctx.lineWidth = (1 - colorRatio * star.z) * 2
        ctx.beginPath()
        ctx.moveTo(star.prevX, star.prevY)
        ctx.lineTo(star.nextX, star.nextY)
        ctx.stroke()
      }
    }

    const animate = () => {
      measure()
      updateStars()
      draw()
      runtime.rafId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
    }

    const handleTilt = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return
      target.x = dimensions.centerX + event.gamma * 5
      target.y = dimensions.centerY + event.beta * 5
    }

    const enableWarp = () => {
      runtime.warp = true
    }

    const disableWarp = () => {
      runtime.warp = hyperspace
    }

    measure()
    runtime.rafId = requestAnimationFrame(animate)

    if (mouseAdjust) parent.addEventListener("mousemove", handleMouseMove)
    if (tiltAdjust) window.addEventListener("deviceorientation", handleTilt)
    if (clickToWarp) {
      parent.addEventListener("mousedown", enableWarp)
      parent.addEventListener("mouseup", disableWarp)
      parent.addEventListener("mouseleave", disableWarp)
    }

    return () => {
      cancelAnimationFrame(runtime.rafId)
      parent.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("deviceorientation", handleTilt)
      parent.removeEventListener("mousedown", enableWarp)
      parent.removeEventListener("mouseup", disableWarp)
      parent.removeEventListener("mouseleave", disableWarp)
    }
  }, [
    bgColor,
    clickToWarp,
    easing,
    hyperspace,
    mouseAdjust,
    opacity,
    quantity,
    speed,
    starColor,
    tiltAdjust,
    warpFactor,
  ])

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
