"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";

const allReviews = [
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
  {
    name: "Fatima Rahman",
    role: "Loyal Customer",
    review:
      "Oud Royale is unlike anything I have ever worn. The longevity is extraordinary and I receive compliments every single time. Hasara has become my signature house.",
    stars: 5,
    initial: "F",
  },
  {
    name: "Karim Hassan",
    role: "Gifted to Wife",
    review:
      "Ordered Rose Elixir for my wife's birthday. She was absolutely moved by the quality and the packaging. The fragrance is deeply feminine yet sophisticated. Will be ordering again.",
    stars: 5,
    initial: "K",
  },
  {
    name: "Nadia Islam",
    role: "First Purchase",
    review:
      "I was hesitant ordering a luxury fragrance without testing in person. But the WhatsApp consultation was so helpful. Amber Mystique exceeded every expectation. It's pure magic.",
    stars: 5,
    initial: "N",
  },
];

function ReviewCard({ review, index, delay = 0 }: { review: (typeof allReviews)[0]; index: number; delay?: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
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
  );
}

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);
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

        {/* First 3 — always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {allReviews.slice(0, 3).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} delay={i * 0.12} />
          ))}
        </div>

        {/* Additional 3 — animated expand */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="extra-reviews"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
                {allReviews.slice(3).map((review, i) => (
                  <ReviewCard key={review.name} review={review} index={i} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-8 py-3 border border-champagne-gold/40 text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-xs tracking-[0.25em] uppercase font-sans transition-all duration-400 rounded-full cursor-pointer"
          >
            {showAll ? "Show Less Reviews" : "View More Reviews"}
          </button>
        </div>
      </div>
    </section>
  );
}
