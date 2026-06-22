"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import {
  Star,
  Clock,
  Sparkle,
  Gift,
  ShieldCheck,
} from "@phosphor-icons/react";

const features = [
  {
    icon: Star,
    title: "Premium Fragrances",
    description:
      "Every scent is crafted from the world's finest raw materials, sourced from the most prestigious regions.",
  },
  {
    icon: Clock,
    title: "Long Lasting Scents",
    description:
      "Our formulations are concentrated to last 8-12+ hours, ensuring your presence is felt throughout the day.",
  },
  {
    icon: Sparkle,
    title: "Curated Collection",
    description:
      "A carefully selected range spanning signature, oud, men's, and women's compositions for every occasion.",
  },
  {
    icon: Gift,
    title: "Elegant Packaging",
    description:
      "Each bottle is a work of art, presented in luxurious packaging worthy of the fragrance it holds.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Experience",
    description:
      "A dedicated team committed to your satisfaction, available via WhatsApp for a personal shopping experience.",
  },
];

export default function WhyHasara() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#F0EBE3] py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="font-serif text-primary-text text-5xl lg:text-6xl font-light tracking-wide mb-4">
            Why Hasara
          </p>
          <div className="w-16 h-px bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={shouldReduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center group"
              >
                <div className="w-14 h-14 border border-champagne-gold/40 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-champagne-gold group-hover:border-champagne-gold transition-all duration-300">
                  <Icon
                    size={22}
                    weight="light"
                    className="text-champagne-gold group-hover:text-matte-black transition-colors duration-300"
                  />
                </div>
                <h3 className="font-serif text-primary-text text-lg font-medium mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-text text-sm font-sans leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
