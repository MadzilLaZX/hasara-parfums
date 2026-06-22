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
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Dark header + product area — matches fragrances/[slug] pattern */}
      <div className="bg-matte-black pt-28 pb-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/upcoming" className="inline-flex items-center gap-2 text-champagne-white/50 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors">
            <ArrowLeft size={12} /> Upcoming Releases
          </Link>
        </div>
      </div>

      <section className="bg-matte-black pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Mystery visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] max-h-[75vh] bg-[#0a0908] border border-champagne-gold/20 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 via-transparent to-champagne-gold/8" />

              {/* Corner ornaments */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-champagne-gold/50" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-champagne-gold/50" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-champagne-gold/50" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-champagne-gold/50" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="font-serif text-champagne-gold text-[9rem] lg:text-[11rem] font-light leading-none select-none" style={{ textShadow: "0 0 80px rgba(212,175,55,0.25)" }}>
                    ?
                  </span>
                </motion.div>
                <p className="font-sans text-champagne-gold/40 text-[10px] tracking-[0.6em] uppercase">Mystery Fragrance</p>
              </div>

              {/* Coming soon badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-champagne-gold px-4 py-1.5 rounded-full">
                <span className="font-sans text-matte-black text-[9px] tracking-[0.4em] uppercase font-semibold">Coming Soon</span>
              </div>

              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent"
                animate={{ top: ["20%", "80%", "20%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Details panel — matches fragrances/[slug] right column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:pt-8"
            >
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-2">
                {fragrance.gender === "men" ? "Men's Collection" : "Women's Collection"} · Upcoming
              </p>

              <h1 className="font-serif text-champagne-white text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-2">
                {fragrance.name}
              </h1>
              <p className="font-sans text-champagne-white/40 text-xs tracking-wider italic mb-8">
                Inspired by {fragrance.inspiredBy}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-champagne-gold/20">
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Season</p>
                  <p className="text-champagne-white text-sm font-sans">{fragrance.season}</p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Occasion</p>
                  <p className="text-champagne-white text-sm font-sans">{fragrance.occasion}</p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Style</p>
                  <p className="text-champagne-white text-sm font-sans">{fragrance.style}</p>
                </div>
              </div>

              {/* Accords */}
              <div className="mb-8 pb-8 border-b border-champagne-gold/20">
                <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">Main Accords</p>
                <div className="flex flex-wrap gap-2">
                  {fragrance.accords.map((a) => (
                    <span key={a} className="px-3 py-1.5 border border-champagne-gold/30 text-champagne-white/70 text-xs font-sans tracking-wide rounded-full">{a}</span>
                  ))}
                </div>
              </div>

              {/* Price + availability */}
              <div className="mb-8 pb-8 border-b border-champagne-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Price</p>
                    <p className="font-serif text-champagne-gold text-4xl font-light">৳ ???</p>
                  </div>
                  <div className="text-right">
                    <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Availability</p>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-pulse" />
                      <p className="font-sans text-champagne-gold text-sm tracking-wide">Launching Soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-serif text-champagne-white/70 text-lg font-light leading-relaxed italic mb-8">
                &ldquo;{fragrance.description}&rdquo;
              </p>

              {/* CTAs */}
              <button
                onClick={notifyWhatsApp}
                className="flex items-center justify-center gap-3 w-full py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-xl mb-3"
              >
                <WhatsappLogo size={18} weight="fill" />
                Notify Me on WhatsApp
              </button>

              <button
                onClick={() => toggle(`upcoming:${fragrance.slug}`)}
                className={`flex items-center justify-center gap-3 w-full py-4 border text-sm tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-xl ${
                  wishlisted
                    ? "border-champagne-gold bg-champagne-gold/10 text-champagne-gold"
                    : "border-champagne-gold/30 text-champagne-white/60 hover:border-champagne-gold hover:text-champagne-gold"
                }`}
              >
                <Heart size={16} weight={wishlisted ? "fill" : "regular"} />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              {/* Note */}
              <div className="mt-6 flex items-start gap-3 p-4 border border-champagne-gold/15 rounded-xl">
                <Sparkle size={13} className="text-champagne-gold/50 flex-shrink-0 mt-0.5" />
                <p className="font-sans text-champagne-white/35 text-xs leading-relaxed tracking-wide">
                  Early interest members receive first access and exclusive pre-launch pricing. Express your interest now to secure priority.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Light section below — matches fragrances/[slug] after product area */}
      <section className="bg-champagne-white py-16 px-6 lg:px-12 border-t border-stone-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-3">Launching Soon</p>
          <p className="font-serif text-primary-text text-3xl lg:text-4xl font-light mb-4">
            Be among the first to experience {fragrance.name}
          </p>
          <p className="font-sans text-secondary-text text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Express your interest and we&apos;ll personally notify you when this fragrance is ready to launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={notifyWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
            >
              <WhatsappLogo size={16} weight="fill" />
              Notify Me on WhatsApp
            </button>
            <Link
              href="/upcoming"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-300 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold text-xs tracking-[0.25em] uppercase font-sans transition-all duration-300 rounded-full"
            >
              View All Upcoming
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
