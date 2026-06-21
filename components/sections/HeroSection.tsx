"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/imperial-royale.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-matte-black/70 via-matte-black/50 to-matte-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-matte-black/30 via-transparent to-matte-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10"
        >
          {/* Real logo PNG */}
          <Image
            src="/images/logo.png"
            alt="Hasara Parfums"
            width={420}
            height={140}
            className="mx-auto w-56 sm:w-72 lg:w-96 xl:w-[420px]"
            priority
          />
        </motion.div>

        {/* Big tagline — main hero text */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-serif text-champagne-gold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl italic tracking-wide leading-tight mb-12"
        >
          Every Scent Tells A Story
        </motion.p>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/fragrances"
            className="px-10 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 min-w-[200px] text-center rounded-full"
          >
            Shop Collection
          </Link>
          <Link
            href="/fragrances"
            className="flex items-center justify-center gap-2 px-10 py-4 border border-champagne-white text-champagne-white hover:border-champagne-gold hover:text-champagne-gold text-xs tracking-[0.25em] uppercase font-sans transition-all duration-300 min-w-[200px] rounded-full"
          >
            Explore by Occasion
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-champagne-gold to-transparent" />
        <ArrowDown size={14} className="text-champagne-gold animate-bounce" />
      </motion.div>
    </section>
  );
}
