"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash, ArrowRight, Tag, CheckCircle, Minus, Plus, TestTube } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";
import { checkCoupon, computeDiscount } from "@/lib/coupon";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discountAmount = promoApplied ? computeDiscount(total, 0.3) : 0;
  const finalTotal = total - discountAmount;

  function applyPromo() {
    const result = checkCoupon(promoCode);
    if (result.valid) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try HASARA30.");
    }
  }

  function goToCheckout() {
    if (items.length === 0) return;
    onClose();
    router.push("/checkout");
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);

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
                <p className="font-serif text-champagne-white text-xl font-light tracking-wide">Your Bag</p>
                <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-0.5">
                  {totalUnits} unit{totalUnits !== 1 ? "s" : ""}
                </p>
              </div>
              <button onClick={onClose} className="text-champagne-white/40 hover:text-champagne-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Items — data-lenis-prevent stops the global Lenis smooth-scroll from
                hijacking wheel events here and scrolling the page behind the drawer */}
            <div
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-serif text-champagne-white/30 text-2xl font-light mb-3">Your cart is empty</p>
                  <p className="font-sans text-champagne-white/20 text-xs tracking-wide">Add parfums to begin your order</p>
                </div>
              ) : (
                items.map((item, i) => {
                  const isBundle = item.slug.startsWith("tester-bundle-");
                  const bundleParts = isBundle ? item.name.split("::") : null;
                  const displayName = bundleParts ? "Tester Bundle" : item.name;
                  const bundleList = bundleParts?.[1] ?? "";

                  return (
                    <div key={`${item.slug}-${item.ml}-${i}`} className={`border p-4 rounded-xl ${isBundle ? "border-champagne-gold/25 bg-champagne-gold/[0.03]" : "border-champagne-gold/10"}`}>
                      <div className="flex gap-4">
                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-stone-900 rounded-xl">
                          <Image src={item.image} alt={displayName} fill className="object-cover" sizes="64px" />
                          {isBundle && (
                            <div className="absolute inset-0 bg-matte-black/40 flex items-center justify-center">
                              <TestTube size={20} className="text-champagne-gold" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-champagne-white text-base font-light leading-snug">{displayName}</p>
                          {isBundle ? (
                            <>
                              <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-1">4×1ml Bundle</p>
                              {bundleList && (
                                <p className="font-sans text-champagne-white/30 text-[10px] tracking-wide mt-1 leading-relaxed line-clamp-2">
                                  {bundleList}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-1">{item.ml}ml</p>
                          )}
                          <p className="font-sans text-champagne-gold text-lg mt-1">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {!isBundle && item.quantity > 1 && (
                            <p className="font-sans text-champagne-white/25 text-[11px] mt-0.5">
                              ৳{item.price.toLocaleString()} each
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.slug, item.ml)}
                          className="text-champagne-white/20 hover:text-red-400 transition-colors cursor-pointer self-start mt-1 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      {/* Qty controls — regular items only */}
                      {!isBundle && (
                        <div className="flex items-center gap-0 mt-3 border border-champagne-gold/20 rounded-full w-fit overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.slug, item.ml, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 transition-colors cursor-pointer border-r border-champagne-gold/20"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-10 text-center font-sans text-champagne-white text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.ml, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 transition-colors cursor-pointer border-l border-champagne-gold/20"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      )}

                      {/* Bundle remove label */}
                      {isBundle && (
                        <button
                          onClick={() => removeItem(item.slug, item.ml)}
                          className="mt-3 flex items-center gap-1.5 text-red-400/50 hover:text-red-400 text-[10px] tracking-[0.15em] uppercase font-sans transition-colors cursor-pointer"
                        >
                          <Trash size={10} />
                          Remove bundle
                        </button>
                      )}
                    </div>
                  );
                })
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
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-champagne-gold/20 rounded-full text-champagne-white text-xs tracking-[0.15em] uppercase font-sans placeholder:text-champagne-white/20 focus:outline-none focus:border-champagne-gold/50 disabled:opacity-50"
                      />
                    </div>
                    {promoApplied ? (
                      <button
                        onClick={() => { setPromoApplied(false); setPromoCode(""); }}
                        className="px-4 py-2.5 border border-red-500/40 text-red-400 text-xs tracking-[0.15em] uppercase font-sans hover:bg-red-500/10 transition-colors cursor-pointer rounded-full"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2.5 border border-champagne-gold/40 text-champagne-gold text-xs tracking-[0.15em] uppercase font-sans hover:bg-champagne-gold/10 transition-colors cursor-pointer rounded-full"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {promoApplied && (
                    <p className="font-sans text-green-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <CheckCircle size={12} weight="fill" /> 30% discount applied!
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
                      <span>Discount (30%)</span>
                      <span>-৳{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-champagne-gold font-medium pt-2 border-t border-champagne-gold/15">
                    <span className="font-serif text-base">Total</span>
                    <span className="font-sans text-xl">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={goToCheckout}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
                >
                  Continue to Checkout
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-champagne-white/25 hover:text-champagne-white/50 text-xs tracking-wider font-sans transition-colors cursor-pointer text-center"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
