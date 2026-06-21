"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Trash, WhatsappLogo, Tag, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "8801767067130";
const VALID_CODE = "HASARA10";
const DISCOUNT = 0.1;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, clearCart, total } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discountAmount = promoApplied ? Math.round(total * DISCOUNT) : 0;
  const finalTotal = total - discountAmount;

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === VALID_CODE) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try HASARA10.");
    }
  }

  function checkout() {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.name} — ${i.ml}ml — ৳${i.price.toLocaleString()}`).join("\n");
    let msg = `Hello Hasara Parfums,\n\nI would like to place an order:\n\n${lines}\n\nSubtotal: ৳${total.toLocaleString()}`;
    if (promoApplied) {
      msg += `\nPromo Code: ${VALID_CODE} (10% OFF)\nDiscount: -৳${discountAmount.toLocaleString()}\nTotal: ৳${finalTotal.toLocaleString()}`;
    } else {
      msg += `\nTotal: ৳${total.toLocaleString()}`;
    }
    msg += `\n\nPlease confirm my order. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-matte-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[90] bg-[#0f0f0f] border-l border-champagne-gold/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-champagne-gold/15">
              <div>
                <p className="font-serif text-champagne-white text-xl font-light tracking-wide">Your Cart</p>
                <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={onClose} className="text-champagne-white/40 hover:text-champagne-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-serif text-champagne-white/30 text-2xl font-light mb-3">Your cart is empty</p>
                  <p className="font-sans text-champagne-white/20 text-xs tracking-wide">Add fragrances to begin your order</p>
                </div>
              ) : (
                items.map((item, i) => (
                  <div key={`${item.slug}-${item.ml}-${i}`} className="flex gap-4 border border-champagne-gold/10 p-4">
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-stone-900">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-champagne-white text-base font-light leading-snug">{item.name}</p>
                      <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-1">{item.ml}ml</p>
                      <p className="font-serif text-champagne-gold text-lg mt-2">৳{item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug, item.ml)}
                      className="text-champagne-white/25 hover:text-red-400 transition-colors cursor-pointer self-start mt-1"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-champagne-gold/15 space-y-4">
                {/* Promo code */}
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-champagne-gold/40" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                        placeholder="Promo code"
                        disabled={promoApplied}
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-champagne-gold/20 text-champagne-white text-xs tracking-[0.15em] uppercase font-sans placeholder:text-champagne-white/20 focus:outline-none focus:border-champagne-gold/50 disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied}
                      className="px-4 py-2.5 border border-champagne-gold/40 text-champagne-gold text-xs tracking-[0.15em] uppercase font-sans hover:bg-champagne-gold/10 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="font-sans text-green-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <CheckCircle size={12} weight="fill" /> 10% discount applied!
                    </p>
                  )}
                  {promoError && <p className="font-sans text-red-400 text-xs mt-1.5">{promoError}</p>}
                </div>

                {/* Totals */}
                <div className="space-y-1.5 text-sm font-sans">
                  <div className="flex justify-between text-champagne-white/50">
                    <span>Subtotal</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount (10%)</span>
                      <span>-৳{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-champagne-gold font-medium pt-2 border-t border-champagne-gold/15">
                    <span className="font-serif text-base">Total</span>
                    <span className="font-serif text-xl">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={checkout}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  Order via WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-champagne-white/25 hover:text-champagne-white/50 text-xs tracking-wider font-sans transition-colors cursor-pointer text-center"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
