"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { SlidersHorizontal, X } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import WishlistButton from "@/components/ui/WishlistButton";
import { fragrances } from "@/data/products";

const VALID_COLLECTIONS = ["mens", "womens", "unisex"];
const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const DAY_NIGHT_OPTIONS = ["Day", "Night", "Day & Night"];
const ACCORDS = Array.from(new Set(fragrances.flatMap((f) => f.mainAccords))).sort();

function FragrancesPage() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const initial = collectionParam && VALID_COLLECTIONS.includes(collectionParam) ? collectionParam : "all";

  const [activeCollection, setActiveCollection] = useState(initial);
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeDayNight, setActiveDayNight] = useState("all");
  const [activeAccord, setActiveAccord] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const param = searchParams.get("collection");
    setActiveCollection(param && VALID_COLLECTIONS.includes(param) ? param : "all");
  }, [searchParams]);

  const filtered = fragrances.filter((f) => {
    if (activeCollection !== "all" && f.collection !== activeCollection) return false;
    if (activeSeason !== "all" && !f.season.includes(activeSeason)) return false;
    if (activeDayNight !== "all" && f.dayNight !== activeDayNight) return false;
    if (activeAccord !== "all" && !f.mainAccords.includes(activeAccord)) return false;
    return true;
  });

  const hasActiveFilters =
    activeCollection !== "all" || activeSeason !== "all" || activeDayNight !== "all" || activeAccord !== "all";

  function clearFilters() {
    setActiveCollection("all");
    setActiveSeason("all");
    setActiveDayNight("all");
    setActiveAccord("all");
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-matte-black pt-44 pb-16 px-6 lg:px-12">
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

      {/* Filter Bar */}
      <section className="border-b border-stone-200 px-6 lg:px-12 sticky top-[88px] bg-champagne-white/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All" },
                { id: "mens", label: "Men's" },
                { id: "womens", label: "Women's" },
                { id: "unisex", label: "Unisex" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveCollection(opt.id)}
                  className={`flex-shrink-0 px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 rounded-sm cursor-pointer ${
                    activeCollection === opt.id
                      ? "bg-champagne-gold text-matte-black"
                      : "text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300 rounded-sm cursor-pointer ${
                showFilters || hasActiveFilters
                  ? "border-champagne-gold text-champagne-gold"
                  : "border-stone-300 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
              }`}
            >
              <SlidersHorizontal size={13} />
              Filters{hasActiveFilters ? " (on)" : ""}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-stone-100 pt-4">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-secondary-text mb-3 font-sans">Season</p>
                    <div className="flex flex-wrap gap-2">
                      {["all", ...SEASONS].map((s) => (
                        <button
                          key={s}
                          onClick={() => setActiveSeason(s)}
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-sm transition-all duration-200 cursor-pointer ${
                            activeSeason === s
                              ? "bg-champagne-gold text-matte-black"
                              : "border border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                          }`}
                        >
                          {s === "all" ? "All Seasons" : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-secondary-text mb-3 font-sans">Time of Day</p>
                    <div className="flex flex-wrap gap-2">
                      {["all", ...DAY_NIGHT_OPTIONS].map((d) => (
                        <button
                          key={d}
                          onClick={() => setActiveDayNight(d)}
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-sm transition-all duration-200 cursor-pointer ${
                            activeDayNight === d
                              ? "bg-champagne-gold text-matte-black"
                              : "border border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                          }`}
                        >
                          {d === "all" ? "Any Time" : d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-secondary-text mb-3 font-sans">Main Accord</p>
                    <div className="flex flex-wrap gap-2">
                      {["all", ...ACCORDS].map((a) => (
                        <button
                          key={a}
                          onClick={() => setActiveAccord(a)}
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-sm transition-all duration-200 cursor-pointer ${
                            activeAccord === a
                              ? "bg-champagne-gold text-matte-black"
                              : "border border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                          }`}
                        >
                          {a === "all" ? "All Accords" : a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="pb-3">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 text-xs text-champagne-gold hover:text-champagne-gold/70 font-sans tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      <X size={12} /> Clear all filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-primary-text text-2xl mb-4">No fragrances match your filters</p>
              <button onClick={clearFilters} className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans hover:underline cursor-pointer">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <Link href={`/fragrances/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4 rounded-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 right-3 bg-matte-black/50 backdrop-blur-sm rounded-full p-2">
                      <WishlistButton slug={product.slug} />
                    </div>
                  </Link>
                  <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
                    {product.collectionLabel}
                  </p>
                  <Link href={`/fragrances/${product.slug}`}>
                    <h2 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-secondary-text text-xs font-sans mt-0.5 mb-2 italic">
                    Inspired by {product.inspiredBy}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.mainAccords.slice(0, 2).map((a) => (
                      <span key={a} className="px-2 py-0.5 border border-stone-200 text-secondary-text text-[10px] font-sans tracking-wider rounded-sm">
                        {a}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 border border-stone-200 text-secondary-text text-[10px] font-sans tracking-wider rounded-sm">
                      {product.dayNight}
                    </span>
                  </div>
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
          )}
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
