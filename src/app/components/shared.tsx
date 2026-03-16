import { useRef } from "react";
import { motion, useInView } from "motion/react";

export const SERIF = "'Instrument Serif', Georgia, serif";
export const CTA_ORANGE = "#FF6A00";
export const BG_COLOR = "#0F0F10";
export const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export interface PlanData {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceLabel: string;
  priceSub: string;
  popular: boolean;
  btnText: string;
  features: string[];
}

export const PLANS: PlanData[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "Great for getting started with client acquisition basics.",
    price: 50,
    priceLabel: "$50",
    priceSub: "one-time",
    popular: false,
    btnText: "Get Instant Access",
    features: [
      "Training videos",
      "Beginner roadmap",
      "AI client method",
      "Niche list",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "The complete system with scripts, templates, and frameworks.",
    price: 300,
    priceLabel: "$300",
    priceSub: "one-time",
    popular: true,
    btnText: "Start Getting Clients",
    features: [
      "Everything in Starter",
      "Outreach scripts",
      "AI lead templates",
      "Client acquisition frameworks",
      "Notion CRM system",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    desc: "Premium access with advanced strategies and future updates.",
    price: 999,
    priceLabel: "$999",
    priceSub: "one-time",
    popular: false,
    btnText: "Get Instant Access",
    features: [
      "Everything in Pro",
      "Advanced strategies",
      "Premium templates",
      "Scaling system",
      "Future updates",
    ],
  },
];

export function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
