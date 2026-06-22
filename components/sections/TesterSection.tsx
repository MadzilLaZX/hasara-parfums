"use client";

import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogo, TestTube } from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/data/products";

export default function TesterSection() {
  const shouldReduce = useReducedMotion();
  const testerLink = `https://wa.me/8801767067130?text=${encodeURIComponent(
    "Hello Hasara Parfums,\n\nI would like to try a 1ml tester before purchasing.\n\nCould you please help me with the available options?\n\nThank you."
  )}`;

  return (
    <section className="bg-matte-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              Try A 1ml Tester
            </h2>
            <p className="font-sans text-champagne-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Not sure which fragrance speaks to you? Explore any scent from our collection with a 1ml tester before committing to a full bottle. Experience how it evolves on your skin throughout the day.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Try any fragrance from our full collection",
                "Experience how it evolves on your skin",
                "Available for all bottle sizes",
                "Order via WhatsApp — quick and easy",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 font-sans text-champagne-white/50 text-sm">
                  <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={testerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-full"
            >
              <WhatsappLogo size={16} weight="fill" />
              Request a Tester
            </a>
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
              { label: "Select your fragrance", step: "01" },
              { label: "Contact us on WhatsApp", step: "02" },
              { label: "Receive your 1ml tester", step: "03" },
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
