"use client";

const MESSAGE = "✨    10% OFF TODAY ONLY    •    USE CODE HASARA10    •    LIMITED TIME OFFER    ✨";
const REPEATED = Array(8).fill(MESSAGE).join("          ");

export default function AnnouncementBar() {
  return (
    <div className="bg-matte-black border-b border-champagne-gold/20 overflow-hidden py-2.5 z-50 relative">
      <div className="flex whitespace-nowrap announcement-marquee">
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-champagne-gold/90 pr-16">
          {REPEATED}
        </span>
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-champagne-gold/90 pr-16" aria-hidden>
          {REPEATED}
        </span>
      </div>
      <style>{`
        .announcement-marquee {
          animation: marquee 40s linear infinite;
        }
        .announcement-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
