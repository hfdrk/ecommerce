import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeaderShell } from "@/components/layout/site-header-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arden's Print — DTF & Print on Demand",
    template: "%s · Arden's Print",
  },
  description:
    "DTF transfers, blank apparel, and print-on-demand fulfillment — quality-first production with fast turnaround.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeaderShell />
          <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
