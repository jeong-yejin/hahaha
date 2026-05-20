export interface PlatformAccent {
  primary: string
  primaryRgb: string
  atmosphereFrom: string
  atmosphereTo: string
}

export interface FeatureItem {
  id: string
  product: string
  tagline: string
  description: string
  cta: string
  href: string
  accent: PlatformAccent
  bg: string
}

export const FEATURES: FeatureItem[] = [
  {
    id: "feature-terminal",
    product: "ReboundX Terminal",
    tagline: "Why trade across many tabs?",
    description: "Execution, position visibility, and settlement in one screen",
    cta: "Launch Terminal",
    href: "#",
    bg: "#0a0a0a",
    accent: {
      primary: "#CAFF5D",
      primaryRgb: "202,255,93",
      atmosphereFrom: "#BAFF38",
      atmosphereTo: "#FFFF38",
    },
  },
  {
    id: "feature-rebate",
    product: "ReboundX Rebate",
    tagline: "Why lose money on fees? ",
    description: "Automated rebate tracking and payout across all connected venues",
    cta: "Claim Rebate",
    href: "#",
    bg: "#0E0E0F",
    accent: {
      primary: "#FFC93C",
      primaryRgb: "255,201,60",
      atmosphereFrom: "#FFC93C",
      atmosphereTo: "#FF8A29",
    },
  },
  {
    id: "feature-labs",
    product: "ReboundX Labs",
    tagline: "Why aren't you live in Korea yet?",
    description: "Distribution, compliance, and integration support for markets entering Korea",
    cta: "Get in Touch",
    href: "#",
    bg: "#0a0a0a",
    accent: {
      primary: "#7AB6FF",
      primaryRgb: "122,182,255",
      atmosphereFrom: "#7AB6FF",
      atmosphereTo: "#C77DFF",
    },
  },
]
