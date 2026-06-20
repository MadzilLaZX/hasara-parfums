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
  const scratchedPixels = useRef(0);
  const totalPixels = useRef(0);

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

    const W = canvas.width;
    const H = canvas.height;
    totalPixels.current = W * H;

    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(212,175,55,0.15)";
    for (let i = 0; i < 40; i++) {
      ctx.fillRect(Math.random() * W, Math.random() * H, Math.random() * 3 + 1, 1);
    }

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.font = "bold 11px sans-serif";
    ctx.letterSpacing = "3px";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", W / 2, H / 2 - 8);
    ctx.fillText("YOUR OFFER", W / 2, H / 2 + 10);
  }, [visible, scratched]);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function scratch(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current || scratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    if (cleared / totalPixels.current > 0.55) {
      setScratched(true);
    }
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
          style={{ background: "rgba(15,15,15,0.85)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#111] border border-champagne-gold/20 w-full max-w-sm"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-champagne-white/40 hover:text-champagne-white transition-colors z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="px-8 pt-10 pb-6 text-center border-b border-champagne-gold/10">
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-2">
                Exclusive Offer
              </p>
              <p className="font-serif text-champagne-white text-3xl font-light tracking-wide">
                A Gift For You
              </p>
              <p className="font-sans text-champagne-white/50 text-xs mt-2 tracking-wide">
                Scratch below to reveal your discount
              </p>
            </div>

            {/* Reveal area */}
            <div className="px-8 py-8">
              <div className="relative rounded-sm overflow-hidden">
                {/* Revealed content underneath */}
                <div className="bg-champagne-gold/10 border border-champagne-gold/30 p-8 text-center">
                  <p className="font-sans text-champagne-white/60 text-xs tracking-[0.3em] uppercase mb-2">
                    You&apos;ve unlocked
                  </p>
                  <p className="font-serif text-champagne-gold text-6xl font-light mb-1">10%</p>
                  <p className="font-sans text-champagne-white text-sm tracking-wider mb-4">OFF YOUR ORDER</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="border border-dashed border-champagne-gold/50 px-5 py-2.5">
                      <span className="font-sans text-champagne-gold text-lg font-medium tracking-[0.3em]">
                        {DISCOUNT_CODE}
                      </span>
                    </div>
                    <button
                      onClick={copyCode}
                      className="text-champagne-gold/70 hover:text-champagne-gold transition-colors cursor-pointer"
                    >
                      {copied ? <CheckCircle size={20} weight="fill" /> : <CopySimple size={20} />}
                    </button>
                  </div>
                  {copied && (
                    <p className="font-sans text-champagne-gold/70 text-xs mt-2 tracking-wider">Copied!</p>
                  )}
                </div>

                {/* Scratch overlay canvas */}
                {!scratched && (
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={200}
                    className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                    onMouseDown={() => { isDrawing.current = true; }}
                    onMouseUp={() => { isDrawing.current = false; }}
                    onMouseLeave={() => { isDrawing.current = false; }}
                    onMouseMove={scratch}
                    onTouchStart={() => { isDrawing.current = true; }}
                    onTouchEnd={() => { isDrawing.current = false; }}
                    onTouchMove={scratch}
                  />
                )}
              </div>

              {scratched && (
                <div className="mt-6 text-center">
                  <p className="font-sans text-champagne-white/40 text-xs tracking-wide mb-4">
                    Use code at checkout via WhatsApp. Valid today only.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-champagne-gold text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-champagne-gold/90 transition-colors rounded-sm cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
