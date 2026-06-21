"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Heart, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import { upcomingFragrances } from "@/data/upcoming";
import { useWishlist } from "@/context/WishlistContext";

const WHATSAPP_NUMBER = "8801767067130";
const FEATURED_SLUGS = [
  "golden-elixir",
  "noir-prestige",
  "black-reverie",
  "midnight-gentleman",
  "belle-noire",
  "spice-empire",
];

function MysteryCard({ fragrance }: { fragrance: (typeof upcomingFragrances)[0] }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(`upcoming:${fragrance.slug}`);

  function notifyWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    const msg = `Hello Hasara Parfums,\n\nI am very interested in your upcoming fragrance:\n\n✦ ${fragrance.name} (Inspired by ${fragrance.inspiredBy})\n\nPlease notify me when it launches!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      {/* Mystery image area */}
      <Link href={`/upcoming/${fragrance.slug}`} className="block relative aspect-[3/4] bg-[#0a0908] border border-champagne-gold/15 overflow-hidden mb-4 hover:border-champagne-gold/40 transition-all duration-500">
        {/* Animated shimmer bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/3 via-transparent to-champagne-gold/5 group-hover:from-champagne-gold/6 group-hover:to-champagne-gold/10 transition-all duration-700" />

        {/* Grid pattern overlay */}
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/3 transition-all duration-500" />

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(`upcoming:${fragrance.slug}`); }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer z-10 ${wishlisted ? "bg-champagne-gold text-matte-black" : "bg-matte-black/60 backdrop-blur-sm text-champagne-white/50 hover:text-champagne-gold"}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={13} weight={wishlisted ? "fill" : "regular"} />
        </button>

        {/* Gender badge */}
        <div className="absolute bottom-3 left-3 bg-matte-black/70 backdrop-blur-sm px-2.5 py-1">
          <span className="font-sans text-champagne-gold/60 text-[9px] tracking-[0.4em] uppercase">
            {fragrance.gender === "men" ? "Men's" : "Women's"}
          </span>
        </div>
      </Link>

      {/* Card text */}
      <div className="px-0.5">
        <Link href={`/upcoming/${fragrance.slug}`}>
          <h3 className="font-serif text-champagne-white text-xl font-light hover:text-champagne-gold transition-colors duration-300 mb-0.5">{fragrance.name}</h3>
        </Link>
        <p className="font-sans text-champagne-white/30 text-xs tracking-wide mb-3 italic">Inspired by {fragrance.inspiredBy}</p>

        <div className="flex items-center justify-between">
          <span className="font-serif text-champagne-white/25 text-lg">৳ ???</span>
          <div className="flex gap-2">
            <button
              onClick={notifyWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-champagne-gold/10 hover:bg-champagne-gold text-champagne-gold hover:text-matte-black text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-300 cursor-pointer border border-champagne-gold/30 hover:border-champagne-gold rounded-sm"
            >
              <WhatsappLogo size={11} weight="fill" />
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UpcomingSection() {
  const featured = FEATURED_SLUGS.map((slug) => upcomingFragrances.find((f) => f.slug === slug)!).filter(Boolean);

  return (
    <section className="bg-[#080705] py-24 lg:py-36 px-6 lg:px-12 overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="font-sans text-champagne-gold text-[10px] tracking-[0.6em] uppercase mb-5">Exclusive Preview</p>
          <h2 className="font-serif text-champagne-white text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none mb-6">
            Upcoming<br />
            <span className="italic text-champagne-gold/80">Releases</span>
          </h2>
          <div className="w-12 h-px bg-champagne-gold mx-auto mb-6" />
          <p className="font-sans text-champagne-white/40 text-sm tracking-wide max-w-md mx-auto leading-relaxed">
            A glimpse into what&apos;s arriving next. Each creation is crafted in secret, revealed only when ready.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-14">
          {featured.map((f) => (
            <MysteryCard key={f.slug} fragrance={f} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
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
