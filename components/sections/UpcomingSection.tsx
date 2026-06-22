"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, WhatsappLogo, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { upcomingFragrances } from "@/data/upcoming";
import { useWishlist } from "@/context/WishlistContext";

const WHATSAPP_NUMBER = "8801767067130";

function MysteryCard({ fragrance }: { fragrance: (typeof upcomingFragrances)[0] }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(`upcoming:${fragrance.slug}`);

  function notifyWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    const msg = `Hello Hasara Parfums,\n\nI am very interested in your upcoming fragrance:\n\n✦ ${fragrance.name}\n\nPlease notify me when it launches!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div className="group flex flex-col">
      {/* Mystery image area */}
      <div className="relative aspect-[3/4] bg-[#0a0908] border border-champagne-gold/15 overflow-hidden mb-4 rounded-2xl hover:border-champagne-gold/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/3 via-transparent to-champagne-gold/5 group-hover:from-champagne-gold/6 group-hover:to-champagne-gold/10 transition-all duration-700" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-champagne-gold/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-champagne-gold/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-champagne-gold/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-champagne-gold/40" />

        {/* Central mystery mark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="font-serif text-champagne-gold/50 group-hover:text-champagne-gold/70 transition-all duration-500 text-8xl font-light leading-none select-none" style={{ textShadow: "0 0 40px rgba(212,175,55,0.2)" }}>
            ?
          </span>
          <span className="font-sans text-champagne-gold/30 group-hover:text-champagne-gold/50 text-[9px] tracking-[0.5em] uppercase transition-all duration-500">
            Coming Soon
          </span>
        </div>

        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/3 transition-all duration-500" />

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(`upcoming:${fragrance.slug}`); }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer z-10 ${wishlisted ? "bg-champagne-gold text-matte-black" : "bg-matte-black/60 backdrop-blur-sm text-champagne-white/50 hover:text-champagne-gold"}`}
        >
          <Heart size={13} weight={wishlisted ? "fill" : "regular"} />
        </button>

        {/* Gender badge */}
        <div className="absolute bottom-3 left-3 bg-matte-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <span className="font-sans text-champagne-gold/60 text-[9px] tracking-[0.4em] uppercase">
            {fragrance.gender === "men" ? "Men's" : "Women's"}
          </span>
        </div>
      </div>

      {/* Card text */}
      <div className="px-0.5">
        <h3 className="font-serif text-champagne-white text-xl font-light mb-3 leading-tight">{fragrance.name}</h3>

        <button
          onClick={notifyWhatsApp}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-champagne-gold/10 hover:bg-champagne-gold text-champagne-gold hover:text-matte-black text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-300 cursor-pointer border border-champagne-gold/30 hover:border-champagne-gold rounded-full"
        >
          <WhatsappLogo size={11} weight="fill" />
          Notify Me
        </button>
      </div>
    </div>
  );
}

export default function UpcomingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const cardWidth = 224 + 16;
    scrollRef.current.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  }

  return (
    <section className="bg-[#080705] py-24 lg:py-36 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative">

        {/* Animated divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 px-6 lg:px-12 mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ transformOrigin: "right" }}
            className="flex-1 h-px bg-gradient-to-l from-champagne-gold/55 via-champagne-gold/20 to-transparent"
          />
          <p className="font-sans text-champagne-gold text-[10px] tracking-[0.6em] uppercase flex-shrink-0 whitespace-nowrap">
            Exclusive Preview
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="flex-1 h-px bg-gradient-to-r from-champagne-gold/55 via-champagne-gold/20 to-transparent"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 lg:px-12 mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-champagne-white text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none mb-6">
            Upcoming<br />
            <span className="italic text-champagne-gold/80">Releases</span>
          </h2>
          <p className="font-sans text-champagne-white/40 text-sm tracking-wide max-w-md mx-auto leading-relaxed">
            A glimpse into what&apos;s arriving next. Each creation is crafted in secret, revealed only when ready.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-2 lg:left-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-matte-black/80 backdrop-blur-sm border border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold hover:text-matte-black transition-all duration-300 cursor-pointer shadow-xl ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll left"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-2 lg:right-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-matte-black/80 backdrop-blur-sm border border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold hover:text-matte-black transition-all duration-300 cursor-pointer shadow-xl ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll right"
          >
            <CaretRight size={16} weight="bold" />
          </button>

          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-16 bg-gradient-to-r from-[#080705] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-16 bg-gradient-to-l from-[#080705] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-6 px-6 lg:px-12 no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {upcomingFragrances.map((f) => (
              <div
                key={f.slug}
                className="flex-none w-48 sm:w-52 lg:w-56"
                style={{ scrollSnapAlign: "start" }}
              >
                <MysteryCard fragrance={f} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-sans text-champagne-white/20 text-[10px] tracking-[0.3em] uppercase mt-2 mb-10">
          Swipe to explore all {upcomingFragrances.length} upcoming releases
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-6 lg:px-12"
        >
          <Link
            href="/upcoming"
            className="inline-flex items-center gap-3 px-10 py-4 border border-champagne-gold/40 text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-xs tracking-[0.3em] uppercase font-sans transition-all duration-500 rounded-full group"
          >
            View All {upcomingFragrances.length} Upcoming Fragrances
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="font-sans text-champagne-white/20 text-xs mt-4 tracking-wide">Be the first to know when they launch</p>
        </motion.div>
      </div>
    </section>
  );
}
