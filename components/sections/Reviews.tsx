"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";

const reviews = [
  {
    name: "Nadim Mahmud",
    role: "Velvet Ember",
    review:
      "The scent opens softly but soon settles into a rich, sophisticated aroma that feels both comforting and luxurious. It carries the depth of high-end perfumes, yet remains affordable and easy to wear every day. If you love perfumes that are smooth, velvety, and timeless, Velvet Ember is definitely worth trying.",
    stars: 5,
    initial: "N",
  },
  {
    name: "Quashfia Binte Ashfaque",
    role: "Sensual Mirage · Floral Muse",
    review:
      "Truly recommend Hasara Purfums to everyone looking for high quality and long lasting fragrance. Both Sensual Mirage and Floral Muse are absolutely fantastic. The fragrances are definitely a must haves for everyone!!",
    stars: 5,
    initial: "Q",
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
          ))}
        </div>
      </div>
    </section>
  );
}
