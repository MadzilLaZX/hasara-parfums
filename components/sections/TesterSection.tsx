"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TestTube, ShoppingBag } from "@phosphor-icons/react";
import TesterBundleConfigurator, { useTesterBundleCount } from "@/components/ui/TesterBundleConfigurator";

export default function TesterSection() {
  const shouldReduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const bundleCount = useTesterBundleCount();
  const showConfigurator = open || bundleCount > 0;

  return (
    <section className="bg-matte-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <TestTube size={18} className="text-champagne-gold" weight="light" />
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase">
                Try Before You Buy
              </p>
            </div>
            <h2 className="font-display text-champagne-white text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6">
              Try A 1ml Tester Bundle
            </h2>
            <p className="font-sans text-champagne-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Not sure which parfum speaks to you? Explore any scent from our collection with a 1ml tester before committing to a full bottle. Experience how it evolves on your skin throughout the day.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Try any parfum from our full collection",
                "Experience how it evolves on your skin",
                "Available for all bottle sizes",
                "Add straight to your bag — no waiting",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 font-sans text-champagne-white/50 text-sm">
                  <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {!showConfigurator && (
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-full cursor-pointer"
              >
                <ShoppingBag size={16} />
                Build Your Tester Bundle
              </button>
            )}

            <AnimatePresence onExitComplete={() => setRevealed(false)}>
              {showConfigurator && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onAnimationComplete={() => setRevealed(true)}
                  style={{ overflow: revealed ? "visible" : "hidden" }}
                >
                  <div className="pt-1">
                    <TesterBundleConfigurator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {[
              { label: "Select up to 4 parfums", step: "01" },
              { label: "Add the bundle to your bag", step: "02" },
              { label: "Complete checkout", step: "03" },
              { label: "Find your signature scent", step: "04" },
            ].map(({ label, step }) => (
              <div key={step} className="flex items-center gap-6 border border-champagne-gold/10 px-6 py-5 rounded-2xl">
                <span className="font-serif text-champagne-gold/30 text-3xl font-light w-10 flex-shrink-0">
                  {step}
                </span>
                <p className="font-sans text-champagne-white/70 text-sm tracking-wide">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
