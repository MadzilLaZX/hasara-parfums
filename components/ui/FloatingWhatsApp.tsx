"use client";

import { useState, useEffect } from "react";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getWhatsAppLink } from "@/data/products";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-matte-black text-champagne-white text-xs font-sans tracking-wide p-3 pr-8 max-w-[200px] text-right shadow-xl border border-champagne-gold/20"
              >
                <button
                  onClick={() => setTooltipOpen(false)}
                  className="absolute top-2 right-2 text-champagne-white/40 hover:text-champagne-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={10} />
                </button>
                <p className="font-serif text-champagne-gold text-sm mb-1">
                  Chat with us
                </p>
                <p className="text-champagne-white/60 text-xs leading-snug">
                  Order, inquire, or get fragrance advice via WhatsApp.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <div className="relative">
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping pointer-events-none" />
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setTooltipOpen(true)}
              aria-label="Contact on WhatsApp"
              className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bf5a] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-full"
            >
              <WhatsappLogo size={26} weight="fill" className="text-white" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
