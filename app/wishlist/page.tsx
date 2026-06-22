"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash, WhatsappLogo, ArrowLeft, Question } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { useWishlist } from "@/context/WishlistContext";
import { fragrances } from "@/data/products";
import { upcomingFragrances } from "@/data/upcoming";

const WHATSAPP_NUMBER = "8801767067130";

export default function WishlistPage() {
  const { items, toggle, clearAll } = useWishlist();

  // Regular fragrances in wishlist (slugs without prefix)
  const regularSlugs = items.filter((s) => !s.startsWith("upcoming:"));
  const upcomingSlugs = items.filter((s) => s.startsWith("upcoming:")).map((s) => s.replace("upcoming:", ""));

  const wishlistProducts = fragrances.filter((f) => regularSlugs.includes(f.slug));
  const wishlistUpcoming = upcomingFragrances.filter((f) => upcomingSlugs.includes(f.slug));

  const total = wishlistProducts.length + wishlistUpcoming.length;

  const [sizes, setSizes] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    fragrances.forEach((f) => { defaults[f.slug] = f.sizes[1]?.ml ?? f.sizes[0].ml; });
    return defaults;
  });

  function sendWishlist() {
    if (total === 0) return;
    const regularLines = wishlistProducts.map((p) => {
      const ml = sizes[p.slug];
      const sizeObj = p.sizes.find((s) => s.ml === ml) ?? p.sizes[0];
      return `• ${p.name} — ${sizeObj.ml}ml — ৳${sizeObj.price.toLocaleString()}`;
    });
    const upcomingLines = wishlistUpcoming.map((f) => `• ${f.name} (Upcoming — Inspired by ${f.inspiredBy})`);
    const allLines = [...regularLines, ...upcomingLines].join("\n");
    const msg = `Hello Hasara Parfums,\n\nHere is my wishlist:\n\n${allLines}\n\nI would love to know more about these fragrances and place an order. Please assist me!\n\nThank you.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Header */}
      <section className="bg-matte-black pt-44 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/fragrances" className="inline-flex items-center gap-2 text-champagne-white/40 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors mb-8">
            <ArrowLeft size={12} /> Back to Fragrances
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">Your Saved Scents</p>
              <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl font-light tracking-wide leading-none">
                Wishlist
              </h1>
              <div className="w-16 h-px bg-champagne-gold mt-8" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {total > 0 && (
                <>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-5 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 cursor-pointer rounded-full"
                  >
                    <Trash size={13} />
                    Clear Wishlist
                  </button>
                  <button
                    onClick={sendWishlist}
                    className="flex items-center gap-2.5 px-7 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    Send Wishlist to WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-champagne-white">
        <div className="max-w-7xl mx-auto">
          {total === 0 ? (
            <div className="text-center py-32">
              <Heart size={48} className="text-stone-200 mx-auto mb-6" />
              <p className="font-serif text-primary-text text-3xl font-light mb-4">Your wishlist is empty</p>
              <p className="font-sans text-secondary-text text-sm mb-8">Browse our collection and tap the heart icon to save your favourites.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fragrances" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-champagne-gold text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-champagne-gold/90 transition-colors rounded-full">
                  Browse Fragrances
                </Link>
                <Link href="/upcoming" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-300 text-secondary-text text-xs tracking-[0.25em] uppercase font-sans hover:border-champagne-gold hover:text-champagne-gold transition-colors rounded-full">
                  View Upcoming
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Regular fragrances */}
              {wishlistProducts.length > 0 && (
                <div className="mb-12">
                  {wishlistUpcoming.length > 0 && (
                    <p className="font-sans text-champagne-gold text-[10px] tracking-[0.4em] uppercase mb-6">Available Now</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistProducts.map((product) => {
                      const selectedMl = sizes[product.slug];
                      const selectedSizeObj = product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];
                      return (
                        <div key={product.slug} className="group">
                          <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4 rounded-2xl">
                            <Link href={`/fragrances/${product.slug}`}>
                              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                            </Link>
                            <button onClick={() => toggle(product.slug)} className="absolute top-3 right-3 bg-matte-black/50 backdrop-blur-sm rounded-full p-2 text-red-400 hover:text-red-300 transition-colors cursor-pointer" aria-label="Remove from wishlist">
                              <Trash size={15} />
                            </button>
                          </div>
                          <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">{product.collectionLabel}</p>
                          <Link href={`/fragrances/${product.slug}`}>
                            <h3 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer mb-1">{product.name}</h3>
                          </Link>
                          <p className="text-secondary-text text-xs font-sans italic mb-3">Inspired by {product.inspiredBy}</p>
                          <div className="flex gap-2 flex-wrap mb-3">
                            {product.sizes.map((s) => (
                              <button key={s.ml} onClick={() => setSizes((prev) => ({ ...prev, [product.slug]: s.ml }))}
                                className={`px-3 py-1.5 text-xs font-sans tracking-wider border rounded-full transition-all duration-200 cursor-pointer ${selectedMl === s.ml ? "border-champagne-gold bg-champagne-gold text-matte-black font-medium" : "border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"}`}>
                                {s.ml}ml
                              </button>
                            ))}
                          </div>
                          <p className="font-sans text-secondary-text text-xs tracking-wide">
                            <span className="font-serif text-primary-text text-lg font-medium">৳{selectedSizeObj.price.toLocaleString()}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Upcoming fragrances */}
              {wishlistUpcoming.length > 0 && (
                <div className="mb-12">
                  {wishlistProducts.length > 0 && (
                    <p className="font-sans text-champagne-gold text-[10px] tracking-[0.4em] uppercase mb-6">Upcoming Releases</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistUpcoming.map((fragrance) => (
                      <div key={fragrance.slug} className="group">
                        <Link href={`/upcoming/${fragrance.slug}`} className="block relative aspect-[3/4] bg-[#0a0908] border border-champagne-gold/20 overflow-hidden mb-4 rounded-2xl hover:border-champagne-gold/40 transition-all duration-500">
                          <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-champagne-gold/40" />
                          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-champagne-gold/40" />
                          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-champagne-gold/40" />
                          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-champagne-gold/40" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <Question size={64} className="text-champagne-gold/40" />
                            <span className="font-sans text-champagne-gold/30 text-[9px] tracking-[0.4em] uppercase">Coming Soon</span>
                          </div>
                          <button onClick={(e) => { e.preventDefault(); toggle(`upcoming:${fragrance.slug}`); }} className="absolute top-3 right-3 bg-champagne-gold rounded-full p-2 text-matte-black transition-colors cursor-pointer z-10" aria-label="Remove from wishlist">
                            <Trash size={13} />
                          </button>
                        </Link>
                        <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">Upcoming · {fragrance.gender === "men" ? "Men's" : "Women's"}</p>
                        <Link href={`/upcoming/${fragrance.slug}`}>
                          <h3 className="font-serif text-primary-text text-xl font-medium hover:text-champagne-gold transition-colors duration-300 cursor-pointer mb-1">{fragrance.name}</h3>
                        </Link>
                        <p className="text-secondary-text text-xs font-sans italic mb-3">Inspired by {fragrance.inspiredBy}</p>
                        <p className="font-serif text-secondary-text text-lg font-light">৳ ???</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <button onClick={sendWishlist} className="inline-flex items-center gap-3 px-10 py-5 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full">
                  <WhatsappLogo size={20} weight="fill" />
                  Send Wishlist to WhatsApp
                </button>
                <p className="font-sans text-secondary-text text-xs mt-4 tracking-wide">Your selected sizes will be included in the message</p>
                <button onClick={clearAll} className="mt-4 text-red-400/60 hover:text-red-400 text-xs tracking-wider font-sans uppercase transition-colors cursor-pointer">
                  Clear Wishlist
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
