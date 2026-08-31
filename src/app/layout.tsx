import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luca Pantis — Junior Full-Stack Developer",
  description:
    "Luca Pantis is a junior full-stack developer building practical web applications with React, Next.js, TypeScript, Node.js and PostgreSQL.",
  authors: [{ name: "Luca Pantis" }],
  creator: "Luca Pantis",
  openGraph: {
    title: "Luca Pantis — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer building practical web applications with React, Next.js, TypeScript and Node.js.",
    type: "website",
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
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        <a
          href="#main"
          className="sr-only rounded-md bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
