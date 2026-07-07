"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Minus, Plus, TestTube, CaretDown, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { type FragranceSize, fragrances } from "@/data/products";
import { useCart } from "@/context/CartContext";

const TESTER_PRICE = 100;
const TESTER_BUNDLE_SIZE = 4;
const BUNDLE_TOTAL = TESTER_PRICE * TESTER_BUNDLE_SIZE;

interface Props {
  productName: string;
  productSlug: string;
  productImage: string;
  sizes: FragranceSize[];
}

function TesterSlotPicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = fragrances.find((f) => f.slug === value);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <p className="font-sans text-champagne-white/40 text-[10px] tracking-[0.2em] uppercase mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-[#0f0d08] border border-champagne-gold/25 hover:border-champagne-gold/50 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-left"
      >
        {selected ? (
          <>
            <div className="relative w-8 h-10 flex-shrink-0 overflow-hidden rounded-lg bg-stone-900">
              <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="32px" />
            </div>
            <span className="font-sans text-champagne-white text-sm flex-1 truncate">{selected.name}</span>
          </>
        ) : (
          <span className="font-sans text-champagne-white/40 text-sm flex-1">Select Parfum</span>
        )}
        <CaretDown
          size={14}
          className={`text-champagne-gold/50 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-[#0f0d08] border border-champagne-gold/30 rounded-xl overflow-hidden shadow-2xl">
          {/* data-lenis-prevent stops Lenis smooth-scroll from swallowing wheel events inside this list */}
          <div
            className="max-h-56 overflow-y-auto overscroll-contain"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full flex items-center px-4 py-2.5 hover:bg-champagne-gold/10 transition-colors cursor-pointer"
            >
              <span className="font-sans text-champagne-white/35 text-sm">Select Parfum</span>
            </button>
            {fragrances.map((f) => (
              <button
                key={f.slug}
                onClick={() => { onChange(f.slug); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-champagne-gold/10 transition-colors cursor-pointer ${
                  value === f.slug ? "bg-champagne-gold/15" : ""
                }`}
              >
                <div className="relative w-8 h-10 flex-shrink-0 overflow-hidden rounded-lg bg-stone-900">
                  <Image src={f.image} alt={f.name} fill className="object-cover" sizes="32px" />
                </div>
                <span className="font-sans text-champagne-white text-sm flex-1 text-left">{f.name}</span>
                {value === f.slug && (
                  <CheckCircle size={14} weight="fill" className="text-champagne-gold flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SizeSelector({ productName, productSlug, productImage, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<FragranceSize>(sizes[1]);
  const [isTester, setIsTester] = useState(false);
  const [testerSelections, setTesterSelections] = useState<string[]>([productSlug, "", "", ""]);
  const [bundleAdded, setBundleAdded] = useState(false);
  const { addItem, updateQuantity, items } = useCart();

  const cartItem = items.find((i) => i.slug === productSlug && i.ml === selectedSize.ml);
  const qty = cartItem?.quantity ?? 0;
  const allTesterSelected = testerSelections.every((s) => s !== "");
  const cartHasItems = items.length > 0;

  function openCartDrawer() {
    window.dispatchEvent(new CustomEvent("hasara:open-cart"));
  }

  function setTesterSlot(idx: number, slug: string) {
    const updated = [...testerSelections];
    updated[idx] = slug;
    setTesterSelections(updated);
  }

  function addTesterBundle() {
    const names = testerSelections
      .map((s) => fragrances.find((f) => f.slug === s)?.name || "")
      .filter(Boolean);
    const firstFrag = fragrances.find((f) => f.slug === testerSelections[0]);
    addItem({
      slug: `tester-bundle-${Date.now()}`,
      name: `Tester Bundle::${names.join(", ")}`,
      image: firstFrag?.image || productImage,
      ml: 1,
      price: BUNDLE_TOTAL,
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 3500);
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
        <div className="border border-champagne-gold/25 bg-champagne-gold/[0.04] p-5 rounded-xl mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-sans text-champagne-white/70 text-xs tracking-[0.25em] uppercase">4 Tester Bundle</p>
            <p className="font-sans text-champagne-gold text-sm font-medium">৳{BUNDLE_TOTAL} total</p>
          </div>
          <p className="font-sans text-champagne-white/35 text-[10px] leading-relaxed tracking-wide">
            Choose any 4 parfums — same or different combinations allowed.
          </p>

          {[0, 1, 2, 3].map((idx) => (
            <TesterSlotPicker
              key={idx}
              value={testerSelections[idx]}
              onChange={(v) => setTesterSlot(idx, v)}
              label={`Tester ${idx + 1}`}
            />
          ))}

          {bundleAdded ? (
            <div className="w-full py-4 flex items-center justify-center gap-2.5 bg-green-500/15 border border-green-500/40 text-green-400 text-xs tracking-[0.2em] uppercase font-sans font-semibold rounded-xl">
              <CheckCircle size={16} weight="fill" />
              Tester Bundle Added to Cart!
            </div>
          ) : (
            <button
              onClick={addTesterBundle}
              disabled={!allTesterSelected}
              className={`w-full py-4 text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
                allTesterSelected
                  ? "bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 cursor-pointer"
                  : "bg-champagne-gold/15 text-champagne-gold/30 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={14} />
              Add Tester Bundle to Cart
            </button>
          )}
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
