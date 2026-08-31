"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { useTheme } from "@/lib/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { theme, toggle } = useTheme();

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.scrollY < 240) setActiveId(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/75 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a
          href="#main"
          className="flex items-center gap-2.5 text-heading transition-colors hover:text-accent"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md border border-border-strong bg-surface font-mono text-xs font-semibold tracking-tight text-accent"
          >
            LP
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">
            Luca Pantis
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;

            if (link.href === "#contact") {
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className="rounded-md border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-surface hover:text-heading"
                  >
                    {link.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  data-active={isActive}
                  className="relative text-sm text-muted transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-heading data-[active=true]:text-heading data-[active=true]:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <ThemeToggle theme={theme} onToggle={toggle} />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-heading"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-hairline bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-foreground transition-colors hover:text-accent aria-[current]:text-heading"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
