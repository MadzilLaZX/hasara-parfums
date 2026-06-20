"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/data/products";
import AnnouncementBar from "@/components/ui/AnnouncementBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/fragrances", label: "Collections" },
    { href: "/about", label: "Our Story" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-matte-black/95 backdrop-blur-md border-b border-champagne-gold/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Hasara Parfums Home">
            <Image
              src="/logo.svg"
              alt="Hasara Parfums"
              width={140}
              height={46}
              className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-champagne-white/80 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300"
            >
              <WhatsappLogo size={14} weight="fill" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-champagne-white hover:text-champagne-gold transition-colors duration-300 cursor-pointer p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-matte-black transition-all duration-500 flex flex-col items-center justify-center gap-10 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-champagne-white text-4xl tracking-widest uppercase hover:text-champagne-gold transition-colors duration-300"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-2 px-8 py-3 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-sm tracking-[0.2em] uppercase font-sans transition-all duration-300 cursor-pointer"
        >
          <WhatsappLogo size={16} weight="fill" />
          Contact on WhatsApp
        </a>
      </div>
    </>
  );
}
