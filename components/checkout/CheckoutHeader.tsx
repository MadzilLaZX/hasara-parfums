"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockSimple } from "@phosphor-icons/react";

interface Props {
  onBack?: () => void;
}

export default function CheckoutHeader({ onBack }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-matte-black/95 backdrop-blur-md border-b border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack ?? (() => router.back())}
            aria-label="Go back"
            className="flex items-center gap-2 text-champagne-white/50 hover:text-champagne-gold text-xs tracking-[0.15em] uppercase font-sans transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div className="hidden sm:block w-px h-6 bg-champagne-gold/15" />
          <Image
            src="/images/logo.png"
            alt="Hasara Parfums"
            width={140}
            height={52}
            className="opacity-90 hidden sm:block"
            priority
          />
        </div>
        <div className="flex items-center gap-2 text-champagne-white/40 text-xs tracking-[0.2em] uppercase font-sans">
          <LockSimple size={13} />
          Secure Checkout
        </div>
      </div>
    </header>
  );
}
