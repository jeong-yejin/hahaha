import { useEffect, useState } from "react"

export function useScrollThreshold(thresholdPx: number) {
  const [hasCrossedThreshold, setHasCrossedThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasCrossedThreshold(window.scrollY > thresholdPx)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [thresholdPx])

  return hasCrossedThreshold
}
