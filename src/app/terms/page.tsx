import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Terms &amp; conditions
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Placeholder terms for the demo. Add your payment terms, lead times,
        and liability limits for live use.
      </p>
    </div>
  );
}
