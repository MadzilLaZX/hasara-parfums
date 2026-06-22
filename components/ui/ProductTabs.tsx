"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Clock, Star, MapPin } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { Fragrance } from "@/data/products";
import { fragranceExtras } from "@/data/fragranceExtras";

const TABS = ["Story", "Notes", "Accords", "Wearability", "Inspired By"] as const;
type Tab = (typeof TABS)[number];

function AccordBar({ accord, intensity, index }: { accord: string; intensity: number; index: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(intensity), index * 140 + 80);
    return () => clearTimeout(t);
  }, [intensity, index]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-sans text-primary-text text-sm tracking-wide">{accord}</span>
        <span className="font-serif text-champagne-gold text-base font-light">{intensity}%</span>
      </div>
      <div className="h-0.5 bg-stone-100 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-champagne-gold/50 to-champagne-gold rounded-full"
          style={{
            width: `${width}%`,
            transition: `width 1.1s cubic-bezier(0.16,1,0.3,1)`,
          }}
        />
      </div>
    </div>
  );
}

function SeasonBar({ season, active }: { season: string; active: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setWidth(100), 80);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="flex items-center gap-4">
      <span className={`font-sans text-xs tracking-[0.15em] uppercase w-16 flex-shrink-0 ${active ? "text-primary-text" : "text-stone-300"}`}>{season}</span>
      <div className="flex-1 h-0.5 bg-stone-100 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-champagne-gold rounded-full"
          style={{
            width: `${width}%`,
            transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span className={`font-sans text-[10px] tracking-wider w-20 text-right flex-shrink-0 ${active ? "text-champagne-gold" : "text-stone-300"}`}>
        {active ? "Recommended" : "Not Ideal"}
      </span>
    </div>
  );
}

function LongevityBar({ longevity }: { longevity: string }) {
  const target = longevity.includes("12+") ? 95 : longevity.includes("10-12") ? 80 : longevity.includes("8-10") ? 65 : 50;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(target), 80);
    return () => clearTimeout(t);
  }, [target]);

  return (
    <div className="flex-1 h-0.5 bg-stone-100 relative overflow-hidden rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-champagne-gold rounded-full"
        style={{ width: `${width}%`, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </div>
  );
}

export default function ProductTabs({ product }: { product: Fragrance }) {
  const [active, setActive] = useState<Tab>("Story");
  const extras = fragranceExtras[product.slug];

  const occasionTags = product.occasion.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="bg-champagne-white px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Tab headers */}
        <div className="flex items-center gap-0 border-b border-stone-200 overflow-x-auto no-scrollbar mb-14">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-shrink-0 px-6 py-4 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 border-b-2 -mb-px cursor-pointer ${
                active === tab
                  ? "border-champagne-gold text-primary-text"
                  : "border-transparent text-secondary-text hover:text-primary-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── STORY ─────────────────────────────────────────────── */}
        {active === "Story" && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">
            <div>
              <p className="font-serif text-primary-text text-3xl lg:text-4xl font-light leading-relaxed mb-6">
                {product.name}
              </p>
              <p className="font-sans text-secondary-text text-base leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Personality */}
              {extras?.personality && (
                <div className="mb-10">
                  <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-4">Fragrance Personality</p>
                  <div className="flex flex-wrap gap-2">
                    {extras.personality.map((trait, i) => (
                      <span
                        key={trait}
                        className="px-4 py-2 font-sans text-xs tracking-[0.2em] uppercase border rounded-full transition-all duration-300"
                        style={{
                          borderColor: `rgba(212,175,55,${0.8 - i * 0.2})`,
                          color: `rgba(30,26,20,${0.85 - i * 0.15})`,
                          backgroundColor: `rgba(212,175,55,${0.04 + i * 0.01})`,
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Occasions */}
              {occasionTags.length > 0 && (
                <div className="mb-10">
                  <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-4">
                    <MapPin size={11} className="inline mr-1.5 -mt-0.5" />
                    Perfect Occasions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {occasionTags.map((occ) => (
                      <span key={occ} className="px-4 py-2 border border-stone-200 text-secondary-text text-xs font-sans tracking-wide rounded-full">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 pt-8 border-t border-stone-100">
                {[
                  { label: "Brand", value: "Hasara Parfums" },
                  { label: "Concentration", value: "Extrait de Parfum" },
                  { label: "Gender", value: product.gender },
                  { label: "Longevity", value: product.longevity },
                  { label: "Best For", value: occasionTags[0] ?? "All occasions" },
                  { label: "Bottle Sizes", value: "15ml · 30ml · 50ml" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-secondary-text font-sans mb-1.5">{spec.label}</p>
                    <p className="font-sans text-primary-text text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: quick accord preview */}
            {extras && (
              <div className="lg:border-l lg:border-stone-100 lg:pl-12">
                <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-6">Character Profile</p>
                <div className="space-y-5">
                  {extras.accordIntensities.map(([accord, intensity], i) => (
                    <AccordBar key={accord} accord={accord} intensity={intensity} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── NOTES (Pyramid) ───────────────────────────────────── */}
        {active === "Notes" && (
          <div className="max-w-3xl">
            <p className="font-sans text-secondary-text text-sm leading-relaxed mb-12">
              The fragrance pyramid reveals how a scent evolves — from the bright opening to the enduring base that defines your lasting impression.
            </p>

            <div className="space-y-0">
              {[
                {
                  label: "Top Notes",
                  sub: "First impression · 0 – 30 minutes",
                  notes: product.notes.top,
                  width: "60%",
                  icon: "◆",
                  desc: "The initial burst — bright, volatile, and immediate.",
                },
                {
                  label: "Heart Notes",
                  sub: "The soul · 30 minutes – 4 hours",
                  notes: product.notes.heart,
                  width: "80%",
                  icon: "◆◆",
                  desc: "The true character of the fragrance emerges here.",
                },
                {
                  label: "Base Notes",
                  sub: "The lasting trail · 4+ hours",
                  notes: product.notes.base,
                  width: "100%",
                  icon: "◆◆◆",
                  desc: "Deep, rich, and enduring — the memory that lingers.",
                },
              ].map((tier, i) => (
                <motion.div
                  key={tier.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                  style={{ marginLeft: i === 0 ? "20%" : i === 1 ? "10%" : "0%" }}
                >
                  {/* Connector line */}
                  {i > 0 && (
                    <div className="absolute -top-0 left-8 w-px h-6 bg-champagne-gold/20" />
                  )}
                  <div className={`border-l-2 pl-6 py-6 ${i === 0 ? "border-champagne-gold" : i === 1 ? "border-champagne-gold/60" : "border-champagne-gold/30"}`}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <p className="font-serif text-primary-text text-xl mb-0.5">{tier.label}</p>
                        <p className="text-secondary-text text-xs font-sans tracking-wide mb-1">{tier.sub}</p>
                        <p className="text-secondary-text text-xs font-sans italic mb-4">{tier.desc}</p>
                      </div>
                      <span className="font-sans text-champagne-gold/40 text-[10px] tracking-widest flex-shrink-0 mt-1">{tier.icon}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tier.notes.map((note) => (
                        <span key={note} className={`px-4 py-2 text-xs font-sans tracking-wide rounded-full border ${i === 0 ? "border-champagne-gold/40 text-primary-text bg-champagne-gold/5" : i === 1 ? "border-stone-200 text-primary-text" : "border-stone-100 text-secondary-text"}`}>
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACCORDS ───────────────────────────────────────────── */}
        {active === "Accords" && (
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
            <div>
              <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-2">Accord Intensity</p>
              <p className="font-sans text-secondary-text text-sm leading-relaxed mb-10">
                The dominant olfactory characters that define this fragrance&apos;s identity, ranked by presence and intensity.
              </p>

              <div className="space-y-7">
                {extras
                  ? extras.accordIntensities.map(([accord, intensity], i) => (
                      <AccordBar key={accord} accord={accord} intensity={intensity} index={i} />
                    ))
                  : product.mainAccords.map((accord, i) => (
                      <AccordBar key={accord} accord={accord} intensity={88 - i * 16} index={i} />
                    ))}
              </div>
            </div>

            <div className="lg:border-l lg:border-stone-100 lg:pl-12">
              {/* Personality */}
              {extras?.personality && (
                <div className="mb-10">
                  <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-5">Fragrance Personality</p>
                  <div className="space-y-3">
                    {extras.personality.map((trait, i) => (
                      <motion.div
                        key={trait}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-1 h-1 rounded-full bg-champagne-gold flex-shrink-0" style={{ opacity: 1 - i * 0.25 }} />
                        <span className="font-serif text-primary-text text-xl font-light">{trait}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* How it wears */}
              <div className="p-5 border border-stone-100 bg-stone-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={11} className="text-champagne-gold" weight="fill" />
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary-text">Character Summary</p>
                </div>
                <p className="font-serif text-primary-text text-lg font-light leading-relaxed italic">
                  &ldquo;{product.shortDescription}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── WEARABILITY ───────────────────────────────────────── */}
        {active === "Wearability" && (
          <div className="max-w-3xl">
            {/* Season bars */}
            <div className="mb-14">
              <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-8">Season Suitability</p>
              <div className="space-y-6">
                {["Spring", "Summer", "Fall", "Winter"].map((s) => (
                  <SeasonBar key={s} season={s} active={product.season.includes(s)} />
                ))}
              </div>
            </div>

            {/* Day / Night */}
            <div className="mb-14">
              <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-6">Time of Day</p>
              <div className="flex gap-4">
                {[
                  { label: "Day", icon: <Sun size={20} weight="light" />, active: product.dayNight === "Day" || product.dayNight === "Day & Night" },
                  { label: "Night", icon: <Moon size={20} weight="light" />, active: product.dayNight === "Night" || product.dayNight === "Day & Night" },
                ].map(({ label, icon, active }) => (
                  <div
                    key={label}
                    className={`flex-1 flex flex-col items-center gap-3 py-8 border rounded-2xl transition-colors ${active ? "border-champagne-gold bg-champagne-gold/5" : "border-stone-100 opacity-30"}`}
                  >
                    <span className={active ? "text-champagne-gold" : "text-stone-300"}>{icon}</span>
                    <span className="font-sans text-sm tracking-[0.2em] uppercase text-primary-text">{label}</span>
                    {active && <span className="font-sans text-[10px] tracking-wider text-champagne-gold uppercase">Recommended</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Longevity */}
            <div className="mb-10">
              <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-4">
                <Clock size={11} className="inline mr-1.5 -mt-0.5" />
                Longevity
              </p>
              <div className="flex items-center gap-5">
                <span className="font-serif text-primary-text text-2xl font-light flex-shrink-0">{product.longevity}</span>
                <LongevityBar longevity={product.longevity} />
              </div>
              <p className="font-sans text-secondary-text text-xs mt-2 tracking-wide">Extrait de Parfum concentration for maximum longevity</p>
            </div>

            {/* Occasions */}
            <div>
              <p className="font-sans text-secondary-text text-[10px] tracking-[0.4em] uppercase mb-4">
                <MapPin size={11} className="inline mr-1.5 -mt-0.5" />
                Occasions
              </p>
              <div className="flex flex-wrap gap-2">
                {occasionTags.map((occ) => (
                  <span key={occ} className="px-4 py-2 border border-stone-200 text-secondary-text text-xs font-sans tracking-wide rounded-full">{occ}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── INSPIRED BY ───────────────────────────────────────── */}
        {active === "Inspired By" && (
          <div className="max-w-3xl">
            {/* Large prominent header */}
            <div className="mb-10 pb-10 border-b border-stone-100">
              <p className="font-sans text-champagne-gold text-[10px] tracking-[0.5em] uppercase mb-4">Creative Direction</p>
              <p className="font-serif text-primary-text text-4xl lg:text-5xl font-light leading-tight mb-2">
                Inspired by
              </p>
              <p className="font-serif text-champagne-gold text-4xl lg:text-5xl font-light italic leading-tight">
                {product.inspiredBy}
              </p>
            </div>

            <p className="font-sans text-secondary-text text-base leading-relaxed mb-8">
              {product.name} draws its creative spirit from the celebrated fragrance{" "}
              <span className="text-primary-text font-medium">{product.inspiredBy}</span>.
              Rather than an imitation, it is our own interpretation — reimagined with premium ingredients
              and crafted to offer a similar olfactory journey at an accessible price point, without compromise on quality.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "What they share", value: "The same olfactory direction and emotional resonance" },
                { label: "What makes ours unique", value: "Premium ingredients, original formulation, accessible price" },
                { label: "Concentration", value: "Extrait de Parfum — often stronger than the original" },
                { label: "Our guarantee", value: "Original composition, not a counterfeit" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 border border-stone-100 rounded-xl">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary-text mb-1.5">{label}</p>
                  <p className="font-sans text-primary-text text-sm leading-snug">{value}</p>
                </div>
              ))}
            </div>

            <div className="p-5 border border-champagne-gold/25 bg-champagne-gold/4 rounded-xl">
              <p className="font-sans text-secondary-text text-xs leading-relaxed">
                <span className="text-champagne-gold font-medium">Note:</span> All HASARA fragrances are original
                Extrait de Parfum compositions crafted with premium ingredients. &ldquo;Inspired by&rdquo; indicates
                a shared olfactory direction — not a copy or counterfeit product. We celebrate the artistry of the
                originals while offering our own distinct interpretation.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
