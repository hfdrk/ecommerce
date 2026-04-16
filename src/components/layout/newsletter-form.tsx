"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="flex w-full max-w-md gap-2 sm:w-auto"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
        <p className="text-sm font-medium text-white">
          ✓ Subscribed — thanks!
        </p>
      ) : (
        <>
          <input
            type="email"
            placeholder="you@company.com"
            required
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/15"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-zinc-100"
          >
            Subscribe
          </button>
        </>
      )}
    </form>
  );
}
