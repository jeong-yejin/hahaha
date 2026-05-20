import { useRef } from "react"

import { useFeatureCardStack } from "@/Sections/product-showcase/hooks/use-feature-card-stack"
import { FEATURES } from "@/Sections/product-showcase/model/feature-data"
import { ProductFeatureCard } from "@/Sections/product-showcase/ui/feature-card"

export function ProductFeaturesSection() {
  const stackRef = useRef<HTMLDivElement>(null)
  const entryRef = useRef<HTMLDivElement>(null)
  const transformRef = useRef<HTMLDivElement>(null)

  useFeatureCardStack({ stackRef, entryRef, transformRef })

  return (
    <section id="features" className="features-section scroll-mt-24">
      <div ref={entryRef} style={{ perspective: "1200px" }}>
        <div ref={transformRef}>
          <div ref={stackRef} className="features-bands">
            {FEATURES.map((feature, index) => (
              <ProductFeatureCard key={feature.product} item={feature} index={index} />
            ))}
            <div className="feature-stack-end" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
