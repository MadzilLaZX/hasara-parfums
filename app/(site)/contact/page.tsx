import type { Metadata } from "next";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Hasara Parfums — order via WhatsApp, reach us on Instagram or Facebook, or drop us an email.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full bg-matte-black">

      {/* Header */}
      <section className="bg-matte-black pt-44 pb-12 px-6 lg:px-12 border-b border-champagne-gold/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">Hasara Parfums</p>
          <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl font-light tracking-wide leading-none">
            Contact Us
          </h1>
          <div className="w-16 h-px bg-champagne-gold mt-8" />
        </div>
      </section>

      {/* Contact details — reuse existing section */}
      <ContactSection />

      <FloatingWhatsApp />
    </main>
  );
}
