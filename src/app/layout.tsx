import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SITE_URL } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Absolute base for every URL-based metadata field (Open Graph / Twitter
  // images, canonical links). Points at the verified production deployment.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luca Pantis — Junior Full-Stack Developer",
    template: "%s — Luca Pantis",
  },
  description:
    "Portfolio of Luca Pantis, a junior full-stack developer building practical web applications with React, Next.js, TypeScript, Node.js and PostgreSQL. Featured work: ReturnOps and FlowFunds.",
  applicationName: "Luca Pantis — Portfolio",
  authors: [{ name: "Luca Pantis" }],
  creator: "Luca Pantis",
  openGraph: {
    title: "Luca Pantis — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer building practical web applications with React, Next.js, TypeScript, Node.js and PostgreSQL.",
    url: "/",
    siteName: "Luca Pantis — Portfolio",
    type: "website",
  },
  twitter: {
    // Title, description and image alt fall back to the per-route Open Graph
    // values, so only the card type needs to be set site-wide.
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only rounded-md bg-surface px-4 py-2 text-sm text-heading focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80]"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
