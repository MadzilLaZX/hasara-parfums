"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

export default function BrandStory() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="story" className="bg-matte-black py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/brand-story.jpg"
                alt="Hasara Parfums - The Art of Fragrance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-8">
              Our Story
            </p>
            <h2 className="font-serif text-champagne-white text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-8 tracking-wide">
              Scent is the{" "}
              <span className="italic text-champagne-gold">language</span>
              {" "}of the soul.
            </h2>
            <div className="space-y-5 text-champagne-white/60 font-sans text-sm lg:text-base leading-relaxed">
              <p>
                Hasara Parfums was born from a deep belief that fragrance is
                more than a product. It is an expression of identity, a mark of
                presence, a silent declaration of who you are.
              </p>
              <p>
                Each of our fragrances is a carefully composed story, crafted
                from the world's finest ingredients. From the ancient oud forests
                of Southeast Asia to the rose valleys of Turkey, we source only
                the most precious raw materials.
              </p>
              <p>
                We believe that luxury should be felt, not just worn. Every
                bottle of Hasara carries with it a promise of craftsmanship,
                elegance, and an experience that transcends the ordinary.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-champagne-gold/20">
              {[
                { value: "100%", label: "Premium Ingredients" },
                { value: "8+", label: "Hours Longevity" },
                { value: "4", label: "Collections" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-champagne-gold text-3xl font-light">
                    {stat.value}
                  </p>
                  <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-1 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
