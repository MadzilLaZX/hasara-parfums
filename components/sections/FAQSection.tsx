"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "@phosphor-icons/react";

const FAQS = [
  { q: "What concentration are HASARA perfumes?", a: "All HASARA fragrances are crafted as Extrait de Parfum with an approximate 40% fragrance concentration, carefully balanced to deliver excellent performance while remaining well-suited to Bangladesh's climate." },
  { q: "How long do HASARA perfumes last?", a: "On average, HASARA perfumes last 6–8 hours on the skin, depending on factors such as skin chemistry, weather, and application. Fragrances with stronger woody or floral characteristics may linger on clothing for more than 24 hours." },
  { q: "How should I apply perfume for the best performance?", a: "Spray on pulse points such as the wrists, neck, and behind the ears. Applying to moisturized skin and avoiding rubbing the fragrance after spraying helps preserve the scent's natural development." },
  { q: "How long does delivery take?", a: "Inside Dhaka: 1–3 business days. Outside Dhaka: 2–4 business days. Orders are shipped through Steadfast Courier." },
  { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, Cash on Delivery is available in most serviceable areas across Bangladesh." },
  { q: "How can I choose the right fragrance?", a: "Our website includes a filter system allowing you to browse by gender, season, time of day, occasion, and fragrance notes — making it easy to find your perfect match." },
  { q: "Are HASARA perfumes suitable for daily wear?", a: "Absolutely. Our collection includes fragrances for everyday use, office settings, casual outings, special occasions, and evening wear." },
  { q: "Are HASARA perfumes suitable for gifting?", a: "Yes. HASARA fragrances make excellent gifts for birthdays, anniversaries, Eid, weddings, graduations, and all memorable occasions." },
  { q: "How should I store my perfume?", a: "Store in a cool, dry place away from direct sunlight, heat, and humidity to preserve quality and longevity." },
  { q: "How can I contact HASARA Parfums?", a: "Reach us anytime via WhatsApp or through our Instagram and Facebook pages. We're always happy to help with recommendations, orders, or general support." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-matte-black py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">
            Got Questions?
          </p>
          <h2 className="font-serif text-champagne-white text-5xl lg:text-6xl font-light tracking-wide">
            Frequently Asked
          </h2>
          <p className="font-serif text-champagne-gold italic text-3xl lg:text-4xl font-light mt-1">Questions</p>
          <div className="w-16 h-px bg-champagne-gold mx-auto mt-8" />
        </div>

        {/* FAQ Bars */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i
                  ? "border-champagne-gold/50 bg-champagne-gold/5"
                  : "border-champagne-gold/15 bg-white/[0.02] hover:border-champagne-gold/30"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-6 px-6 py-5 text-left cursor-pointer group"
              >
                <span className={`font-serif text-sm font-light w-8 flex-shrink-0 transition-colors duration-300 ${
                  open === i ? "text-champagne-gold" : "text-champagne-gold/30"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={`flex-1 font-serif text-base lg:text-lg font-light leading-snug transition-colors duration-300 ${
                  open === i ? "text-champagne-gold" : "text-champagne-white/80 group-hover:text-champagne-white"
                }`}>
                  {faq.q}
                </p>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  open === i
                    ? "border-champagne-gold bg-champagne-gold text-matte-black"
                    : "border-champagne-gold/25 text-champagne-gold/40 group-hover:border-champagne-gold/50"
                }`}>
                  {open === i ? <Minus size={12} weight="bold" /> : <Plus size={12} weight="bold" />}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-champagne-white/55 text-sm leading-relaxed px-6 pb-6 pl-20">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
