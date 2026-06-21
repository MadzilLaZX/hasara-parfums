"use client";

import { useEffect, useRef, useState } from "react";
import { X, CopySimple, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const DISCOUNT_CODE = "HASARA10";
const SESSION_KEY = "hasara_scratch_seen";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || scratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#1a1208";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Gold shimmer lines
    ctx.fillStyle = "rgba(212,175,55,0.25)";
    for (let i = 0; i < 60; i++) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 60 + 10, 1);
    }
    ctx.fillStyle = "rgba(212,175,55,0.5)";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  SCRATCH TO REVEAL  ✦", canvas.width / 2, canvas.height / 2 - 6);
    ctx.fillStyle = "rgba(212,175,55,0.3)";
    ctx.font = "10px sans-serif";
    ctx.fillText("YOUR EXCLUSIVE OFFER", canvas.width / 2, canvas.height / 2 + 12);
  }, [visible, scratched]);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function scratch(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current || scratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    // Large brush = easy scratch
    ctx.beginPath();
    ctx.arc(x, y, 55, 0, Math.PI * 2);
    ctx.fill();
    // Check after every stroke — low threshold means 1-2 swipes reveals it
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    if (cleared / (canvas.width * canvas.height) > 0.18) {
      setScratched(true);
    }
  }

  function revealNow() {
    setScratched(true);
  }

  function handleClose() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(15,15,15,0.88)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#0f0d08] border border-champagne-gold/30 w-full max-w-sm rounded-2xl overflow-hidden"
          >
            {/* Gold top line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />

            {/* Close */}
            <button onClick={handleClose} className="absolute top-4 right-4 text-champagne-white/30 hover:text-champagne-white transition-colors z-10 cursor-pointer">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-5 text-center">
              <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-2">Exclusive Offer</p>
              <p className="font-serif text-champagne-white text-3xl font-light tracking-wide">A Gift For You</p>
            </div>

            {/* Reveal area */}
            <div className="px-8 pb-2">
              <div className="relative rounded-xl overflow-hidden">
                {/* Revealed content */}
                <div className="bg-champagne-gold/8 border border-champagne-gold/20 p-7 text-center rounded-xl">
                  <p className="font-sans text-champagne-white/50 text-[10px] tracking-[0.4em] uppercase mb-2">You&apos;ve unlocked</p>
                  <p className="font-serif text-champagne-gold text-7xl font-light leading-none mb-1">10%</p>
                  <p className="font-sans text-champagne-white text-xs tracking-[0.3em] mb-5">OFF YOUR ORDER</p>
                  {/* Code box with one-click copy */}
                  <button
                    onClick={copyCode}
                    className="w-full flex items-center justify-between gap-3 border border-dashed border-champagne-gold/60 px-5 py-3 rounded-lg hover:border-champagne-gold transition-colors cursor-pointer group"
                  >
                    <span className="font-sans text-champagne-gold text-base font-semibold tracking-[0.35em]">
                      {DISCOUNT_CODE}
                    </span>
                    <span className="text-champagne-gold/60 group-hover:text-champagne-gold transition-colors">
                      {copied ? <CheckCircle size={18} weight="fill" className="text-green-400" /> : <CopySimple size={18} />}
                    </span>
                  </button>
                  {copied && <p className="font-sans text-green-400 text-xs mt-2 tracking-wider">✓ Copied to clipboard!</p>}
                </div>

                {/* Scratch overlay */}
                {!scratched && (
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={200}
                    className="absolute inset-0 w-full h-full cursor-crosshair touch-none rounded-xl"
                    onMouseDown={() => { isDrawing.current = true; }}
                    onMouseUp={() => { isDrawing.current = false; }}
                    onMouseLeave={() => { isDrawing.current = false; }}
                    onMouseMove={scratch}
                    onTouchStart={(e) => { e.preventDefault(); isDrawing.current = true; }}
                    onTouchEnd={() => { isDrawing.current = false; }}
                    onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
                  />
                )}
              </div>

              {/* Tap to reveal shortcut */}
              {!scratched && (
                <button onClick={revealNow} className="w-full mt-3 text-champagne-gold/35 hover:text-champagne-gold/70 text-[10px] tracking-[0.25em] uppercase font-sans transition-colors cursor-pointer text-center">
                  Tap here to reveal instantly
                </button>
              )}
            </div>

            {/* CTA after reveal */}
            <div className="px-8 pb-8 pt-4">
              {scratched && (
                <p className="font-sans text-champagne-white/30 text-xs tracking-wide text-center mb-3">
                  Use code at checkout. Valid today only.
                </p>
              )}
              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-champagne-gold text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-semibold hover:bg-champagne-gold/90 transition-colors rounded-full cursor-pointer"
              >
                Shop Now
              </button>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
