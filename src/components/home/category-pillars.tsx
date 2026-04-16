import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "DTF Transfers",
    desc: "Gang sheets, sizing tools, and press-ready color — most orders ship in 24 hours.",
    href: "/shop?category=DTF%20Transfers",
    image: "/cat-dtf.png",
  },
  {
    title: "Blank Apparel",
    desc: "Core and premium blanks with predictable shrink profiles for repeat production.",
    href: "/shop?category=Blank%20Apparel",
    image: "/cat-blanks.png",
  },
  {
    title: "Accessories",
    desc: "Totes, caps, and finishing goods built for retail and event merchandising.",
    href: "/shop?category=Accessories",
    image: "/cat-accessories.png",
  },
  {
    title: "Print on Demand",
    desc: "Ship direct to your customer with routed fulfillment and white-label packaging.",
    href: "/shop?category=Print%20Services",
    image: "/cat-services.png",
  },
] as const;

export function CategoryPillars() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="eyebrow justify-center">What we do</p>
          <h2 className="font-display mx-auto mt-4 max-w-lg text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Everything your shop needs under one roof
          </h2>
        </div>

        <div className="stagger-children mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="card card-lift group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[var(--background-alt)]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {p.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[var(--accent)] transition group-hover:gap-2.5">
                  Explore
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
