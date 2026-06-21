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
      {/* Mystery card */}
      <Link href={`/upcoming/${fragrance.slug}`} className="block relative aspect-[3/4] bg-[#0a0908] border border-champagne-gold/15 overflow-hidden mb-4 hover:border-champagne-gold/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/3 via-transparent to-champagne-gold/5 group-hover:from-champagne-gold/6 group-hover:to-champagne-gold/10 transition-all duration-700" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-champagne-gold/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-champagne-gold/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-champagne-gold/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-champagne-gold/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="font-serif text-champagne-gold/50 group-hover:text-champagne-gold/70 transition-all duration-500 text-8xl font-light leading-none select-none">?</span>
          <span className="font-sans text-champagne-gold/30 group-hover:text-champagne-gold/50 text-[9px] tracking-[0.5em] uppercase transition-all duration-500">Coming Soon</span>
        </div>

        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/3 transition-all duration-500" />

        <button
          onClick={(e) => { e.preventDefault(); toggle(`upcoming:${fragrance.slug}`); }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer z-10 ${wishlisted ? "bg-champagne-gold text-matte-black" : "bg-matte-black/60 backdrop-blur-sm text-champagne-white/50 hover:text-champagne-gold"}`}
        >
          <Heart size={13} weight={wishlisted ? "fill" : "regular"} />
        </button>
      </Link>

      {/* Info */}
      <Link href={`/upcoming/${fragrance.slug}`}>
        <h3 className="font-serif text-champagne-white text-xl font-light hover:text-champagne-gold transition-colors duration-300 mb-0.5">{fragrance.name}</h3>
      </Link>
      <p className="font-sans text-champagne-white/30 text-xs tracking-wide mb-3 italic">Inspired by {fragrance.inspiredBy}</p>

      <div className="flex items-center gap-1 mb-1">
        {fragrance.accords.slice(0, 2).map((a) => (
          <span key={a} className="font-sans text-champagne-gold/40 text-[9px] tracking-[0.2em] uppercase border border-champagne-gold/15 px-1.5 py-0.5">{a}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="font-serif text-champagne-white/25 text-lg">৳ ???</span>
        <button
          onClick={notifyWhatsApp}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-champagne-gold/10 hover:bg-champagne-gold text-champagne-gold hover:text-matte-black text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-300 cursor-pointer border border-champagne-gold/30 hover:border-champagne-gold rounded-sm"
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
    <main className="overflow-x-hidden w-full max-w-full bg-[#080705]">
      <Navbar />

      {/* Header */}
      <section className="pt-44 pb-20 px-6 lg:px-12 relative">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="max-w-7xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-champagne-white/30 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors mb-12">
            <ArrowLeft size={12} /> Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-sans text-champagne-gold text-[10px] tracking-[0.6em] uppercase mb-5">Exclusive Preview</p>
              <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide leading-none mb-4">
                Upcoming<br />
                <span className="italic text-champagne-gold/80">Releases</span>
              </h1>
              <div className="w-12 h-px bg-champagne-gold mt-6 mb-5" />
              <p className="font-sans text-champagne-white/40 text-sm leading-relaxed max-w-md">
                Each creation below is crafted in secret and revealed only when it is ready. Add your favourites to wishlist or express interest via WhatsApp to be among the first to know.
              </p>
            </div>

            <button
              onClick={notifyAll}
              className="flex-shrink-0 flex items-center gap-2.5 px-8 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
            >
              <WhatsappLogo size={16} weight="fill" />
              Be The First To Know
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 lg:px-12 pb-6 border-b border-champagne-gold/10">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          {(["all", "men", "women"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-sans text-xs tracking-[0.3em] uppercase pb-3 border-b-2 transition-all duration-300 cursor-pointer ${tab === t ? "border-champagne-gold text-champagne-gold" : "border-transparent text-champagne-white/35 hover:text-champagne-white/60"}`}
            >
              {t === "all" ? `All (${upcomingFragrances.length})` : t === "men" ? `Men's (${upcomingMens.length})` : `Women's (${upcomingWomens.length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Hype banner */}
      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="border border-champagne-gold/20 bg-champagne-gold/3 p-6 lg:p-8 text-center">
            <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-3">Be The First To Know</p>
            <p className="font-serif text-champagne-white text-2xl lg:text-3xl font-light mb-3">
              Every fragrance below is arriving soon.
            </p>
            <p className="font-sans text-champagne-white/40 text-sm tracking-wide">
              Add them to your wishlist or tap Notify Me to send us a WhatsApp message — we&apos;ll reach out the moment they launch.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
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
