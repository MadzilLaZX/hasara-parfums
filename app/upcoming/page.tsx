"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, WhatsappLogo, ArrowLeft } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { upcomingFragrances, upcomingMens, upcomingWomens } from "@/data/upcoming";
import { useWishlist } from "@/context/WishlistContext";

const WHATSAPP_NUMBER = "8801767067130";

function UpcomingCard({ fragrance }: { fragrance: (typeof upcomingFragrances)[0] }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(`upcoming:${fragrance.slug}`);

  function notifyWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    const msg = `Hello Hasara Parfums,\n\nI am very interested in your upcoming fragrance:\n\n✦ ${fragrance.name}\n   Inspired by ${fragrance.inspiredBy}\n\nPlease notify me when it launches!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      {/* Mystery card — dark card on light page, same visual weight as product images */}
      <Link href={`/upcoming/${fragrance.slug}`} className="block relative aspect-[3/4] bg-[#0a0908] border border-stone-200 overflow-hidden mb-4 rounded-2xl hover:border-champagne-gold/60 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/3 via-transparent to-champagne-gold/5 group-hover:from-champagne-gold/6 group-hover:to-champagne-gold/10 transition-all duration-700" />
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Corner ornaments */}
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
      </Link>

      {/* Info — using same text styles as fragrances page */}
      <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
        {fragrance.gender === "men" ? "Men's Collection" : "Women's Collection"} · Upcoming
      </p>
      <Link href={`/upcoming/${fragrance.slug}`}>
        <h3 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer mb-0.5">{fragrance.name}</h3>
      </Link>
      <p className="text-secondary-text text-xs font-sans italic mb-3">Inspired by {fragrance.inspiredBy}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {fragrance.accords.slice(0, 2).map((a) => (
          <span key={a} className="px-2 py-0.5 border border-stone-200 text-secondary-text text-[10px] font-sans tracking-wider rounded-full">{a}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="font-sans text-secondary-text text-xs tracking-wide">
          From <span className="font-serif text-primary-text text-lg font-medium">৳ ???</span>
        </p>
        <button
          onClick={notifyWhatsApp}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-champagne-gold/10 hover:bg-champagne-gold text-champagne-gold hover:text-matte-black text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-300 cursor-pointer border border-champagne-gold/40 hover:border-champagne-gold rounded-full"
        >
          <WhatsappLogo size={11} weight="fill" />
          Notify Me
        </button>
      </div>
    </motion.div>
  );
}

export default function UpcomingPage() {
  const [tab, setTab] = useState<"all" | "men" | "women">("all");
  const shown = tab === "men" ? upcomingMens : tab === "women" ? upcomingWomens : upcomingFragrances;

  function notifyAll() {
    const names = shown.map((f) => `• ${f.name} (Inspired by ${f.inspiredBy})`).join("\n");
    const msg = `Hello Hasara Parfums,\n\nI am interested in your upcoming collection! Please notify me when these fragrances launch:\n\n${names}\n\nThank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Dark header — matches other pages */}
      <section className="bg-matte-black pt-44 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-champagne-white/40 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors mb-10">
            <ArrowLeft size={12} /> Back to Home
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">Exclusive Preview</p>
              <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide leading-none">
                Upcoming<br />
                <span className="italic text-champagne-gold/80">Releases</span>
              </h1>
              <div className="w-16 h-px bg-champagne-gold mt-8" />
            </div>
            <button
              onClick={notifyAll}
              className="flex-shrink-0 flex items-center gap-2.5 px-8 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full mb-2"
            >
              <WhatsappLogo size={16} weight="fill" />
              Be The First To Know
            </button>
          </div>
        </div>
      </section>

      {/* Filter tabs — matches fragrances page sticky bar */}
      <section className="border-b border-stone-200 px-6 lg:px-12 bg-champagne-white/95 backdrop-blur-md sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-3">
          {(["all", "men", "women"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 rounded-full cursor-pointer ${
                tab === t ? "bg-champagne-gold text-matte-black" : "text-secondary-text hover:text-primary-text"
              }`}
            >
              {t === "all" ? `All (${upcomingFragrances.length})` : t === "men" ? `Men's (${upcomingMens.length})` : `Women's (${upcomingWomens.length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Hype banner */}
      <section className="px-6 lg:px-12 py-10 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="border border-stone-200 bg-stone-50 p-6 lg:p-8 text-center rounded-2xl">
            <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-3">Be The First To Know</p>
            <p className="font-serif text-primary-text text-2xl lg:text-3xl font-light mb-2">
              Every fragrance below is arriving soon.
            </p>
            <p className="font-sans text-secondary-text text-sm tracking-wide">
              Add them to your wishlist or tap Notify Me — we&apos;ll reach out the moment they launch.
            </p>
          </div>
        </div>
      </section>

      {/* Product grid — same padding as fragrances page */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {shown.map((f) => (
              <UpcomingCard key={f.slug} fragrance={f} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
