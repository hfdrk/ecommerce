"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "arden-print-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        startTransition(() => setItems(parsed));
      }
    } catch {
      /* ignore corrupt storage */
    }
    startTransition(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === product.id);
      if (i === -1) return [...prev, { product, quantity: qty }];
      const next = [...prev];
      const cur = next[i];
      if (!cur) return prev;
      next[i] = { ...cur, quantity: cur.quantity + qty };
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  }, []);

  const setQuantity = useCallback(
    (productId: string, qty: number) => {
      if (qty < 1) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((x) =>
          x.product.id === productId ? { ...x, quantity: qty } : x,
        ),
      );
    },
    [removeItem],
  );

  const clear = useCallback(() => setItems([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    const itemCount = items.reduce((s, x) => s + x.quantity, 0);
    const subtotal = items.reduce(
      (s, x) => s + x.product.price * x.quantity,
      0,
    );
    return { itemCount, subtotal };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
    }),
    [items, itemCount, subtotal, addItem, removeItem, setQuantity, clear],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
