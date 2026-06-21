"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  ml: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, ml: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  total: 0,
  count: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hasara_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  function save(next: CartItem[]) {
    setItems(next);
    localStorage.setItem("hasara_cart", JSON.stringify(next));
  }

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.findIndex((i) => i.slug === item.slug && i.ml === item.ml);
      let next: CartItem[];
      if (existing >= 0) {
        next = prev; // already in cart, don't duplicate
      } else {
        next = [...prev, item];
      }
      localStorage.setItem("hasara_cart", JSON.stringify(next));
      return next;
    });
  }

  function removeItem(slug: string, ml: number) {
    save(items.filter((i) => !(i.slug === slug && i.ml === ml)));
  }

  function clearCart() {
    save([]);
  }

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const count = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
