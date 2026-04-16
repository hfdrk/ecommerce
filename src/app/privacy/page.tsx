import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Privacy
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
        This is a placeholder privacy policy for the demo storefront. Replace
        with your legal copy and data handling details before production.
      </p>
    </div>
  );
}
