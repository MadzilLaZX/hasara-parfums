"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

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
                src="/images/founder.png"
                alt="Sardar Md Abid Hasan — Founder, Hasara Parfums"
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
              Meet The Founder
            </p>
            <h2 className="font-serif text-champagne-white text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-8 tracking-wide">
              A Passion Turned{" "}
              <span className="italic text-champagne-gold">Into Purpose</span>
            </h2>
            <div className="space-y-5 text-champagne-white/60 font-sans text-sm lg:text-base leading-relaxed">
              <p>
                Founded in August 2025 in Dhaka, Bangladesh, HASARA was established by Sardar Md Abid Hasan — a young entrepreneur whose passion for fragrance started in childhood.
              </p>
              <p>
                Long before creating the brand, he was captivated by the way a scent could evoke memories, express personality, and inspire confidence. What began as curiosity gradually evolved into a vision: to build a perfume house dedicated to quality, craftsmanship, and trust.
              </p>
              <p>
                The name HASARA is derived from the initials of his closest family members — a lasting tribute to the values that continue to inspire the brand.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 text-champagne-gold/70 hover:text-champagne-gold text-xs tracking-[0.25em] uppercase font-sans transition-colors duration-300"
            >
              Read the full story
              <ArrowRight size={13} />
            </Link>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-champagne-gold/20">
              {[
                { value: "40%", label: "Concentration" },
                { value: "8+", label: "Hours Longevity" },
                { value: "11", label: "Fragrances" },
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
