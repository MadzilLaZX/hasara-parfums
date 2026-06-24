"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fragrances } from "@/data/products";
import { ArrowRight } from "@phosphor-icons/react";

export default function BestSellers() {
  const shouldReduce = useReducedMotion();
  const bestsellers = fragrances.filter((f) => f.bestseller).slice(0, 4);

  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    bestsellers.forEach((f) => { d[f.slug] = f.sizes[1]?.ml ?? f.sizes[0].ml; });
    return d;
  });

  return (
    <section className="bg-champagne-white py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="font-serif text-primary-text text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none">
              Best Sellers
            </p>
            <div className="w-16 h-px bg-champagne-gold mt-6" />
          </div>
          <Link
            href="/fragrances"
            className="flex items-center gap-2 text-secondary-text hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 self-start lg:self-auto"
          >
            View All Parfums
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((product, i) => {
            const selectedMl = selectedSizes[product.slug];
            const selectedSizeObj = product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];
            return (
              <motion.div
                key={product.id}
                initial={shouldReduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* Image */}
                <Link href={`/fragrances/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-900 mb-5 rounded-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-matte-black/0 group-hover:bg-matte-black/10 transition-colors duration-500" />
                </Link>

                {/* Collection label */}
                <p className="text-xs tracking-[0.2em] uppercase font-sans mb-1">
                  <span className="text-champagne-gold/40">Collection For </span>
                  <span className="text-champagne-gold font-bold tracking-[0.35em]">{product.collectionLabel.replace("Collection For ", "")}</span>
                </p>

                {/* Fragrance name */}
                <Link href={`/fragrances/${product.slug}`}>
                  <h3 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer leading-tight">
                    {product.name}
                  </h3>
                </Link>

                {/* Dynamic price */}
                <p className="font-sans text-champagne-gold text-2xl lg:text-3xl font-medium tracking-wide mt-1.5 mb-1 transition-all duration-300">
                  ৳{selectedSizeObj.price.toLocaleString()}
                </p>

                {/* Inspired by */}
                <p className="text-secondary-text text-xs font-sans mb-4 italic">
                  Inspired by {product.inspiredBy}
                </p>

                {/* Size selector */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {product.sizes.map((s) => (
                    <button
                      key={s.ml}
                      onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.slug]: s.ml }))}
                      className={`px-3 py-1.5 text-xs font-sans tracking-wider border rounded-full transition-all duration-200 cursor-pointer ${
                        selectedMl === s.ml
                          ? "border-champagne-gold bg-champagne-gold text-matte-black font-medium"
                          : "border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                      }`}
                    >
                      {s.ml}ml
                    </button>
                  ))}
                </div>

                {/* View details */}
                <Link
                  href={`/fragrances/${product.slug}`}
                  className="text-secondary-text hover:text-champagne-gold text-xs tracking-[0.15em] uppercase font-sans transition-colors duration-300"
                >
                  View Details →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
