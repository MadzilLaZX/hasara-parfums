"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  ml: number;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string, ml: number) => void;
  updateQuantity: (slug: string, ml: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
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

  function persist(next: CartItem[]) {
    setItems(next);
    localStorage.setItem("hasara_cart", JSON.stringify(next));
  }

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === item.slug && i.ml === item.ml);
      const next =
        idx >= 0
          ? prev.map((i, index) => (index === idx ? { ...i, quantity: i.quantity + 1 } : i))
          : [...prev, { ...item, quantity: 1 }];
      localStorage.setItem("hasara_cart", JSON.stringify(next));
      return next;
    });
  }

  function updateQuantity(slug: string, ml: number, quantity: number) {
    setItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((i) => !(i.slug === slug && i.ml === ml))
          : prev.map((i) => (i.slug === slug && i.ml === ml ? { ...i, quantity } : i));
      localStorage.setItem("hasara_cart", JSON.stringify(next));
      return next;
    });
  }

  function removeItem(slug: string, ml: number) {
    persist(items.filter((i) => !(i.slug === slug && i.ml === ml)));
  }

  function clearCart() {
    persist([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
