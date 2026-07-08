"use client";

import Image from "next/image";
import { LockSimple } from "@phosphor-icons/react";

export default function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 bg-matte-black/95 backdrop-blur-md border-b border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Image
          src="/images/logo.png"
          alt="Hasara Parfums"
          width={150}
          height={56}
          className="opacity-90"
          priority
        />
        <div className="flex items-center gap-2 text-champagne-white/40 text-xs tracking-[0.2em] uppercase font-sans">
          <LockSimple size={13} />
          Secure Checkout
        </div>
      </div>
    </header>
  );
}
