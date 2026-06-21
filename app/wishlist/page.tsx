"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash, WhatsappLogo, ArrowLeft } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { useWishlist } from "@/context/WishlistContext";
import { fragrances } from "@/data/products";

const WHATSAPP_NUMBER = "8801767067130";

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const wishlistProducts = fragrances.filter((f) => items.includes(f.slug));

  // Track selected size per product
  const [sizes, setSizes] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    fragrances.forEach((f) => { defaults[f.slug] = f.sizes[1]?.ml ?? f.sizes[0].ml; });
    return defaults;
  });

  function sendWishlist() {
    if (wishlistProducts.length === 0) return;
    const lines = wishlistProducts.map((p) => {
      const ml = sizes[p.slug];
      const sizeObj = p.sizes.find((s) => s.ml === ml) ?? p.sizes[0];
      return `• ${p.name} — ${sizeObj.ml}ml — ৳${sizeObj.price.toLocaleString()}`;
    });
    const msg = `Hello Hasara Parfums,\n\nHere is my wishlist:\n\n${lines.join("\n")}\n\nI would love to know more about these fragrances and place an order. Please assist me!\n\nThank you.`;
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
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">Your Saved Scents</p>
              <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl font-light tracking-wide leading-none">
                Wishlist
              </h1>
              <div className="w-16 h-px bg-champagne-gold mt-8" />
            </div>
            {wishlistProducts.length > 0 && (
              <button
                onClick={sendWishlist}
                className="flex-shrink-0 flex items-center gap-2.5 px-7 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full mb-2"
              >
                <WhatsappLogo size={16} weight="fill" />
                Send Wishlist to WhatsApp
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-champagne-white">
        <div className="max-w-7xl mx-auto">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-32">
              <Heart size={48} className="text-stone-200 mx-auto mb-6" />
              <p className="font-serif text-primary-text text-3xl font-light mb-4">Your wishlist is empty</p>
              <p className="font-sans text-secondary-text text-sm mb-8">Browse our collection and tap the heart icon to save your favourites.</p>
              <Link href="/fragrances" className="inline-flex items-center gap-2 px-8 py-4 bg-champagne-gold text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-champagne-gold/90 transition-colors rounded-full">
                Browse Fragrances
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistProducts.map((product) => {
                  const selectedMl = sizes[product.slug];
                  const selectedSizeObj = product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];
                  return (
                    <div key={product.slug} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4 rounded-sm">
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

                      {/* Size selector */}
                      <div className="flex gap-2 flex-wrap mb-3">
                        {product.sizes.map((s) => (
                          <button
                            key={s.ml}
                            onClick={() => setSizes((prev) => ({ ...prev, [product.slug]: s.ml }))}
                            className={`px-3 py-1.5 text-xs font-sans tracking-wider border rounded-sm transition-all duration-200 cursor-pointer ${
                              selectedMl === s.ml
                                ? "border-champagne-gold bg-champagne-gold text-matte-black font-medium"
                                : "border-stone-200 text-secondary-text hover:border-champagne-gold hover:text-champagne-gold"
                            }`}
                          >
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

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <button
                  onClick={sendWishlist}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Send Wishlist to WhatsApp
                </button>
                <p className="font-sans text-secondary-text text-xs mt-4 tracking-wide">
                  Your selected sizes will be included in the message
                </p>
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
