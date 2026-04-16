import Image from "next/image";
import Link from "next/link";
import { SITE_IMAGES_MARKETING } from "@/lib/site-images";

const steps = [
  "Open Design Studio from the catalog",
  "Build with your art or our design library",
  "Preview on garments, then checkout",
] as const;

export function DesignStudio() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Design studio</p>
            <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
              No designer? No problem.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
              Lay out graphics, preview on mockups, and place the order in one
              flow — built for schools, teams, and growing brands.
            </p>
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-xs font-bold text-[var(--accent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_22%,transparent)]">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/shop" className="btn-primary mt-10 px-8">
              Launch Design Studio
            </Link>
            <p className="mt-4 text-xs text-[var(--muted-foreground)]">
              Studio opens on the product page — choose a garment to begin.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--muted-bg)] to-white p-8 shadow-[var(--shadow-md)] lg:p-10">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--muted-bg)] shadow-inner ring-1 ring-black/5">
              <Image
                src={SITE_IMAGES_MARKETING.designStudioPreview}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="relative mt-5 text-center text-xs font-medium text-[var(--muted-foreground)]">
              Mockup preview — tees, hoodies, bags, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
