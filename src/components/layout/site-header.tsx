"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
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
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/";

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isActive = useMemo(
    () => (href: string, label: string) =>
      navItemActive(pathname, href, category, label),
    [pathname, category],
  );

  const isTransparent = isHomePage && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/95 border-b border-[var(--border)] shadow-[var(--shadow-sm)] backdrop-blur-lg"
      }`}
    >
      {/* Accent top line */}
      <div
        className={`h-[2px] w-full transition-opacity duration-300 ${
          isTransparent ? "opacity-0" : "opacity-100"
        } bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-[var(--accent)]`}
        aria-hidden
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
        {/* Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-10">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 flex-col"
            onClick={() => setOpen(false)}
          >
            <span
              className={`font-display text-lg font-semibold tracking-[-0.02em] transition sm:text-xl ${
                isTransparent
                  ? "text-white"
                  : "text-[var(--ink)] group-hover:text-[var(--accent)]"
              }`}
            >
              Arden&apos;s Print
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {mainNav.map((item) => {
              const active = isActive(item.href, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3.5 py-2 text-[13px] font-semibold transition ${
                    active
                      ? isTransparent
                        ? "bg-white/15 text-white"
                        : "bg-[var(--accent-subtle)] text-[var(--accent)]"
                      : isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-[var(--muted-foreground)] hover:text-[var(--ink)] hover:bg-[var(--background-alt)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Phone - desktop only */}
          <a
            href="tel:+18324808080"
            className={`hidden items-center gap-1.5 text-xs font-semibold transition lg:inline-flex ${
              isTransparent
                ? "text-white/75 hover:text-white"
                : "text-[var(--muted-foreground)] hover:text-[var(--accent)]"
            }`}
          >
            <PhoneIcon />
            (832) 480-8080
          </a>

          {/* Cart */}
          <Link
            href="/cart"
            className={`relative inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold transition ${
              isTransparent
                ? "border border-white/25 text-white hover:bg-white/10"
                : "border border-[var(--border)] bg-white text-[var(--accent)] shadow-[var(--shadow-xs)] hover:border-[var(--border-strong)]"
            }`}
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition md:hidden ${
              isTransparent
                ? "border-white/25 text-white hover:bg-white/10"
                : "border-[var(--border)] bg-white text-[var(--ink)] shadow-[var(--shadow-xs)] hover:bg-[var(--background-alt)]"
            }`}
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

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`border-t border-[var(--border)] bg-white md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto max-w-7xl px-5 py-3" aria-label="Mobile">
          <ul className="flex flex-col divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-md)]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
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
