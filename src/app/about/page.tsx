import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arden's Print — DTF, blanks, and POD fulfillment built for serious decorators.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="eyebrow">About</p>
      <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl sm:leading-tight">
        Built for shops that live on deadline.
      </h1>
      <div className="mt-10 space-y-5 border-l-2 border-[var(--accent)]/25 pl-6 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
        <p>
          Arden&apos;s Print focuses on predictable color, stable blank specs,
          and fulfillment you can quote with confidence. Whether you are
          heat-pressing DTF in-house or routing POD to your customers, the goal
          is the same: fewer surprises on the receiving dock.
        </p>
        <p>
          From Tomball, TX, we support decorators across the country with fast
          turnarounds and clear communication — so you can spend less time
          chasing status and more time selling.
        </p>
      </div>
      <Link href="/contact" className="btn-primary mt-12 px-8">
        Work with us
      </Link>
    </div>
  );
}
