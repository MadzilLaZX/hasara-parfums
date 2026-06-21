"use client";

import Link from "next/link";
import { ArrowLeft, Heart, WhatsappLogo, Sparkle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { useWishlist } from "@/context/WishlistContext";
import type { UpcomingFragrance } from "@/data/upcoming";

const WHATSAPP_NUMBER = "8801767067130";

export default function UpcomingDetailClient({ fragrance }: { fragrance: UpcomingFragrance }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(`upcoming:${fragrance.slug}`);

  function notifyWhatsApp() {
    const msg = `Hello Hasara Parfums,\n\nI am very interested in your upcoming fragrance:\n\n✦ ${fragrance.name}\n   Inspired by ${fragrance.inspiredBy}\n   Style: ${fragrance.style}\n   Season: ${fragrance.season}\n\nPlease add me to the early notification list. I would love to be among the first to try it!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-[#080705]">
      <Navbar />

      <div className="pt-36 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/upcoming" className="inline-flex items-center gap-2 text-champagne-white/30 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors mb-12">
            <ArrowLeft size={12} /> Upcoming Releases
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Mystery visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] max-h-[75vh] bg-[#0a0908] border border-champagne-gold/20"
            >
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 via-transparent to-champagne-gold/8" />

              {/* Corner ornaments */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-champagne-gold/50" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-champagne-gold/50" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-champagne-gold/50" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-champagne-gold/50" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-serif text-champagne-gold text-[9rem] lg:text-[11rem] font-light leading-none select-none" style={{ textShadow: "0 0 80px rgba(212,175,55,0.25), 0 0 160px rgba(212,175,55,0.1)" }}>
                    ?
                  </span>
                </motion.div>
                <p className="font-sans text-champagne-gold/40 text-[10px] tracking-[0.6em] uppercase">Mystery Fragrance</p>
              </div>

              {/* "Coming Soon" badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-champagne-gold px-4 py-1.5">
                <span className="font-sans text-matte-black text-[9px] tracking-[0.4em] uppercase font-semibold">Coming Soon</span>
              </div>

              {/* Animated shimmer lines */}
              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent"
                animate={{ top: ["20%", "80%", "20%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-4">
                {fragrance.gender === "men" ? "Men's Collection" : "Women's Collection"} · Upcoming
              </p>

              <h1 className="font-serif text-champagne-white text-5xl lg:text-6xl font-light tracking-wide leading-none mb-2">
                {fragrance.name}
              </h1>

              <p className="font-sans text-champagne-white/35 text-sm tracking-wide italic mb-8">
                Inspired by {fragrance.inspiredBy}
              </p>

              <div className="w-12 h-px bg-champagne-gold mb-8" />

              {/* Description */}
              <p className="font-serif text-champagne-white/70 text-lg lg:text-xl font-light leading-relaxed italic mb-10">
                &ldquo;{fragrance.description}&rdquo;
              </p>

              {/* Accords */}
              <div className="mb-8">
                <p className="font-sans text-champagne-white/30 text-[10px] tracking-[0.4em] uppercase mb-3">Main Accords</p>
                <div className="flex gap-2 flex-wrap">
                  {fragrance.accords.map((a) => (
                    <span key={a} className="font-sans text-champagne-gold/70 text-[10px] tracking-[0.2em] uppercase border border-champagne-gold/25 px-3 py-1.5">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-champagne-gold/15">
                {[
                  { label: "Season", value: fragrance.season },
                  { label: "Occasion", value: fragrance.occasion },
                  { label: "Style", value: fragrance.style },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-sans text-champagne-white/25 text-[9px] tracking-[0.3em] uppercase mb-1">{label}</p>
                    <p className="font-sans text-champagne-white/70 text-xs leading-snug">{value}</p>
                  </div>
                ))}
              </div>

              {/* Price & availability */}
              <div className="flex items-center justify-between mb-8 p-5 border border-champagne-gold/15 bg-champagne-gold/3">
                <div>
                  <p className="font-sans text-champagne-white/25 text-[9px] tracking-[0.3em] uppercase mb-1">Price</p>
                  <p className="font-serif text-champagne-gold text-4xl font-light">৳ ???</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-champagne-white/25 text-[9px] tracking-[0.3em] uppercase mb-1">Availability</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-pulse" />
                    <p className="font-sans text-champagne-gold text-xs tracking-wide">Launching Soon</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={notifyWhatsApp}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-sm"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Notify Me on WhatsApp
                </button>

                <button
                  onClick={() => toggle(`upcoming:${fragrance.slug}`)}
                  className={`w-full flex items-center justify-center gap-3 py-4 border text-sm tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-sm ${
                    wishlisted
                      ? "border-champagne-gold bg-champagne-gold/10 text-champagne-gold"
                      : "border-champagne-gold/30 text-champagne-white/60 hover:border-champagne-gold hover:text-champagne-gold"
                  }`}
                >
                  <Heart size={16} weight={wishlisted ? "fill" : "regular"} />
                  {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              {/* Exclusivity note */}
              <div className="mt-8 flex items-start gap-3 p-4 border border-champagne-gold/10 bg-champagne-gold/3">
                <Sparkle size={14} className="text-champagne-gold/50 flex-shrink-0 mt-0.5" />
                <p className="font-sans text-champagne-white/35 text-xs leading-relaxed tracking-wide">
                  Early interest members receive first access and exclusive pre-launch pricing. Express your interest now to secure priority.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
