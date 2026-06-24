"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";

const reviews = [
  {
    name: "Nadim Mahmud",
    role: "Velvet Ember",
    review:
      "The scent opens softly but soon settles into a rich, sophisticated aroma. It's exactly the kind of fragrance that makes people stop and ask what you're wearing. Absolutely worth every taka.",
    stars: 5,
    initial: "N",
  },
  {
    name: "Quashfia Binte Ashfaque",
    role: "Sensual Mirage · Floral Muse",
    review:
      "I bought both Sensual Mirage and Floral Muse and I haven't stopped reaching for them since. Truly recommend Hasara Parfums to everyone who wants a luxurious scent at an honest price.",
    stars: 5,
    initial: "Q",
  },
  {
    name: "Saddam Hossain",
    role: "Bloom Rush",
    review:
      "Got my wife a majestic perfume — Bloom Rush. She absolutely loves it. The packaging felt premium and the scent lasted all day. She said it's the best gift I've ever given her.",
    stars: 5,
    initial: "S",
  },
];

export default function Reviews() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-matte-black py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-serif text-champagne-white text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none">
            What Our Clients Say
          </p>
          <div className="w-16 h-px bg-champagne-gold mt-6" />
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={shouldReduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="border border-champagne-gold/20 p-8 rounded-2xl hover:border-champagne-gold/50 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star key={j} size={14} weight="fill" className="text-champagne-gold" />
                ))}
              </div>

              <p className="font-serif text-champagne-white/85 text-lg italic font-light leading-relaxed mb-8">
                &ldquo;{review.review}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-champagne-gold/20">
                <div className="w-10 h-10 bg-champagne-gold/20 border border-champagne-gold/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-champagne-gold text-sm font-medium">{review.initial}</span>
                </div>
                <div>
                  <p className="text-champagne-white text-sm font-sans font-medium">{review.name}</p>
                  <p className="text-champagne-white/40 text-xs font-sans tracking-wide">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
