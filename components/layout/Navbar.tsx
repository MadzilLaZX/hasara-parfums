"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, X, WhatsappLogo, ShoppingBag, Heart } from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/data/products";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import CartDrawer from "@/components/ui/CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/fragrances", label: "Collections" },
    { href: "/upcoming", label: "Coming Soon" },
    { href: "/about", label: "Our Story" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <header className={`transition-all duration-500 ${scrolled ? "bg-matte-black/95 backdrop-blur-md border-b border-champagne-gold/20" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="Hasara Parfums Home">
              <Image src="/images/logo.png" alt="Hasara Parfums" width={160} height={60} className="opacity-90 hover:opacity-100 transition-opacity duration-300" priority />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-champagne-white/80 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <Link href="/wishlist" aria-label="Wishlist" className="relative w-10 h-10 flex items-center justify-center text-champagne-white/70 hover:text-champagne-gold transition-colors duration-300">
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative w-10 h-10 flex items-center justify-center text-champagne-white/70 hover:text-champagne-gold transition-colors duration-300 cursor-pointer">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-champagne-gold text-matte-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* WhatsApp — desktop only */}
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 px-5 py-2.5 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300 rounded-full">
                <WhatsappLogo size={14} weight="fill" />
                WhatsApp
              </a>

              {/* Mobile menu toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-champagne-white hover:text-champagne-gold transition-colors duration-300 cursor-pointer p-2" aria-label={menuOpen ? "Close menu" : "Open menu"}>
                {menuOpen ? <X size={22} /> : <List size={22} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-matte-black transition-all duration-500 flex flex-col items-center justify-center gap-6 pt-20 pb-28 overflow-y-auto ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((link, i) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="font-serif text-champagne-white text-2xl tracking-widest uppercase hover:text-champagne-gold transition-colors duration-300" style={{ animationDelay: `${i * 80}ms` }}>
            {link.label}
          </Link>
        ))}
        <div className="flex items-center gap-6 mt-2">
          <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-champagne-white/60 hover:text-champagne-gold text-sm tracking-[0.2em] uppercase font-sans transition-colors">
            <Heart size={16} /> Wishlist
          </Link>
          <button onClick={() => { setMenuOpen(false); setCartOpen(true); }} className="flex items-center gap-2 text-champagne-white/60 hover:text-champagne-gold text-sm tracking-[0.2em] uppercase font-sans transition-colors cursor-pointer">
            <ShoppingBag size={16} /> Cart {count > 0 && `(${count})`}
          </button>
        </div>
        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-2 px-8 py-3 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-matte-black text-sm tracking-[0.2em] uppercase font-sans transition-all duration-300 cursor-pointer rounded-full">
          <WhatsappLogo size={16} weight="fill" />
          Contact on WhatsApp
        </a>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
