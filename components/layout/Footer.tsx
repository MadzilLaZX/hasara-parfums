import Link from "next/link";
import Image from "next/image";
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { getWhatsAppLink } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-matte-black text-champagne-white" id="contact">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Hasara Parfums"
              width={200}
              height={66}
              className="opacity-80 mb-6"
            />
            <p className="text-champagne-white/50 text-sm leading-relaxed max-w-sm font-sans">
              A luxury fragrance house dedicated to the art of scent. Each bottle
              holds a story of craftsmanship, identity, and presence.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer"
            >
              <WhatsappLogo size={16} weight="fill" />
              Order via WhatsApp
            </a>
          </div>

          {/* Collections */}
          <div>
            <p className="text-champagne-white/40 text-xs tracking-[0.2em] uppercase mb-6 font-sans">
              Collections
            </p>
            <ul className="space-y-3">
              {["Men's Collection", "Women's Collection", "Unisex Collection"].map(
                (col) => (
                  <li key={col}>
                    <Link
                      href="/fragrances"
                      className="text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                    >
                      {col}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-champagne-white/40 text-xs tracking-[0.2em] uppercase mb-6 font-sans">
              Get in Touch
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+8801767067130"
                  className="flex items-center gap-2 text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                >
                  <Phone size={14} />
                  +880 1767-067130
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                >
                  <WhatsappLogo size={14} weight="fill" />
                  WhatsApp Order
                </a>
              </li>
              <li>
                <a
                  href="mailto:hasara.byabidhasan@gmail.com"
                  className="flex items-center gap-2 text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                >
                  <EnvelopeSimple size={14} />
                  hasara.byabidhasan@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hasaraparfums"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                >
                  <InstagramLogo size={14} />
                  @hasaraparfums
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61576921379211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-champagne-white/70 hover:text-champagne-gold text-sm font-sans transition-colors duration-300"
                >
                  <FacebookLogo size={14} />
                  Hasara Parfums
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="border-t border-champagne-gold/20" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-champagne-white/30 text-xs font-sans tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Hasara Parfums. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/hasaraparfums"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="text-champagne-white/40 hover:text-champagne-gold transition-colors duration-300"
          >
            <InstagramLogo size={18} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576921379211"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="text-champagne-white/40 hover:text-champagne-gold transition-colors duration-300"
          >
            <FacebookLogo size={18} />
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="text-champagne-white/40 hover:text-champagne-gold transition-colors duration-300"
          >
            <WhatsappLogo size={18} weight="fill" />
          </a>
        </div>
      </div>

      {/* Velor Signature */}
      <div className="px-8 lg:px-20 py-6">
        <div className="flex items-center gap-8 lg:gap-12">
          <div className="flex-1 h-px bg-champagne-gold/20" />
          <p className="flex-shrink-0 font-sans text-[11px] tracking-[0.22em] text-champagne-white/30 whitespace-nowrap">
            Designed &amp; Developed by{" "}
            <a
              href="https://velordigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne-gold/65 font-semibold tracking-[0.22em] transition-all duration-500 hover:text-champagne-gold velor-link"
            >
              Velor
            </a>
          </p>
          <div className="flex-1 h-px bg-champagne-gold/20" />
        </div>
      </div>

      <style>{`
        .velor-link:hover {
          text-shadow: 0 0 14px rgba(212, 175, 55, 0.55), 0 0 28px rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </footer>
  );
}
