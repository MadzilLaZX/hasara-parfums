"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, CaretDown, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { fragrances } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const TESTER_PRICE = 100;
export const TESTER_BUNDLE_SIZE = 4;
export const BUNDLE_TOTAL = TESTER_PRICE * TESTER_BUNDLE_SIZE;

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

interface Props {
  /** Pre-fills the first slot — used on a fragrance's own detail page. */
  initialSlug?: string;
  /** Used as the cart-line image if no tester slot has been picked yet. */
  fallbackImage?: string;
}

export default function TesterBundleConfigurator({ initialSlug, fallbackImage }: Props) {
  const [testerSelections, setTesterSelections] = useState<string[]>([initialSlug ?? "", "", "", ""]);
  const [bundleAdded, setBundleAdded] = useState(false);
  const { addItem } = useCart();

  const allTesterSelected = testerSelections.every((s) => s !== "");

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
      image: firstFrag?.image || fallbackImage || fragrances[0].image,
      ml: 1,
      price: BUNDLE_TOTAL,
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 3500);
  }

  function openCartDrawer() {
    window.dispatchEvent(new CustomEvent("hasara:open-cart"));
  }

  return (
    <div className="border border-champagne-gold/25 bg-champagne-gold/[0.04] p-5 rounded-xl space-y-4">
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
        <div className="space-y-2">
          <div className="w-full py-4 flex items-center justify-center gap-2.5 bg-green-500/15 border border-green-500/40 text-green-400 text-xs tracking-[0.2em] uppercase font-sans font-semibold rounded-xl">
            <CheckCircle size={16} weight="fill" />
            Tester Bundle Added to Cart!
          </div>
          <button
            onClick={openCartDrawer}
            className="w-full flex items-center justify-center gap-2 py-3 text-champagne-gold/80 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors cursor-pointer"
          >
            View Bag <ArrowRight size={13} />
          </button>
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
  );
}
