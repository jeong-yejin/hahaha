import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBackgroundProps {
  startingGap?: number
  Breathing?: boolean
  gradientColors?: string[]
  gradientStops?: number[]
  animationSpeed?: number
  breathingRange?: number
  containerStyle?: React.CSSProperties
  containerClassName?: string
  topOffset?: number
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125,
  Breathing = false,
  gradientColors = ["#0A0A0A", "#101f02", "#0b1f10", "#071408", "#040d04", "#030808", "#0A0A0A"],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `gradientColors and gradientStops must have the same length. Got ${gradientColors.length} vs ${gradientStops.length}`
    )
  }

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let animationFrame: number
    let width = startingGap
    let dir = 1

    const animate = () => {
      if (width >= startingGap + breathingRange) dir = -1
      if (width <= startingGap - breathingRange) dir = 1
      if (!Breathing) dir = 0
      width += dir * animationSpeed

      const stops = gradientStops
        .map((stop, i) => `${gradientColors[i]} ${stop}%`)
        .join(", ")

      if (containerRef.current) {
        containerRef.current.style.background =
          `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${stops})`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset])

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{ opacity: 0, scale: 1.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0"
      />
    </motion.div>
  )
}

export default AnimatedGradientBackground
