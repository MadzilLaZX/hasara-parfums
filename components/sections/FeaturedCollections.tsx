"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { collections } from "@/data/products";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";

export default function FeaturedCollections() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-champagne-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-6"
        >
          <div>
            <p className="font-serif text-champagne-gold text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none mb-4">
              Our Collections
            </p>
            <div className="w-16 h-px bg-champagne-gold mt-6" />
          </div>
          <Link
            href="/fragrances"
            className="flex items-center gap-2 text-secondary-text hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 self-start lg:self-auto"
          >
            View All Fragrances
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Collections Grid — 3 large premium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={shouldReduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/fragrances?collection=${col.id}`}
                className="group block relative overflow-hidden cursor-pointer rounded-2xl"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-stone-900">
                  <Image
                    src={col.image}
                    alt={col.label}
                    fill
                    className="object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-matte-black/0 group-hover:bg-matte-black/15 transition-colors duration-500" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-sans text-champagne-gold text-xs tracking-[0.3em] uppercase mb-2">
                    {col.description}
                  </p>
                  <p className="font-serif text-champagne-white text-4xl lg:text-5xl font-light tracking-widest uppercase">
                    {col.label}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-champagne-white/50 group-hover:text-champagne-gold transition-colors duration-300">
                    <span className="text-xs tracking-[0.2em] uppercase font-sans">Shop Now</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
