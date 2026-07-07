"use client";

import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { WHATSAPP_NUMBER } from "@/data/products";
import type { Order } from "@/lib/order";
import { buildWhatsAppMessage } from "@/lib/order";

interface Props {
  order: Order;
}

export default function CheckoutSuccess({ order }: Props) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(order))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center max-w-md mx-auto py-20 px-6"
    >
      <div className="w-16 h-16 rounded-full border border-champagne-gold/30 flex items-center justify-center mb-6">
        <CheckCircle size={32} weight="light" className="text-champagne-gold" />
      </div>
      <h1 className="font-serif text-champagne-white text-3xl font-light tracking-wide mb-3">
        Order Submitted Successfully
      </h1>
      <p className="font-sans text-champagne-white/50 text-sm leading-relaxed mb-1">
        Thank you for choosing HASARA Parfums.
      </p>
      <p className="font-sans text-champagne-white/50 text-sm leading-relaxed mb-6">
        Our team has received your order.
      </p>

      <div className="w-full border border-champagne-gold/15 rounded-xl px-5 py-4 mb-8 space-y-2">
        <div className="flex justify-between text-xs font-sans">
          <span className="text-champagne-white/40 tracking-wider uppercase">Order ID</span>
          <span className="text-champagne-gold">{order.orderId}</span>
        </div>
        <div className="flex justify-between text-xs font-sans">
          <span className="text-champagne-white/40 tracking-wider uppercase">Estimated Delivery</span>
          <span className="text-champagne-white/70">3–14 Business Days</span>
        </div>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
      >
        <WhatsappLogo size={16} weight="fill" />
        Continue on WhatsApp
      </a>
    </motion.div>
  );
}
