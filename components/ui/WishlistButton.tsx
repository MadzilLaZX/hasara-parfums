"use client";

import { Heart } from "@phosphor-icons/react";
import { useWishlist } from "@/context/WishlistContext";

interface Props {
  slug: string;
  className?: string;
}

export default function WishlistButton({ slug, className = "" }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle(slug);
      }}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`transition-all duration-300 cursor-pointer ${className}`}
    >
      <Heart
        size={18}
        weight={wishlisted ? "fill" : "regular"}
        className={wishlisted ? "text-red-400" : "text-champagne-white/40 hover:text-red-400"}
      />
    </button>
  );
}
