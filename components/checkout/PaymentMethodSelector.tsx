"use client";

import { CheckCircle, Money, CreditCard, DeviceMobile } from "@phosphor-icons/react";
import type { OrderPaymentMethod } from "@/lib/order";

const METHODS: { id: OrderPaymentMethod; label: string; description: string; available: boolean }[] = [
  { id: "cod", label: "Cash on Delivery", description: "Pay when your order arrives", available: true },
  { id: "sslcommerz", label: "Card / Mobile Banking", description: "Coming soon", available: false },
  { id: "stripe", label: "Online Payment", description: "bKash, Nagad, Rocket, Debit/Credit Cards — Coming Soon", available: false },
];

interface Props {
  value: OrderPaymentMethod;
}

export default function PaymentMethodSelector({ value }: Props) {
  return (
    <div className="space-y-3">
      {METHODS.map((method) => {
        const selected = method.id === value;
        return (
          <div
            key={method.id}
            className={`flex items-center justify-between gap-4 border rounded-xl px-5 py-4 transition-colors ${
              selected
                ? "border-champagne-gold/50 bg-champagne-gold/[0.06]"
                : "border-champagne-gold/10 opacity-40"
            }`}
          >
            <div className="flex items-center gap-3">
              {method.id === "cod" ? (
                <Money size={20} className={selected ? "text-champagne-gold" : "text-champagne-white/40"} />
              ) : method.id === "stripe" ? (
                <DeviceMobile size={20} className="text-champagne-white/40" />
              ) : (
                <CreditCard size={20} className="text-champagne-white/40" />
              )}
              <div>
                <p className="font-sans text-champagne-white text-sm tracking-wide">{method.label}</p>
                <p className="font-sans text-champagne-white/40 text-xs mt-0.5">{method.description}</p>
              </div>
            </div>
            {selected && <CheckCircle size={18} weight="fill" className="text-champagne-gold flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}
