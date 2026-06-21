"use client";

import { useState } from "react";
import { WhatsappLogo, ShoppingBag, CheckCircle, TestTube } from "@phosphor-icons/react";
import { type FragranceSize, WHATSAPP_NUMBER } from "@/data/products";
import { useCart } from "@/context/CartContext";

const TESTER: FragranceSize = { ml: 1, price: 220 };

interface Props {
  productName: string;
  productSlug: string;
  productImage: string;
  sizes: FragranceSize[];
}

export default function SizeSelector({ productName, productSlug, productImage, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<FragranceSize>(sizes[1]);
  const [isTester, setIsTester] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const activeSize = isTester ? TESTER : selectedSize;

  const whatsAppLink = (() => {
    const sizeLabel = isTester ? "1ml Tester" : `${activeSize.ml}ml`;
    const message = `Hello Hasara Parfums,\n\nI am interested in ${productName}.\n\nSize: ${sizeLabel} — ৳${activeSize.price.toLocaleString()}\n\nPlease provide more information.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  })();

  function handleAddToCart() {
    const label = isTester ? "1ml Tester" : `${activeSize.ml}ml`;
    addItem({
      slug: productSlug,
      name: `${productName}${isTester ? " (Tester)" : ""}`,
      image: productImage,
      ml: activeSize.ml,
      price: activeSize.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">Select Size</p>

      {/* Regular sizes */}
      <div className="space-y-2 mb-3">
        {sizes.map((size) => {
          const isSelected = !isTester && selectedSize.ml === size.ml;
          return (
            <button key={size.ml} onClick={() => { setSelectedSize(size); setIsTester(false); }}
              className={`w-full flex items-center justify-between px-5 py-4 border transition-all duration-200 text-left cursor-pointer ${isSelected ? "border-champagne-gold bg-champagne-gold/8" : "border-champagne-white/15 hover:border-champagne-white/35"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${isSelected ? "border-champagne-gold bg-champagne-gold" : "border-champagne-white/30"}`} />
                <span className={`font-sans text-sm tracking-[0.1em] transition-colors duration-200 ${isSelected ? "text-champagne-white" : "text-champagne-white/55"}`}>{size.ml}ml</span>
              </div>
              <span className={`font-serif text-xl font-light transition-colors duration-200 ${isSelected ? "text-champagne-gold" : "text-champagne-white/40"}`}>৳{size.price.toLocaleString()}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-champagne-gold/15" />
        <span className="font-sans text-champagne-white/25 text-[10px] tracking-[0.3em] uppercase">Try Before You Buy</span>
        <div className="flex-1 h-px bg-champagne-gold/15" />
      </div>

      {/* 1ml Tester */}
      <button
        onClick={() => setIsTester(true)}
        className={`w-full flex items-center justify-between px-5 py-4 border transition-all duration-200 text-left cursor-pointer mb-8 ${isTester ? "border-champagne-gold bg-champagne-gold/8" : "border-champagne-white/15 hover:border-champagne-white/35"}`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${isTester ? "border-champagne-gold bg-champagne-gold" : "border-champagne-white/30"}`} />
          <div>
            <span className={`font-sans text-sm tracking-[0.1em] transition-colors duration-200 ${isTester ? "text-champagne-white" : "text-champagne-white/55"}`}>1ml Tester</span>
            <span className="ml-2 font-sans text-[10px] tracking-wider text-champagne-gold/50 uppercase">Try the scent first</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TestTube size={13} className={isTester ? "text-champagne-gold" : "text-champagne-white/25"} />
          <span className={`font-serif text-xl font-light transition-colors duration-200 ${isTester ? "text-champagne-gold" : "text-champagne-white/40"}`}>৳220</span>
        </div>
      </button>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`flex items-center justify-center gap-3 w-full py-4 border text-sm tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-sm mb-3 ${
          added
            ? "border-green-500 text-green-400 bg-green-500/10"
            : "border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black"
        }`}
      >
        {added ? <><CheckCircle size={16} weight="fill" /> Added to Cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
      </button>

      {/* Direct WhatsApp */}
      <a href={whatsAppLink} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-sm"
      >
        <WhatsappLogo size={18} weight="fill" />
        Contact on WhatsApp
      </a>
      <p className="text-center text-champagne-white/30 text-xs font-sans mt-3 tracking-wide">We respond within minutes</p>
    </div>
  );
}
