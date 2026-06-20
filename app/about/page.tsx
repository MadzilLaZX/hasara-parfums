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
            {/* Founder photo */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/founder.png"
                alt="Sardar Md Abid Hasan — Founder, Hasara Parfums"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Text */}
            <div>
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-6">
                Hasara Parfums
              </p>
              <h2 className="font-serif text-primary-text text-4xl lg:text-5xl font-light leading-tight mb-8 tracking-wide">
                A Passion Turned Into Purpose
              </h2>

              <div className="space-y-6 text-secondary-text font-sans text-sm lg:text-base leading-relaxed">
                <p>
                  Some brands begin with market trends. HASARA Parfums began with a lifelong fascination.
                </p>
                <p>
                  Founded in August 2025 in Dhaka, Bangladesh, HASARA was established by Sardar Md Abid Hasan, a young entrepreneur whose passion for fragrance started in childhood. Long before creating the brand, he was captivated by the way a scent could evoke memories, express personality, and inspire confidence. What began as curiosity gradually evolved into a vision: to build a perfume house dedicated to quality, craftsmanship, and trust.
                </p>
              </div>

              {/* Name meaning */}
              <div className="mt-10 mb-10 p-8 border border-champagne-gold/20 bg-champagne-gold/5">
                <p className="font-sans text-champagne-gold text-xs tracking-[0.3em] uppercase mb-4">
                  The Meaning Behind the Name
                </p>
                <p className="font-sans text-secondary-text text-sm leading-relaxed mb-6">
                  The story of HASARA is deeply personal. Rather than being a random brand name, HASARA is derived from the initials of the founder&apos;s closest family members:
                </p>
                <div className="space-y-3">
                  {[
                    { letters: "HA", meaning: "Sardar Md Khaled Bin Hasan, shared with the founder himself" },
                    { letters: "SA", meaning: "His mother, Salma Kabir" },
                    { letters: "RA", meaning: "His younger sister, Bushra Mehnaz" },
                  ].map((item) => (
                    <div key={item.letters} className="flex items-start gap-4">
                      <span className="font-serif text-champagne-gold text-xl font-light w-10 flex-shrink-0">{item.letters}</span>
                      <p className="font-sans text-secondary-text text-sm leading-relaxed">{item.meaning}</p>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-secondary-text text-sm leading-relaxed mt-6 italic">
                  The name serves as a lasting tribute to the family values that continue to inspire the brand&apos;s journey.
                </p>
              </div>

              <div className="space-y-6 text-secondary-text font-sans text-sm lg:text-base leading-relaxed">
                <p>
                  From the very beginning, HASARA has focused on one simple principle: every customer deserves a fragrance they can wear with confidence.
                </p>
                <p>
                  The brand carefully selects quality materials and pays close attention to every stage of creating its collection, with an emphasis on performance, elegance, and consistency. Alongside the fragrances themselves, customer satisfaction and honest service remain central to the HASARA experience.
                </p>
                <p>
                  Rather than overwhelming customers with endless choices, the collection is thoughtfully organized by fragrance notes, seasons, and ideal occasions, making it easier to discover a scent that matches individual preferences and lifestyles.
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
