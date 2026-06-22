"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react";
import { getWhatsAppLink } from "@/data/products";

const contactItems = [
  {
    Icon: Phone,
    label: "Phone",
    value: "+880 1767-067130",
    href: "tel:+8801767067130",
  },
  {
    Icon: WhatsappLogo,
    iconWeight: "fill" as const,
    label: "WhatsApp",
    value: "Order via WhatsApp",
    href: getWhatsAppLink(),
    external: true,
  },
  {
    Icon: EnvelopeSimple,
    label: "Email",
    value: "hasara.byabidhasan@gmail.com",
    href: "mailto:hasara.byabidhasan@gmail.com",
  },
  {
    Icon: InstagramLogo,
    label: "Instagram",
    value: "@hasaraparfums",
    href: "https://www.instagram.com/hasaraparfums",
    external: true,
  },
  {
    Icon: FacebookLogo,
    label: "Facebook",
    value: "Hasara Parfums",
    href: "https://www.facebook.com/profile.php?id=61576921379211",
    external: true,
  },
];

export default function ContactSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-matte-black py-24 lg:py-36 px-6 lg:px-12" id="reach-us">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-champagne-gold text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-none mb-8">
              Let's Connect
            </p>
            <p className="text-champagne-white/55 font-sans text-sm lg:text-base leading-relaxed max-w-md mb-10">
              We are available on WhatsApp for personalised fragrance
              consultations, orders, gifting advice, and any questions you may
              have about our collections.
            </p>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-sm tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer rounded-full"
            >
              <WhatsappLogo size={18} weight="fill" />
              Order via WhatsApp
            </a>
          </motion.div>

          {/* Right - Contact Details */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            {contactItems.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={shouldReduce ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-5 p-5 border-b border-champagne-gold/10 hover:border-champagne-gold/40 hover:bg-champagne-gold/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 border border-champagne-gold/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-champagne-gold group-hover:border-champagne-gold transition-all duration-300">
                    <Icon
                      size={16}
                      weight={item.iconWeight ?? "regular"}
                      className="text-champagne-gold group-hover:text-matte-black transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-champagne-white/40 text-xs tracking-[0.2em] uppercase font-sans mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-champagne-white text-sm font-sans group-hover:text-champagne-gold transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
