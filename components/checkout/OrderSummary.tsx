"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash, Minus, Plus, Tag, CheckCircle, TestTube } from "@phosphor-icons/react";
import { useCart } from "@/context/CartContext";
import { checkCoupon, computeDiscount, type CouponResult } from "@/lib/coupon";

export interface OrderTotals {
  subtotal: number;
  discount: number;
  coupon: { code: string; discountRate: number } | null;
  total: number;
}

interface Props {
  onTotalsChange: (totals: OrderTotals) => void;
}

export default function OrderSummary({ onTotalsChange }: Props) {
  const { items, removeItem, updateQuantity, total: subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState<CouponResult | null>(null);
  const [promoError, setPromoError] = useState("");

  const discount = applied ? computeDiscount(subtotal, applied.discountRate) : 0;
  const finalTotal = subtotal - discount;

  useEffect(() => {
    onTotalsChange({
      subtotal,
      discount,
      coupon: applied ? { code: applied.code, discountRate: applied.discountRate } : null,
      total: finalTotal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal, discount, applied, finalTotal]);

  function applyPromo() {
    const result = checkCoupon(promoCode);
    if (result.valid) {
      setApplied(result);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try HASARA30.");
    }
  }

  return (
    <div className="bg-[#0f0f0f] border border-champagne-gold/15 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-champagne-gold/15">
        <p className="font-serif text-champagne-white text-xl font-light tracking-wide">Order Summary</p>
      </div>

      <div
        className="px-6 py-4 space-y-4 max-h-[420px] overflow-y-auto"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {items.length === 0 ? (
          <p className="font-sans text-champagne-white/30 text-sm py-6 text-center">Your bag is empty.</p>
        ) : (
          items.map((item, i) => {
            const isBundle = item.slug.startsWith("tester-bundle-");
            const bundleParts = isBundle ? item.name.split("::") : null;
            const displayName = bundleParts ? "Tester Bundle" : item.name;

            return (
              <div key={`${item.slug}-${item.ml}-${i}`} className="flex gap-4">
                <div className="relative w-14 h-18 flex-shrink-0 overflow-hidden bg-stone-900 rounded-lg">
                  <Image src={item.image} alt={displayName} fill className="object-cover" sizes="56px" />
                  {isBundle && (
                    <div className="absolute inset-0 bg-matte-black/40 flex items-center justify-center">
                      <TestTube size={16} className="text-champagne-gold" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-champagne-white text-sm font-light leading-snug truncate">{displayName}</p>
                  <p className="font-sans text-champagne-white/40 text-xs tracking-wider mt-0.5">
                    {isBundle ? "4×1ml Bundle" : `${item.ml}ml`}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {!isBundle ? (
                      <div className="flex items-center gap-0 border border-champagne-gold/20 rounded-full w-fit overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.slug, item.ml, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center font-sans text-champagne-white text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.ml, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <span />
                    )}
                    <p className="font-sans text-champagne-gold text-sm">৳{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.slug, item.ml)}
                  className="text-champagne-white/20 hover:text-red-400 transition-colors cursor-pointer self-start"
                  aria-label="Remove item"
                >
                  <Trash size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {items.length > 0 && (
        <div className="px-6 py-5 border-t border-champagne-gold/15 space-y-4">
          <div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-champagne-gold/40" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                  placeholder="Promo code"
                  disabled={!!applied}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-champagne-gold/20 rounded-full text-champagne-white text-xs tracking-[0.15em] uppercase font-sans placeholder:text-champagne-white/20 focus:outline-none focus:border-champagne-gold/50 disabled:opacity-50"
                />
              </div>
              {applied ? (
                <button
                  onClick={() => { setApplied(null); setPromoCode(""); }}
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
            {applied && (
              <p className="font-sans text-green-400 text-xs mt-1.5 flex items-center gap-1.5">
                <CheckCircle size={12} weight="fill" /> {Math.round(applied.discountRate * 100)}% discount applied!
              </p>
            )}
            {promoError && <p className="font-sans text-red-400 text-xs mt-1.5">{promoError}</p>}
          </div>

          <div className="space-y-1.5 text-sm font-sans">
            <div className="flex justify-between text-champagne-white/50">
              <span>Subtotal</span>
              <span>৳{subtotal.toLocaleString()}</span>
            </div>
            {applied && (
              <div className="flex justify-between text-green-400">
                <span>Discount ({Math.round(applied.discountRate * 100)}%)</span>
                <span>-৳{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-champagne-gold font-medium pt-2 border-t border-champagne-gold/15">
              <span className="font-serif text-base">Total</span>
              <span className="font-sans text-xl">৳{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
