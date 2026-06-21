"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface WishlistContextType {
  items: string[];
  toggle: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  clearAll: () => void;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  toggle: () => {},
  isWishlisted: () => false,
  clearAll: () => {},
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hasara_wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  function toggle(slug: string) {
    setItems((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("hasara_wishlist", JSON.stringify(next));
      return next;
    });
  }

  function isWishlisted(slug: string) {
    return items.includes(slug);
  }

  function clearAll() {
    setItems([]);
    localStorage.removeItem("hasara_wishlist");
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, clearAll }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
