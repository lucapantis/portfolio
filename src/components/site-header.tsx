"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/content";
import { useTheme } from "@/lib/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

/**
 * Primary header, shared by every route through the root layout.
 *
 * On the homepage the section links are in-page anchors and the active one is
 * tracked as you scroll. On any other route (e.g. the ReturnOps case study)
 * the same links point back at `/#section` and render as `next/link`, so the
 * return trip is a client-side transition that keeps the current theme with no
 * reload or flash.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Highlight the nav link for the section currently in view (homepage only).
  // Off the homepage there are no sections to observe; `activeId` is ignored
  // anyway because every read is gated behind `isHome`.
  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // `#about` while on the homepage; `/#about` (a real navigation) from elsewhere.
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const homeMark = (
    <span
      aria-hidden
      className="grid h-8 w-8 place-items-center rounded-md border border-border-strong bg-surface font-mono text-xs font-semibold tracking-tight text-accent"
    >
      LP
    </span>
  );
  const homeLabel = (
    <span className="font-mono text-sm font-semibold tracking-tight">
      Luca Pantis
    </span>
  );
  const homeLinkClass =
    "flex items-center gap-2.5 text-heading transition-colors hover:text-accent";

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/75 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        {isHome ? (
          <a href="#main" className={homeLinkClass}>
            {homeMark}
            {homeLabel}
          </a>
        ) : (
          <Link href="/" className={homeLinkClass}>
            {homeMark}
            {homeLabel}
          </Link>
        )}

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = isHome && activeId === id;
            const href = sectionHref(link.href);
            const linkProps = {
              "aria-current": isActive ? ("true" as const) : undefined,
            };

            if (link.href === "#contact") {
              const className =
                "rounded-md border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-surface hover:text-heading";
              return (
                <li key={link.href}>
                  {isHome ? (
                    <a href={href} className={className} {...linkProps}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={href} className={className} {...linkProps}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            }

            const className =
              "relative text-sm text-muted transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-heading data-[active=true]:text-heading data-[active=true]:after:scale-x-100";
            return (
              <li key={link.href}>
                {isHome ? (
                  <a
                    href={href}
                    data-active={isActive}
                    className={className}
                    {...linkProps}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    data-active={isActive}
                    className={className}
                    {...linkProps}
                  >
                    {link.label}
                  </Link>
                )}
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
              const isActive = isHome && activeId === id;
              const href = sectionHref(link.href);
              const className =
                "block py-3 text-sm text-foreground transition-colors hover:text-accent aria-[current]:text-heading";
              const close = () => setOpen(false);
              return (
                <li key={link.href}>
                  {isHome ? (
                    <a
                      href={href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={close}
                      className={className}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={close}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
