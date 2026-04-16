import type { Metadata } from "next";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Returns
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Placeholder returns policy. Custom decorated goods usually require
        tailored language — replace with your operational policy.
      </p>
    </div>
  );
}
