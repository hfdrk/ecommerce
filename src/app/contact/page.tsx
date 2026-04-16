import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Arden's Print for quotes, rush jobs, and custom programs.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            Let&apos;s scope your next run.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            For quotes, file checks, or rush scheduling, reach the production
            desk directly. We respond same business day for most requests.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Phone</dt>
              <dd className="mt-1">
                <a href="tel:+18324808080" className="font-medium text-[var(--foreground)] hover:underline">
                  (832) 480-8080
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Email</dt>
              <dd className="mt-1">
                <a href="mailto:info@ardensprint.com" className="font-medium text-[var(--foreground)] hover:underline">
                  info@ardensprint.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Studio</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">
                16131 N Eldridge Pkwy, Suite 108
                <br />
                Tomball, TX 77377
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
