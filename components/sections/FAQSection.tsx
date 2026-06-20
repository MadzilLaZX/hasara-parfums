"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "@phosphor-icons/react";

const FAQS = [
  {
    q: "What concentration are HASARA perfumes?",
    a: "All HASARA fragrances are crafted as Extrait de Parfum with an approximate 40% fragrance concentration, carefully balanced to deliver excellent performance while remaining well-suited to Bangladesh's climate.",
  },
  {
    q: "How long do HASARA perfumes last?",
    a: "On average, HASARA perfumes last 6–8 hours on the skin, depending on factors such as skin chemistry, weather, and application. Fragrances with stronger woody or floral characteristics may linger on clothing for more than 24 hours.",
  },
  {
    q: "How should I apply perfume for the best performance?",
    a: "For the best results, spray on pulse points such as the wrists, neck, and behind the ears. Applying to moisturized skin and avoiding rubbing the fragrance after spraying can help improve performance and preserve the scent's natural development.",
  },
  {
    q: "How long does delivery take?",
    a: "Inside Dhaka: 1–3 business days. Outside Dhaka: 2–4 business days. Orders are shipped through Steadfast Courier, and delivery times may vary slightly depending on your location.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes, Cash on Delivery (COD) is available in most serviceable areas across Bangladesh.",
  },
  {
    q: "How can I choose the right fragrance?",
    a: "Our website includes a convenient filter system that allows you to browse perfumes based on gender, season, preferred time of day, occasion, and fragrance notes, making it easy to find a scent that matches your style.",
  },
  {
    q: "Are HASARA perfumes suitable for daily wear?",
    a: "Absolutely. Our collection includes fragrances designed for everyday use, office settings, casual outings, special occasions, and evening wear.",
  },
  {
    q: "Are HASARA perfumes suitable for gifting?",
    a: "Yes. HASARA fragrances make excellent gifts for birthdays, anniversaries, Eid, weddings, graduations, and other memorable occasions.",
  },
  {
    q: "How should I store my perfume?",
    a: "Store your perfume in a cool, dry place away from direct sunlight, excessive heat, and humidity to help preserve its quality and longevity.",
  },
  {
    q: "How can I contact HASARA Parfums?",
    a: "You can reach us anytime through WhatsApp or by sending a direct message on our Instagram or Facebook pages. We're always happy to help with product recommendations, order inquiries, or general support.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-champagne-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">
            Got Questions?
          </p>
          <h2 className="font-serif text-primary-text text-5xl lg:text-6xl font-light tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-px bg-champagne-gold mx-auto mt-8" />
        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-stone-100">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
              >
                <p className={`font-serif text-lg font-light transition-colors duration-300 ${
                  open === i ? "text-champagne-gold" : "text-primary-text group-hover:text-champagne-gold"
                }`}>
                  {faq.q}
                </p>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-champagne-gold/60 group-hover:text-champagne-gold transition-colors">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-secondary-text text-sm leading-relaxed pb-6 max-w-2xl">
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
