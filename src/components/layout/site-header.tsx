"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { mainNav } from "@/lib/navigation";
import { useCart } from "@/context/cart-context";

function navItemActive(
  pathname: string,
  href: string,
  category: string | null,
  label: string,
): boolean {
  if (label === "About") return pathname === "/about";
  if (label === "Contact") return pathname === "/contact";
  if (label === "Shop")
    return pathname.startsWith("/shop") && !category;
  if (href.includes("category=")) {
    const u = new URL(href, "https://example.com");
    const want = u.searchParams.get("category");
    return pathname.startsWith("/shop") && category === want;
  }
  return false;
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 8V6a3 3 0 116 0v2M5 8h14l-1.2 12.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9L5 8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = useMemo(
    () => (href: string, label: string) =>
      navItemActive(pathname, href, category, label),
    [pathname, category],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] shadow-[var(--shadow-sm)] backdrop-blur-md supports-[backdrop-filter]:bg-[var(--surface)]/85">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-90"
        aria-hidden
      />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-8">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 flex-col"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-[var(--ink)] transition group-hover:text-[var(--accent)] sm:text-[1.125rem]">
              Arden&apos;s Print
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-muted)] sm:block">
              DTF · Blanks · POD
            </span>
          </Link>
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {mainNav.map((item) => {
              const active = isActive(item.href, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "rounded-full bg-[color-mix(in_oklab,var(--accent)_11%,var(--muted-bg))] px-3.5 py-2 text-xs font-semibold text-[var(--accent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_22%,transparent)]"
                      : "rounded-full px-3.5 py-2 text-xs font-semibold text-[var(--muted-foreground)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--ink)]"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_15%,var(--border))] bg-[var(--surface-2)] px-4 text-xs font-semibold text-[var(--accent)] shadow-[var(--shadow-sm)] transition hover:border-[color-mix(in_oklab,var(--accent)_35%,var(--border))] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[5px] h-0.5 w-full rounded-full bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-[10px] h-0.5 w-full rounded-full bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`border-t border-[var(--border)] bg-[var(--surface)] md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3" aria-label="Mobile">
          <ul className="flex flex-col divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-md)]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)] active:bg-[var(--accent-subtle)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
