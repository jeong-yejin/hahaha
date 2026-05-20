import { useEffect, type RefObject } from "react"

const STACK_POSITION_PCT = 0.18
const SCALE_END_PCT = 0.10
const ITEM_STACK_DISTANCE = 30
const BASE_SCALE = 0.88
const ITEM_SCALE = 0.03
const ENTRY_ROTATE_X = 20
const ENTRY_SCALE_FROM = 1.05
const ENTRY_END_PCT = 0.30

interface FeatureCardStackRefs {
  stackRef: RefObject<HTMLDivElement | null>
  entryRef: RefObject<HTMLDivElement | null>
  transformRef: RefObject<HTMLDivElement | null>
}

const absoluteTop = (el: HTMLElement) => {
  let top = 0
  let curr: HTMLElement | null = el

  while (curr) {
    top += curr.offsetTop
    curr = curr.offsetParent as HTMLElement | null
  }

  return top
}

const progressBetween = (value: number, start: number, end: number) => {
  if (end <= start) return value >= end ? 1 : 0
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

export function useFeatureCardStack({
  stackRef,
  entryRef,
  transformRef,
}: FeatureCardStackRefs) {
  useEffect(() => {
    const container = stackRef.current
    const entryEl = entryRef.current
    const transformEl = transformRef.current
    if (!container || !entryEl || !transformEl) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-feature-card]"),
    )
    if (!cards.length) return

    cards.forEach((card) => {
      card.style.willChange = "transform"
      card.style.transformOrigin = "top center"
      card.style.backfaceVisibility = "hidden"
    })

    transformEl.style.willChange = "transform"
    transformEl.style.transformOrigin = "top center"
    transformEl.style.backfaceVisibility = "hidden"

    let naturalTops: number[] = []
    let endTop = 0
    let entryTop = 0
    let rafId: number | null = null
    const last = new Map<number, { y: number; s: number; p: number }>()
    let lastEntry: { r: number; s: number } | null = null

    const measure = () => {
      cards.forEach((card) => {
        card.style.transform = ""
      })
      transformEl.style.transform = ""
      last.clear()
      lastEntry = null

      naturalTops = cards.map(absoluteTop)
      const endEl = container.querySelector<HTMLElement>(".feature-stack-end")
      const lastCard = cards[cards.length - 1]
      endTop = endEl
        ? absoluteTop(endEl)
        : absoluteTop(lastCard) + lastCard.offsetHeight
      entryTop = absoluteTop(entryEl)
    }

    const update = () => {
      const scrollTop = window.scrollY
      const vh = window.innerHeight
      const stackPx = STACK_POSITION_PCT * vh
      const scaleEndPx = SCALE_END_PCT * vh
      const pinEnd = endTop - vh / 2

      const entryStart = entryTop - vh
      const entryEnd = entryTop - ENTRY_END_PCT * vh
      const entryProgress = progressBetween(scrollTop, entryStart, entryEnd)
      const rotateX = ENTRY_ROTATE_X * (1 - entryProgress)
      const entryScale = ENTRY_SCALE_FROM - (ENTRY_SCALE_FROM - 1) * entryProgress
      const roundedRotateX = Math.round(rotateX * 100) / 100
      const roundedEntryScale = Math.round(entryScale * 1000) / 1000

      if (
        !lastEntry ||
        Math.abs(lastEntry.r - roundedRotateX) > 0.01 ||
        Math.abs(lastEntry.s - roundedEntryScale) > 0.001
      ) {
        transformEl.style.transform = `rotateX(${roundedRotateX}deg) scale(${roundedEntryScale})`
        lastEntry = { r: roundedRotateX, s: roundedEntryScale }
      }

      cards.forEach((card, index) => {
        const cardTop = naturalTops[index]
        const pinStart = cardTop - stackPx - ITEM_STACK_DISTANCE * index
        const triggerEnd = cardTop - scaleEndPx
        const stackProgress = progressBetween(scrollTop, pinStart, triggerEnd)
        const targetScale = BASE_SCALE + index * ITEM_SCALE
        const scale = 1 - stackProgress * (1 - targetScale)

        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPx + ITEM_STACK_DISTANCE * index
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPx + ITEM_STACK_DISTANCE * index
        }

        const roundedY = Math.round(translateY * 100) / 100
        const roundedScale = Math.round(scale * 1000) / 1000
        const roundedProgress = Math.round(stackProgress * 100) / 100
        const prev = last.get(index)

        if (
          !prev ||
          Math.abs(prev.y - roundedY) > 0.1 ||
          Math.abs(prev.s - roundedScale) > 0.001 ||
          Math.abs((prev.p ?? -1) - roundedProgress) > 0.01
        ) {
          card.style.transform = `translate3d(0, ${roundedY}px, 0) scale(${roundedScale})`
          card.style.setProperty("--card-progress", String(roundedProgress))
          last.set(index, { y: roundedY, s: roundedScale, p: roundedProgress })
        }
      })
    }

    const scheduleUpdate = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    const measureAndUpdate = () => {
      measure()
      update()
    }

    measureAndUpdate()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", measureAndUpdate)

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureAndUpdate)
    resizeObserver?.observe(container)
    cards.forEach((card) => resizeObserver?.observe(card))

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", measureAndUpdate)
      resizeObserver?.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)

      cards.forEach((card) => {
        card.style.transform = ""
        card.style.willChange = ""
        card.style.transformOrigin = ""
        card.style.backfaceVisibility = ""
      })

      transformEl.style.transform = ""
      transformEl.style.willChange = ""
      transformEl.style.transformOrigin = ""
      transformEl.style.backfaceVisibility = ""
    }
  }, [entryRef, stackRef, transformRef])
}
