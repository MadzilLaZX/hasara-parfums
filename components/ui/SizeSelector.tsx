"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, TestTube } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { type FragranceSize } from "@/data/products";
import { useCart } from "@/context/CartContext";
import TesterBundleConfigurator, { TESTER_PRICE } from "@/components/ui/TesterBundleConfigurator";

interface Props {
  productName: string;
  productSlug: string;
  productImage: string;
  sizes: FragranceSize[];
}

export default function SizeSelector({ productName, productSlug, productImage, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<FragranceSize>(sizes[1]);
  const [isTester, setIsTester] = useState(false);
  const { addItem, updateQuantity, items } = useCart();

  const cartItem = items.find((i) => i.slug === productSlug && i.ml === selectedSize.ml);
  const qty = cartItem?.quantity ?? 0;
  const cartHasItems = items.length > 0;

  function openCartDrawer() {
    window.dispatchEvent(new CustomEvent("hasara:open-cart"));
  }

  function handleAddRegular() {
    addItem({
      slug: productSlug,
      name: productName,
      image: productImage,
      ml: selectedSize.ml,
      price: selectedSize.price,
    });
  }

  return (
    <div>
      <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">Select Size</p>

      {/* Regular sizes */}
      <div className="space-y-2 mb-3">
        {sizes.map((size) => {
          const isSelected = !isTester && selectedSize.ml === size.ml;
          return (
            <button
              key={size.ml}
              onClick={() => { setSelectedSize(size); setIsTester(false); }}
              className={`w-full flex items-center justify-between px-5 py-4 border rounded-xl transition-all duration-200 text-left cursor-pointer ${
                isSelected ? "border-champagne-gold bg-champagne-gold/8" : "border-champagne-white/15 hover:border-champagne-white/35"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${
                  isSelected ? "border-champagne-gold bg-champagne-gold" : "border-champagne-white/30"
                }`} />
                <span className={`font-sans text-sm tracking-[0.1em] transition-colors duration-200 ${
                  isSelected ? "text-champagne-white" : "text-champagne-white/55"
                }`}>{size.ml}ml</span>
              </div>
              <div className="text-right">
                {size.originalPrice && (
                  <p className="font-sans text-xs text-champagne-white/30 line-through leading-none mb-0.5">
                    ৳{size.originalPrice.toLocaleString()}
                  </p>
                )}
                <span className={`font-sans text-xl font-medium transition-colors duration-200 ${
                  isSelected ? "text-champagne-gold" : "text-champagne-white/40"
                }`}>৳{size.price.toLocaleString()}</span>
              </div>
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

      {/* 1ml Tester row */}
      <button
        onClick={() => setIsTester(true)}
        className={`w-full flex items-center justify-between px-5 py-4 border rounded-xl transition-all duration-200 text-left cursor-pointer ${
          isTester ? "border-champagne-gold bg-champagne-gold/8 mb-4" : "border-champagne-white/15 hover:border-champagne-white/35 mb-8"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${
            isTester ? "border-champagne-gold bg-champagne-gold" : "border-champagne-white/30"
          }`} />
          <div>
            <span className={`font-sans text-sm tracking-[0.1em] transition-colors duration-200 ${
              isTester ? "text-champagne-white" : "text-champagne-white/55"
            }`}>1ml Tester Bundle</span>
            <span className="ml-2 font-sans text-[10px] tracking-wider text-champagne-gold/50 uppercase">Try the parfum first</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TestTube size={13} className={isTester ? "text-champagne-gold" : "text-champagne-white/25"} />
          <div className="text-right">
            <p className="font-sans text-[10px] text-champagne-white/30 leading-none">×4 · min bundle</p>
            <span className={`font-sans text-xl font-medium transition-colors duration-200 ${
              isTester ? "text-champagne-gold" : "text-champagne-white/40"
            }`}>৳{TESTER_PRICE}</span>
          </div>
        </div>
      </button>

      {/* Tester bundle configurator */}
      {isTester && (
        <div className="mb-8">
          <TesterBundleConfigurator initialSlug={productSlug} fallbackImage={productImage} />
        </div>
      )}

      {/* Regular add to cart / quantity counter */}
      {!isTester && (
        <>
          {qty > 0 ? (
            <div className="flex items-center w-full border border-champagne-gold rounded-xl mb-3 overflow-hidden">
              <button
                onClick={() => updateQuantity(productSlug, selectedSize.ml, qty - 1)}
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 active:bg-champagne-gold/20 transition-colors cursor-pointer border-r border-champagne-gold/30"
                aria-label="Remove one"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 flex flex-col items-center justify-center py-2">
                <span className="font-sans text-champagne-gold text-2xl font-medium leading-none">{qty}</span>
                <span className="font-sans text-champagne-white/30 text-[10px] tracking-[0.2em] uppercase mt-0.5">in bag</span>
              </div>
              <button
                onClick={handleAddRegular}
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold/10 active:bg-champagne-gold/20 transition-colors cursor-pointer border-l border-champagne-gold/30"
                aria-label="Add one more"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddRegular}
              className="flex items-center justify-center gap-3 w-full py-4 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-sm tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-xl mb-3"
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
          )}

          {/* View My Bag — appears only when bag has items */}
          <AnimatePresence>
            {cartHasItems && (
              <motion.button
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={openCartDrawer}
                className="flex items-center justify-center gap-3 w-full py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-xl mt-3"
              >
                <ShoppingBag size={18} weight="fill" />
                View My Bag
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
