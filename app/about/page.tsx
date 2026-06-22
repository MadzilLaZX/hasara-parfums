import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Our Story | Hasara Parfums",
  description: "Meet the founder of Hasara Parfums — Sardar Md Abid Hasan. A passion turned into purpose.",
};

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-matte-black pt-44 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">
            Meet The Founder
          </p>
          <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide leading-none">
            Our Story
          </h1>
          <div className="w-16 h-px bg-champagne-gold mt-8" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-champagne-white py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Founder photo — taller, centered so full figure shows */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ minHeight: "600px", height: "70vh", maxHeight: "800px" }}>
              <Image
                src="/images/founder.png"
                alt="Sardar Md Abid Hasan — Founder, Hasara Parfums"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Text */}
            <div className="lg:pt-4">
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-6">
                Hasara Parfums
              </p>
              <h2 className="font-serif text-primary-text text-4xl lg:text-5xl font-light leading-tight mb-8 tracking-wide">
                A Passion Turned Into Purpose
              </h2>

              <div className="space-y-5 mb-10">
                <p className="font-serif text-primary-text/80 text-lg lg:text-xl italic leading-relaxed">
                  Some brands begin with market trends. HASARA Parfums began with a lifelong fascination.
                </p>
                <p className="font-sans text-secondary-text text-sm lg:text-base leading-relaxed">
                  Founded in August 2025 in Dhaka, Bangladesh, HASARA was established by Sardar Md Abid Hasan — a young entrepreneur whose passion for fragrance started in childhood. Long before creating the brand, he was captivated by the way a scent could evoke memories, express personality, and inspire confidence.
                </p>
                <p className="font-sans text-secondary-text text-sm lg:text-base leading-relaxed">
                  What began as curiosity gradually evolved into a vision: to build a perfume house dedicated to quality, craftsmanship, and trust.
                </p>
              </div>

              {/* Name meaning — dark, fancy, rounded */}
              <div className="mb-10 p-8 bg-matte-black rounded-2xl border border-champagne-gold/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
                <p className="font-sans text-champagne-gold text-xs tracking-[0.35em] uppercase mb-5">
                  ✦ The Meaning Behind The Name ✦
                </p>
                <p className="font-serif text-champagne-white/70 text-sm leading-relaxed mb-6 italic">
                  HASARA is not just a name — it is a tribute. Each letter carries the initials of those closest to the founder:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { letters: "HA", meaning: "Sardar Md Khaled Bin Hasan — shared with the founder himself" },
                    { letters: "SA", meaning: "Salma Kabir — his mother" },
                    { letters: "RA", meaning: "Bushra Mehnaz — his younger sister" },
                  ].map((item) => (
                    <div key={item.letters} className="flex items-center gap-5 border-b border-champagne-gold/10 pb-4 last:border-0 last:pb-0">
                      <span className="font-serif text-champagne-gold text-2xl font-light w-12 flex-shrink-0 tracking-widest">{item.letters}</span>
                      <p className="font-sans text-champagne-white/60 text-sm leading-relaxed">{item.meaning}</p>
                    </div>
                  ))}
                </div>
                <p className="font-serif text-champagne-gold/60 text-sm italic text-center">
                  &ldquo;A name born from love, built for legacy.&rdquo;
                </p>
              </div>

              <div className="space-y-5">
                <p className="font-sans text-secondary-text text-sm lg:text-base leading-relaxed">
                  From the very beginning, HASARA has focused on one simple principle: every customer deserves a fragrance they can wear with confidence.
                </p>
                <p className="font-sans text-secondary-text text-sm lg:text-base leading-relaxed">
                  The brand carefully curates quality materials with an emphasis on performance, elegance, and consistency — because at HASARA, a fragrance is more than a scent. It is an experience, a statement, and a memory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-matte-black py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "2025", label: "Founded" },
              { value: "11", label: "Fragrances" },
              { value: "40%", label: "Concentration" },
              { value: "8+", label: "Hours Longevity" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-champagne-gold text-4xl lg:text-5xl font-light mb-2">{stat.value}</p>
                <p className="font-sans text-champagne-white/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
