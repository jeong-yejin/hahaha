import { ArrowUpRight } from "lucide-react"

import type { FeatureItem } from "@/features/product-showcase/model/feature-data"

interface FeatureTextProps {
  item: FeatureItem
}

export function FeatureProduct({ item }: FeatureTextProps) {
  return (
    <span data-sr className="features-meta-product self-start">
      {item.product}
    </span>
  )
}

export function FeatureTagline({ item }: FeatureTextProps) {
  return (
    <h3 data-sr className="text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
      {item.tagline}
    </h3>
  )
}

export function FeatureDescription({ item }: FeatureTextProps) {
  return (
    <p data-sr className="max-w-[340px] text-[24px] leading-[1.3] tracking-[-0.02em] text-[#D4D4D4]">
      {item.description}
    </p>
  )
}

export function FeatureCta({ item }: FeatureTextProps) {
  return (
    <a
      data-sr
      href={item.href}
      className="group relative inline-flex w-fit cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-[#CAFF5D]/25 bg-[linear-gradient(180deg,rgba(202,255,93,0.08)_0%,rgba(202,255,93,0.02)_100%)] py-2.5 pl-5 pr-5 text-[16px] font-medium tracking-[-0.01em] text-[#CAFF5D] transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#CAFF5D]/55 hover:shadow-[0_0_0_4px_rgba(202,255,93,0.06),0_18px_42px_-14px_rgba(202,255,93,0.45)] active:scale-[0.97]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(202,255,93,0.18)_50%,transparent_70%)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      <span className="relative">{item.cta}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

export function FeatureText({ item }: FeatureTextProps) {
  return (
    <div className="flex flex-col justify-center gap-5">
      <FeatureProduct item={item} />
      <FeatureTagline item={item} />
      <FeatureDescription item={item} />
      <div className="mt-4">
        <FeatureCta item={item} />
      </div>
    </div>
  )
}
