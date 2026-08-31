"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a neutral `div` wrapper. */
  as?: ElementType;
  className?: string;
  /** Small stagger, in milliseconds, applied as a transition delay. */
  delay?: number;
};

/**
 * Fade-and-rise reveal for a section or card as it scrolls into view.
 *
 * The animation is progressive enhancement only: the pre-reveal styles live
 * under `@media (scripting: enabled) [data-reveal]` in globals.css, so without
 * JavaScript (or if the observer never runs) the content is simply visible.
 * `prefers-reduced-motion` and environments without IntersectionObserver reveal
 * immediately. Runs once.
 */
export function Reveal({ as: Tag = "div", className, delay, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    // No IntersectionObserver (very old/edge environments): just show it.
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    // Safety net: reveal regardless if the observer somehow never fires.
    // `prefers-reduced-motion` is handled in CSS, which keeps the content
    // visible and drops the transition even before this resolves.
    const fallback = window.setTimeout(() => setRevealed(true), 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
