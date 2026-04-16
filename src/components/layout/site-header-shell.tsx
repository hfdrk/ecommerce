import { Suspense } from "react";
import { SiteHeader } from "./site-header";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-2)_92%,transparent)] shadow-[var(--shadow-sm)] backdrop-blur-md">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-90"
        aria-hidden
      />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <span className="font-display text-[1.05rem] font-semibold text-[var(--ink)] sm:text-[1.125rem]">
          Arden&apos;s Print
        </span>
        <div className="h-10 w-24 animate-pulse rounded-full bg-[var(--muted-bg)]" />
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
