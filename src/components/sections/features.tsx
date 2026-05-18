import { useEffect, useRef, type CSSProperties } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { FEATURES, type FeatureItem } from "@/components/features/feature-data"
import { FeatureText } from "@/components/features/feature-text"
import { FEATURE_VISUALS } from "@/components/features/visuals"

gsap.registerPlugin(ScrollTrigger)

interface FeatureRowProps {
  item: FeatureItem
  index: number
}

function FeatureRow({ item, index }: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const textLeft = index % 2 === 0
  const VisualComponent = FEATURE_VISUALS[index]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sr]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 82%",
          },
        },
      )
    }, rowRef)

    return () => ctx.revert()
  }, [])

  if (!VisualComponent) return null

  const accentStyle = {
    "--accent": item.accent.primary,
    "--accent-rgb": item.accent.primaryRgb,
    "--atmosphere-from": item.accent.atmosphereFrom,
    "--atmosphere-to": item.accent.atmosphereTo,
  } as CSSProperties

  const indexLabel = String(index + 1).padStart(2, "0")

  return (
    <div id={item.id} ref={rowRef} style={accentStyle} className="features-band scroll-mt-28">
      <div className="features-band-inner">
        <div data-sr className="features-meta">
          <span className="features-index">{indexLabel}</span>
          <span className="features-meta-divider" />
          <span className="features-meta-product">{item.product}</span>
        </div>
        <div className="features-row">
          {textLeft ? (
            <>
              <FeatureText item={item} />
              <VisualComponent />
            </>
          ) : (
            <>
              <VisualComponent />
              <FeatureText item={item} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="features-section scroll-mt-24">
      <div className="features-header-wrap">
        <div className="features-inner">
          <p className="features-tag">Products</p>
          <h2 className="features-heading">At every layer of trading</h2>
        </div>
      </div>
      <div className="features-bands">
        {FEATURES.map((feature, index) => (
          <FeatureRow key={feature.product} item={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
