"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { fragrances, collections } from "@/data/products";

const VALID_COLLECTIONS = collections.map((c) => c.id);

const filterOptions = [
  { id: "all", label: "All" },
  ...collections.map((c) => ({ id: c.id, label: c.label })),
];

function FragrancesPage() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const initial = collectionParam && VALID_COLLECTIONS.includes(collectionParam) ? collectionParam : "all";
  const [activeFilter, setActiveFilter] = useState(initial);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const param = searchParams.get("collection");
    setActiveFilter(param && VALID_COLLECTIONS.includes(param) ? param : "all");
  }, [searchParams]);

  const filtered =
    activeFilter === "all"
      ? fragrances
      : fragrances.filter((f) => f.collection === activeFilter);

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-matte-black pt-40 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">
              Hasara Parfums
            </p>
            <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide leading-none">
              Our Fragrances
            </h1>
            <div className="w-16 h-px bg-champagne-gold mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-stone-200 px-6 lg:px-12 sticky top-20 bg-champagne-white/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-4">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`flex-shrink-0 px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 cursor-pointer ${
                  activeFilter === opt.id
                    ? "bg-champagne-gold text-matte-black"
                    : "text-secondary-text hover:text-primary-text"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <Link href={`/fragrances/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-900 mb-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </Link>
                <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
                  {product.collectionLabel}
                </p>
                <Link href={`/fragrances/${product.slug}`}>
                  <h2 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer">
                    {product.name}
                  </h2>
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
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

export default function FragrancesPageWrapper() {
  return (
    <Suspense>
      <FragrancesPage />
    </Suspense>
  );
}
