"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const TABS = [
  {
    id: "signature",
    label: "Signature Moments",
    src: "/video/video-lifestyle.mp4",
    cover: "/images/cover-signature.jpg",
    caption: "The Hasara experience in everyday life",
  },
  {
    id: "details",
    label: "Product Details",
    src: "/video/video-don.mp4",
    cover: "/images/cover-product.jpg",
    caption: "A fragrance journey with Don Sumdany",
  },
  {
    id: "experience",
    label: "Customer Experience",
    src: "/video/video-shoumik.mp4",
    cover: "/images/cover-customer.jpg",
    caption: "First impressions with Shoumik Ahmed",
  },
];

export default function VideoShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduce = useReducedMotion();

  function switchTab(idx: number) {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
    setCoverVisible(true);
    setActiveIdx(idx);
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
      // Keep cover hidden — show current frame when paused
    } else {
      v.play().catch(() => {});
      setPlaying(true);
      setCoverVisible(false);
    }
  }

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnd = () => {
      setPlaying(false);
      setCoverVisible(true);
    };
    v.addEventListener("ended", onEnd);
    return () => v.removeEventListener("ended", onEnd);
  }, [activeIdx]);

  const btnTransition = shouldReduce
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

  return (
    <section className="bg-matte-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-sans text-champagne-gold text-xs tracking-[0.45em] uppercase mb-4">
            Real Moments
          </p>
          <h2 className="font-serif text-champagne-white text-4xl lg:text-5xl font-light tracking-wide mb-4">
            Styled In Real Life
          </h2>
          <p className="font-sans text-champagne-white/40 text-sm tracking-wide max-w-md mx-auto leading-relaxed">
            Experience HASARA Parfums through real moments, elegant details, and scent stories.
          </p>
          <div className="w-12 h-px bg-champagne-gold mx-auto mt-8" />
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto no-scrollbar pb-1 px-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => switchTab(i)}
              className={`flex-shrink-0 px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-sans transition-all duration-300 rounded-full border cursor-pointer ${
                i === activeIdx
                  ? "border-champagne-gold bg-champagne-gold text-matte-black font-medium"
                  : "border-champagne-white/15 text-champagne-white/40 hover:border-champagne-gold/50 hover:text-champagne-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video card */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#0a0908]"
              style={{
                border: "1px solid rgba(200,169,107,0.2)",
                boxShadow: "0 0 60px rgba(200,169,107,0.10), 0 0 0 1px rgba(200,169,107,0.08)",
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                src={TABS[activeIdx].src}
                preload="metadata"
                playsInline
                className="w-full aspect-[9/16] object-cover"
              />

              {/* Cover image — fades out when play is pressed, back when tab switches or video ends */}
              <AnimatePresence>
                {coverVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 z-[4]"
                  >
                    <Image
                      src={TABS[activeIdx].cover}
                      alt={TABS[activeIdx].caption}
                      fill
                      className="object-cover"
                      sizes="384px"
                      priority={activeIdx === 0}
                    />
                    {/* Subtle dark overlay so play button is legible */}
                    <div className="absolute inset-0 bg-matte-black/25" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top gradient for button readability when playing */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[6]" />

              {/* Full-area tap-to-pause — only when playing */}
              {playing && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 z-[5] cursor-pointer"
                  aria-label="Pause video"
                />
              )}

              {/* Play / Pause button — animates center ↔ top-left */}
              <motion.button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="absolute z-10 flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid",
                  position: "absolute",
                }}
                animate={
                  playing
                    ? {
                        top: 16,
                        left: 16,
                        width: 40,
                        height: 40,
                        x: 0,
                        y: 0,
                        backgroundColor: "rgba(15,15,15,0.6)",
                        borderColor: "rgba(200,169,107,0.5)",
                      }
                    : {
                        top: "50%",
                        left: "50%",
                        width: 72,
                        height: 72,
                        x: "-50%",
                        y: "-50%",
                        backgroundColor: "rgba(200,169,107,0.18)",
                        borderColor: "rgba(200,169,107,0.75)",
                      }
                }
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                transition={btnTransition}
              >
                <AnimatePresence mode="wait">
                  {playing ? (
                    <motion.span
                      key="pause"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Pause size={14} weight="fill" className="text-champagne-gold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="play"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play size={24} weight="fill" className="text-champagne-gold ml-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`caption-${activeIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="font-sans text-champagne-white/30 text-[11px] tracking-[0.25em] uppercase mt-6 text-center"
            >
              {TABS[activeIdx].caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
