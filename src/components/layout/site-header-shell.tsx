import { Suspense } from "react";
import { SiteHeader } from "./site-header";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 shadow-[var(--shadow-sm)] backdrop-blur-lg">
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-[var(--accent)]" aria-hidden />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
        <span className="font-display text-lg font-semibold text-[var(--ink)] sm:text-xl">
          Arden&apos;s Print
        </span>
        <div className="h-10 w-20 animate-pulse rounded-lg bg-[var(--muted-bg)]" />
      </div>
    </header>
  );
}

export function SiteHeaderShell() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <SiteHeader />
    </Suspense>
  );
}
