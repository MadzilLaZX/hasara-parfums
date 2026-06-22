"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { InstagramLogo } from "@phosphor-icons/react";

const galleryImages = [
  { seed: "perfume-bottle-gold-luxury", label: "Oud Royale" },
  { seed: "fragrance-dark-editorial", label: "Noir Intenso" },
  { seed: "rose-perfume-feminine", label: "Rose Elixir" },
  { seed: "amber-spice-bottle", label: "Amber Mystique" },
  { seed: "luxury-perfume-lifestyle", label: "Gold Essence" },
  { seed: "white-floral-perfume", label: "White Magnolia" },
];

export default function InstagramGallery() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-champagne-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <a
            href="https://www.instagram.com/hasaraparfums"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary-text hover:text-champagne-gold transition-colors duration-300 cursor-pointer"
          >
            <InstagramLogo size={18} />
            <span className="font-sans text-xs tracking-[0.3em] uppercase">
              @hasaraparfums
            </span>
          </a>
          <p className="font-serif text-primary-text text-4xl lg:text-5xl font-light tracking-wide mt-4">
            Follow Our World
          </p>
          <div className="w-16 h-px bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <motion.a
              key={img.seed}
              href="https://www.instagram.com/hasaraparfums"
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-square overflow-hidden bg-stone-100 cursor-pointer rounded-2xl"
            >
              <Image
                src={`https://picsum.photos/seed/${img.seed}/600/600`}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-matte-black/0 group-hover:bg-matte-black/50 transition-colors duration-400 flex items-center justify-center">
                <InstagramLogo
                  size={28}
                  className="text-champagne-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/hasaraparfums"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary-text text-primary-text hover:bg-primary-text hover:text-champagne-white text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 cursor-pointer rounded-full"
          >
            <InstagramLogo size={14} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
