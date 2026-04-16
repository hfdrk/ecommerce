"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const defaultClass = "btn-primary w-full sm:w-auto sm:min-w-[220px]";

  return (
    <button
      type="button"
      className={className || defaultClass}
      onClick={() => {
        addItem(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      aria-live="polite"
    >
      {added ? (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Added to cart
        </>
      ) : (
        "Add to cart"
      )}
    </button>
  );
}
