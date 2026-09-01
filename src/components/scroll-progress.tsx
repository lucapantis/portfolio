"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Thin progress line pinned to the top of the viewport, reflecting how far the
 * page has been scrolled. Updates are coalesced into a single
 * `requestAnimationFrame` per frame and only touch `transform` (no layout, no
 * per-scroll React state). The bar fades out when the document is not tall
 * enough to scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const measure = () => {
      frame.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 1) {
        setScrollable(false);
        bar.style.transform = "scaleX(0)";
        return;
      }
      setScrollable(true);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.transform = `scaleX(${progress})`;
    };

    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Content height can change after mount (fonts, images, reveals).
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 transition-opacity duration-300 ${
        scrollable ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
