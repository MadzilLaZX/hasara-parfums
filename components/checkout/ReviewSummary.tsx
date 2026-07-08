"use client";

import Image from "next/image";
import { TestTube } from "@phosphor-icons/react";
import { useCart } from "@/context/CartContext";
import type { OrderTotals } from "@/components/checkout/OrderSummary";

interface Props {
  totals: OrderTotals;
}

export default function ReviewSummary({ totals }: Props) {
  const { items } = useCart();

  return (
    <div className="bg-[#0f0f0f] border border-champagne-gold/15 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-champagne-gold/15">
        <p className="font-serif text-champagne-white text-xl font-light tracking-wide">Order Summary</p>
      </div>

      <div
        className="px-6 py-4 space-y-4 max-h-[360px] overflow-y-auto"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {items.map((item, i) => {
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
                  {isBundle ? "4×1ml Bundle" : `${item.ml}ml`} · Qty {item.quantity}
                </p>
              </div>
              <p className="font-sans text-champagne-gold text-sm">৳{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-5 border-t border-champagne-gold/15 space-y-1.5 text-sm font-sans">
        <div className="flex justify-between text-champagne-white/50">
          <span>Subtotal</span>
          <span>৳{totals.subtotal.toLocaleString()}</span>
        </div>
        {totals.coupon && (
          <div className="flex justify-between text-green-400">
            <span>Discount ({Math.round(totals.coupon.discountRate * 100)}%) · {totals.coupon.code}</span>
            <span>-৳{totals.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-champagne-gold font-medium pt-2 border-t border-champagne-gold/15">
          <span className="font-serif text-base">Total</span>
          <span className="font-sans text-xl">৳{totals.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
