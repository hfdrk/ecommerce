"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-md)] sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="space-y-5">
        <label className="block text-sm font-medium text-[var(--foreground)]">
          <span className="text-[var(--muted-foreground)]">Name</span>
          <input className="field-input mt-2" name="name" required />
        </label>
        <label className="block text-sm font-medium text-[var(--foreground)]">
          <span className="text-[var(--muted-foreground)]">Email</span>
          <input
            type="email"
            className="field-input mt-2"
            name="email"
            required
          />
        </label>
        <label className="block text-sm font-medium text-[var(--foreground)]">
          <span className="text-[var(--muted-foreground)]">Message</span>
          <textarea
            rows={5}
            className="field-input mt-2"
            name="message"
            required
          />
        </label>
      </div>
      <button type="submit" className="btn-primary mt-8 w-full">
        {sent ? "Message queued (demo)" : "Send message"}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">
        Demo form — connect to your API or inbox.
      </p>
    </form>
  );
}
