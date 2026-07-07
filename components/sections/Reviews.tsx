"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";

const visibleReviews = [
  {
    name: "Quashfia Binte Ashfaque",
    role: "Sensual Mirage · Floral Muse",
    review:
      "Truly recommend Hasara Purfums to everyone looking for high quality and long lasting fragrance. Both Sensual Mirage and Floral Muse are absolutely fantastic. The fragrances are definitely a must haves for everyone!!",
    stars: 5,
    initial: "Q",
  },
  {
    name: "Nayeem Al Amin",
    role: "Velvet Ember",
    review:
      "wasnt a fan of sweet fragrance till I used Velvet Ember.It  made a fan out of me. Had 6-8 sprays in the morning at 7 am while going to office and it strongly lasted till 2 am. we all should show our strong support towards our own local perfume brands which we can be proud of",
    stars: 5,
    initial: "N",
  },
  {
    name: "Adib Ahmed",
    role: "Fresh Pulse",
    review:
      "Alhamdulillah, already took one. So far the smell, duration is super. Highly recommended to everyone who likes perfume which is sporty, mint and little mild.",
    stars: 5,
    initial: "A",
  },
];

const hiddenReviews = [
  {
    name: "Saddam Hossain",
    role: "Bloom Rush",
    review:
      "Got my wife a magestic perfume \"Bloom Rush\". She really loved it and enjoying it on her daily basis use.",
    stars: 5,
    initial: "S",
  },
  {
    name: "Nadim Mahmud",
    role: "Velvet Ember",
    review:
      "The scent opens softly but soon settles into a rich, sophisticated aroma that feels both comforting and luxurious. It carries the depth of high-end perfumes, yet remains affordable and easy to wear every day. If you love perfumes that are smooth, velvety, and timeless, Velvet Ember is definitely worth trying.",
    stars: 5,
    initial: "N",
  },
  {
    name: "Saddam Hossain",
    role: "Bloom Rush",
    review:
      "Got my wife a magestic perfume \"Bloom Rush\". She really loved it and enjoying it on her daily basis use.",
    stars: 5,
    initial: "S",
  },
];

function ReviewCard({ review, index, delay = 0 }: { review: typeof visibleReviews[0]; index: number; delay?: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="border border-champagne-gold/20 p-8 rounded-2xl hover:border-champagne-gold/50 transition-colors duration-500 flex flex-col"
    >
      <div className="flex gap-1 mb-6">
        {Array.from({ length: review.stars }).map((_, j) => (
          <Star key={j} size={14} weight="fill" className="text-champagne-gold" />
        ))}
      </div>

      <p className="font-serif text-champagne-white/85 text-lg italic font-light leading-relaxed mb-8 flex-1">
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
  const shouldReduce = useReducedMotion();
  const [showAll, setShowAll] = useState(false);

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

        {/* First 3 reviews — always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleReviews.map((review, i) => (
            <ReviewCard key={review.name + i} review={review} index={i} />
          ))}
        </div>

        {/* Additional 3 reviews — revealed on See More */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
                {hiddenReviews.map((review, i) => (
                  <ReviewCard key={review.name + "-extra-" + i} review={review} index={i} delay={0.1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* See More / See Less button */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 px-8 py-3.5 border border-champagne-gold/40 text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-full"
          >
            {showAll ? "See Less" : "See More Reviews"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
