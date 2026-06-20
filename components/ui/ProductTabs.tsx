"use client";

import { useState } from "react";
import { Sun, Moon, SunHorizon } from "@phosphor-icons/react";
import type { Fragrance } from "@/data/products";

interface Props {
  product: Fragrance;
}

const TABS = ["Description", "Notes", "Accords", "Season", "Inspired By"] as const;
type Tab = typeof TABS[number];

export default function ProductTabs({ product }: Props) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <section className="bg-champagne-white px-6 lg:px-12 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Tab Headers */}
        <div className="flex items-center gap-0 border-b border-stone-200 overflow-x-auto no-scrollbar mb-12">
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

        {/* Tab Content */}
        <div className="max-w-3xl">
          {active === "Description" && (
            <div>
              <p className="font-serif text-primary-text text-3xl lg:text-4xl font-light leading-relaxed mb-8">
                {product.name}
              </p>
              <p className="font-sans text-secondary-text text-base leading-relaxed mb-8">
                {product.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-stone-100">
                {[
                  { label: "Brand", value: "Hasara Parfums" },
                  { label: "Concentration", value: "Extrait de Parfum" },
                  { label: "Gender", value: product.gender },
                  { label: "Longevity", value: product.longevity },
                  { label: "Best For", value: product.occasion.split(",")[0] },
                  { label: "Bottle Sizes", value: "15ml · 30ml · 50ml" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs tracking-[0.2em] uppercase text-secondary-text font-sans mb-1">{spec.label}</p>
                    <p className="font-sans text-primary-text text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "Notes" && (
            <div className="space-y-10">
              <p className="font-sans text-secondary-text text-sm leading-relaxed">
                The fragrance pyramid reveals how a scent evolves over time — from the first impression to the lasting trail.
              </p>
              {[
                { label: "Top Notes", sub: "First impression — 0 to 30 minutes", notes: product.notes.top },
                { label: "Heart Notes", sub: "The soul — 30 minutes to 4 hours", notes: product.notes.heart },
                { label: "Base Notes", sub: "The lasting trail — 4 hours and beyond", notes: product.notes.base },
              ].map((tier) => (
                <div key={tier.label}>
                  <p className="font-serif text-primary-text text-xl mb-1">{tier.label}</p>
                  <p className="text-secondary-text text-xs font-sans tracking-wide mb-4">{tier.sub}</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.notes.map((note) => (
                      <span key={note} className="px-4 py-2 border border-stone-200 text-secondary-text text-xs font-sans tracking-wide rounded-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === "Accords" && (
            <div>
              <p className="font-sans text-secondary-text text-sm leading-relaxed mb-8">
                Main accords describe the overall character and feel of the fragrance.
              </p>
              <div className="flex flex-wrap gap-3">
                {product.mainAccords.map((accord, i) => (
                  <div
                    key={accord}
                    className="flex items-center gap-3 px-5 py-3 border border-stone-200 rounded-sm"
                    style={{ opacity: 1 - i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-champagne-gold" style={{ opacity: 1 - i * 0.2 }} />
                    <span className="font-sans text-primary-text text-sm tracking-wide">{accord}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "Season" && (
            <div>
              <div className="mb-10">
                <p className="text-xs tracking-[0.3em] uppercase text-secondary-text font-sans mb-6">Best Seasons</p>
                <div className="flex flex-wrap gap-3">
                  {["Spring", "Summer", "Fall", "Winter"].map((s) => {
                    const active = product.season.includes(s);
                    return (
                      <div
                        key={s}
                        className={`px-6 py-3 border text-sm font-sans tracking-wide rounded-sm transition-colors ${
                          active
                            ? "border-champagne-gold text-primary-text bg-champagne-gold/5"
                            : "border-stone-100 text-stone-300"
                        }`}
                      >
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-secondary-text font-sans mb-6">When to Wear</p>
                <div className="flex items-center gap-6">
                  {product.dayNight === "Day" && (
                    <div className="flex items-center gap-3 px-6 py-4 border border-champagne-gold rounded-sm bg-champagne-gold/5">
                      <Sun size={20} className="text-champagne-gold" weight="light" />
                      <span className="font-sans text-primary-text text-sm tracking-wide">Day</span>
                    </div>
                  )}
                  {product.dayNight === "Night" && (
                    <div className="flex items-center gap-3 px-6 py-4 border border-champagne-gold rounded-sm bg-champagne-gold/5">
                      <Moon size={20} className="text-champagne-gold" weight="light" />
                      <span className="font-sans text-primary-text text-sm tracking-wide">Night</span>
                    </div>
                  )}
                  {product.dayNight === "Day & Night" && (
                    <>
                      <div className="flex items-center gap-3 px-6 py-4 border border-champagne-gold rounded-sm bg-champagne-gold/5">
                        <Sun size={20} className="text-champagne-gold" weight="light" />
                        <span className="font-sans text-primary-text text-sm tracking-wide">Day</span>
                      </div>
                      <div className="flex items-center gap-3 px-6 py-4 border border-champagne-gold rounded-sm bg-champagne-gold/5">
                        <Moon size={20} className="text-champagne-gold" weight="light" />
                        <span className="font-sans text-primary-text text-sm tracking-wide">Night</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {active === "Inspired By" && (
            <div>
              <p className="font-serif text-primary-text text-3xl font-light mb-6">
                Inspired by{" "}
                <span className="text-champagne-gold italic">{product.inspiredBy}</span>
              </p>
              <p className="font-sans text-secondary-text text-sm leading-relaxed mb-8">
                {product.name} draws its creative spirit from the celebrated fragrance {product.inspiredBy}.
                Rather than an imitation, it is our interpretation — reimagined with our own premium ingredients
                and crafted to offer a similar olfactory experience at an accessible price point.
              </p>
              <div className="p-6 border border-champagne-gold/20 bg-champagne-gold/5 rounded-sm">
                <p className="font-sans text-secondary-text text-xs leading-relaxed">
                  <span className="text-champagne-gold font-medium">Note:</span> All HASARA fragrances are original
                  Extrait de Parfum compositions crafted with premium ingredients. &ldquo;Inspired by&rdquo; indicates
                  a shared olfactory direction — not a copy or counterfeit product.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
