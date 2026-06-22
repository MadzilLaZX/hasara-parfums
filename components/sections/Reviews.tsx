"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";

const reviews = [
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
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-champagne-gold/20 p-8 rounded-2xl hover:border-champagne-gold/50 transition-colors duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    weight="fill"
                    className="text-champagne-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-champagne-white/85 text-lg italic font-light leading-relaxed mb-8">
                "{review.review}"
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-6 border-t border-champagne-gold/20">
                <div className="w-10 h-10 bg-champagne-gold/20 border border-champagne-gold/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-champagne-gold text-sm font-medium">
                    {review.initial}
                  </span>
                </div>
                <div>
                  <p className="text-champagne-white text-sm font-sans font-medium">
                    {review.name}
                  </p>
                  <p className="text-champagne-white/40 text-xs font-sans tracking-wide">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
