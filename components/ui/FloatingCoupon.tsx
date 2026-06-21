"use client";

import { useState, useEffect } from "react";
import { Tag, X, CopySimple, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const DISCOUNT_CODE = "HASARA10";

export default function FloatingCoupon() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  function copyCode() {
    const finish = () => { setCopied(true); setTimeout(() => setCopied(false), 2500); };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(DISCOUNT_CODE).then(finish).catch(fallback);
    } else { fallback(); }
    function fallback() {
      const el = document.createElement("textarea");
      el.value = DISCOUNT_CODE;
      el.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(el); el.focus(); el.select();
      try { document.execCommand("copy"); finish(); } catch {}
      document.body.removeChild(el);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Popup card */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0f0d08] border border-champagne-gold/30 w-[220px] shadow-2xl overflow-hidden"
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-sans text-champagne-gold text-[9px] tracking-[0.4em] uppercase mb-1">Exclusive Offer</p>
                      <p className="font-serif text-champagne-white text-base font-light">Your Promo Code</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-champagne-white/30 hover:text-champagne-white transition-colors cursor-pointer mt-0.5">
                      <X size={14} />
                    </button>
                  </div>

                  <div className="mb-3 text-center">
                    <p className="font-sans text-champagne-gold text-3xl font-light leading-none mb-0.5">10%</p>
                    <p className="font-sans text-champagne-white/50 text-[9px] tracking-[0.3em] uppercase">OFF YOUR ORDER</p>
                  </div>

                  <button
                    onClick={copyCode}
                    className="w-full flex items-center justify-between gap-2 border border-dashed border-champagne-gold/50 px-3 py-2.5 hover:border-champagne-gold transition-colors cursor-pointer group"
                  >
                    <span className="font-sans text-champagne-gold text-sm font-semibold tracking-[0.3em]">{DISCOUNT_CODE}</span>
                    {copied
                      ? <CheckCircle size={15} weight="fill" className="text-green-400 flex-shrink-0" />
                      : <CopySimple size={15} className="text-champagne-gold/50 group-hover:text-champagne-gold flex-shrink-0 transition-colors" />
                    }
                  </button>
                  {copied && <p className="font-sans text-green-400 text-[10px] mt-1.5 text-center tracking-wider">✓ Copied!</p>}
                  <p className="font-sans text-champagne-white/25 text-[9px] text-center mt-2 tracking-wide">Apply at WhatsApp checkout</p>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold/25 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button — same w-14 h-14 as FloatingWhatsApp */}
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-champagne-gold/20 animate-ping pointer-events-none" />
            <button
              onClick={() => setOpen(!open)}
              aria-label="View promo code"
              className="relative w-14 h-14 bg-[#1a1208] border border-champagne-gold/50 hover:border-champagne-gold hover:bg-champagne-gold/15 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-full"
            >
              <Tag size={24} className="text-champagne-gold" weight="fill" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
