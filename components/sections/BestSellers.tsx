"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fragrances } from "@/data/products";
import { ArrowRight } from "@phosphor-icons/react";

export default function BestSellers() {
  const shouldReduce = useReducedMotion();
  const bestsellers = fragrances.filter((f) => f.bestseller).slice(0, 4);

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
            View All Fragrances
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={shouldReduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              {/* Image */}
              <Link href={`/fragrances/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-900 mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-matte-black/0 group-hover:bg-matte-black/10 transition-colors duration-500" />
              </Link>

              {/* Info */}
              <div>
                <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
                  {product.collectionLabel}
                </p>
                <Link href={`/fragrances/${product.slug}`}>
                  <h3 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-secondary-text text-sm font-sans mt-1 mb-3 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-secondary-text text-xs tracking-wide">
                    From{" "}
                    <span className="font-serif text-primary-text text-lg font-medium">
                      ৳{product.sizes[0].price.toLocaleString()}
                    </span>
                  </p>
                  <Link
                    href={`/fragrances/${product.slug}`}
                    className="text-secondary-text hover:text-champagne-gold text-xs tracking-[0.15em] uppercase font-sans transition-colors duration-300"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
