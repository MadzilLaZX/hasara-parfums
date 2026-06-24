"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { SlidersHorizontal, X, Heart, WhatsappLogo } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import WishlistButton from "@/components/ui/WishlistButton";
import { fragrances } from "@/data/products";
import { upcomingFragrances, upcomingMens, upcomingWomens } from "@/data/upcoming";
import { useWishlist } from "@/context/WishlistContext";

const WHATSAPP_NUMBER = "8801767067130";
const VALID_COLLECTIONS = ["mens", "womens", "unisex"];
const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const DAY_NIGHT_OPTIONS = ["Day", "Night", "Day & Night"];
const ACCORDS = Array.from(new Set(fragrances.flatMap((f) => f.mainAccords))).sort();

const COLLECTION_TABS = [
  { id: "all",      label: "All" },
  { id: "mens",     label: "For Him" },
  { id: "womens",   label: "For Her" },
  { id: "unisex",   label: "For All" },
  { id: "upcoming", label: "Upcoming" },
];

function UpcomingCard({ fragrance }: { fragrance: (typeof upcomingFragrances)[0] }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(`upcoming:${fragrance.slug}`);

  function notifyWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    const msg = `Hello Hasara Parfums,\n\nI am very interested in your upcoming parfum:\n\n✦ ${fragrance.name}\n\nPlease notify me when it launches!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] bg-[#0a0908] border border-stone-200 overflow-hidden mb-4 rounded-2xl hover:border-champagne-gold/60 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/3 via-transparent to-champagne-gold/5 group-hover:from-champagne-gold/6 group-hover:to-champagne-gold/10 transition-all duration-700" />
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-champagne-gold/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-champagne-gold/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-champagne-gold/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-champagne-gold/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="font-serif text-champagne-gold/50 group-hover:text-champagne-gold/70 transition-all duration-500 text-8xl font-light leading-none select-none">?</span>
          <span className="font-sans text-champagne-gold/30 group-hover:text-champagne-gold/50 text-[9px] tracking-[0.5em] uppercase transition-all duration-500">Coming Soon</span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); toggle(`upcoming:${fragrance.slug}`); }}
          className={`absolute top-3 right-3 rounded-full p-2 transition-all duration-300 cursor-pointer z-10 ${wishlisted ? "bg-champagne-gold text-matte-black" : "bg-matte-black/60 backdrop-blur-sm text-champagne-white/50 hover:text-champagne-gold"}`}
        >
          <Heart size={13} weight={wishlisted ? "fill" : "regular"} />
        </button>
      </div>
      <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
        {fragrance.gender === "men" ? "Collection For Him" : "Collection For Her"} · Upcoming
      </p>
      <h3 className="font-serif text-primary-text text-xl font-medium mb-3 leading-tight">{fragrance.name}</h3>
      <button
        onClick={notifyWhatsApp}
        className="self-start flex items-center gap-1.5 px-3 py-1.5 bg-champagne-gold/10 hover:bg-champagne-gold text-champagne-gold hover:text-matte-black text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-300 cursor-pointer border border-champagne-gold/40 hover:border-champagne-gold rounded-full"
      >
        <WhatsappLogo size={11} weight="fill" />
        Notify Me
      </button>
    </div>
  );
}

function FragrancesPage() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const initial = collectionParam && [...VALID_COLLECTIONS, "upcoming"].includes(collectionParam) ? collectionParam : "all";

  const [activeCollection, setActiveCollection] = useState(initial);
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeDayNight, setActiveDayNight] = useState("all");
  const [activeAccord, setActiveAccord] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const shouldReduce = useReducedMotion();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    fragrances.forEach((f) => { d[f.slug] = f.sizes[1]?.ml ?? f.sizes[0].ml; });
    return d;
  });

  useEffect(() => {
    const param = searchParams.get("collection");
    setActiveCollection(param && [...VALID_COLLECTIONS, "upcoming"].includes(param) ? param : "all");
  }, [searchParams]);

  const isUpcoming = activeCollection === "upcoming";

  const upcomingFiltered = isUpcoming
    ? upcomingFragrances
    : [];

  const filtered = isUpcoming ? [] : fragrances.filter((f) => {
    if (activeCollection !== "all" && f.collection !== activeCollection) return false;
    if (activeSeason !== "all" && !f.season.includes(activeSeason)) return false;
    if (activeDayNight !== "all" && f.dayNight !== activeDayNight) return false;
    if (activeAccord !== "all" && !f.mainAccords.includes(activeAccord)) return false;
    return true;
  });

  const hasActiveFilters =
    activeCollection !== "all" && activeCollection !== "upcoming" || activeSeason !== "all" || activeDayNight !== "all" || activeAccord !== "all";

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
              Our Parfums
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
              {COLLECTION_TABS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveCollection(opt.id)}
                  className={`flex-shrink-0 px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 rounded-full cursor-pointer ${
                    activeCollection === opt.id
                      ? "bg-champagne-gold text-matte-black"
                      : "text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {!isUpcoming && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300 rounded-full cursor-pointer ${
                  showFilters || hasActiveFilters
                    ? "border-champagne-gold text-champagne-gold"
                    : "border-stone-300 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                }`}
              >
                <SlidersHorizontal size={13} />
                Filters{hasActiveFilters ? " (on)" : ""}
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && !isUpcoming && (
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
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-full transition-all duration-200 cursor-pointer ${
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
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-full transition-all duration-200 cursor-pointer ${
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
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase font-sans rounded-full transition-all duration-200 cursor-pointer ${
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
          {isUpcoming ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {upcomingFiltered.map((f, i) => (
                <motion.div
                  key={f.slug}
                  initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <UpcomingCard fragrance={f} />
                </motion.div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-primary-text text-2xl mb-4">No parfums match your filters</p>
              <button onClick={clearFilters} className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans hover:underline cursor-pointer">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {filtered.map((product, i) => {
                const selectedMl = selectedSizes[product.slug];
                const selectedSizeObj = product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];
                return (
                  <motion.div
                    key={product.id}
                    initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <Link href={`/fragrances/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4 rounded-2xl">
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

                    <p className="text-xs tracking-[0.2em] uppercase font-sans mb-1">
                      <span className="text-champagne-gold/40">Collection For </span>
                      <span className="text-champagne-gold font-bold tracking-[0.35em]">{product.collectionLabel.replace("Collection For ", "")}</span>
                    </p>

                    <Link href={`/fragrances/${product.slug}`}>
                      <h2 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer leading-tight">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="font-sans text-champagne-gold text-2xl lg:text-3xl font-medium tracking-wide mt-1.5 mb-1 transition-all duration-300">
                      ৳{selectedSizeObj.price.toLocaleString()}
                    </p>

                    <p className="text-secondary-text text-xs font-sans mb-4 italic">
                      Inspired by {product.inspiredBy}
                    </p>

                    <div className="flex gap-2 flex-wrap mb-4">
                      {product.sizes.map((s) => (
                        <button
                          key={s.ml}
                          onClick={(e) => { e.preventDefault(); setSelectedSizes((prev) => ({ ...prev, [product.slug]: s.ml })); }}
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
