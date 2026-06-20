"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { type FragranceSize, WHATSAPP_NUMBER } from "@/data/products";

interface Props {
  productName: string;
  sizes: FragranceSize[];
}

export default function SizeSelector({ productName, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<FragranceSize>(sizes[1]);

  const whatsAppLink = (() => {
    const message = `Hello Hasara Parfums,\n\nI am interested in ${productName}.\n\nSize: ${selectedSize.ml}ml — ৳${selectedSize.price.toLocaleString()}\n\nPlease provide more information.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  })();

  return (
    <div>
      <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">
        Select Size
      </p>

      <div className="space-y-2 mb-10">
        {sizes.map((size) => {
          const isSelected = selectedSize.ml === size.ml;
          return (
            <button
              key={size.ml}
              onClick={() => setSelectedSize(size)}
              className={`w-full flex items-center justify-between px-5 py-4 border transition-all duration-200 text-left cursor-pointer ${
                isSelected
                  ? "border-champagne-gold bg-champagne-gold/8"
                  : "border-champagne-white/15 hover:border-champagne-white/35"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${
                    isSelected
                      ? "border-champagne-gold bg-champagne-gold"
                      : "border-champagne-white/30"
                  }`}
                />
                <span
                  className={`font-sans text-sm tracking-[0.1em] transition-colors duration-200 ${
                    isSelected ? "text-champagne-white" : "text-champagne-white/55"
                  }`}
                >
                  {size.ml}ml
                </span>
              </div>
              <span
                className={`font-serif text-xl font-light transition-colors duration-200 ${
                  isSelected ? "text-champagne-gold" : "text-champagne-white/40"
                }`}
              >
                ৳{size.price.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>

      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-sm"
      >
        <WhatsappLogo size={18} weight="fill" />
        Contact on WhatsApp
      </a>
      <p className="text-center text-champagne-white/30 text-xs font-sans mt-3 tracking-wide">
        We respond within minutes
      </p>
    </div>
  );
}
