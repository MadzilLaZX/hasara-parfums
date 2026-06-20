"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  cover: string;
  gallery: string[];
  name: string;
}

export default function ProductGallery({ cover, gallery, name }: Props) {
  const all = [cover, ...gallery];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
        <Image
          key={active}
          src={all[active]}
          alt={name}
          fill
          priority={active === 0}
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {all.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {all.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-20 overflow-hidden transition-all duration-200 cursor-pointer ${
                active === i
                  ? "ring-1 ring-champagne-gold opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
