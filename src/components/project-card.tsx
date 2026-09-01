"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * Interactive shell for a project card.
 *
 * - Desktop: a faint pointer-following spotlight (`.spotlight`, CSS-driven via
 *   `--spot-x` / `--spot-y`). The layer is `display:none` on coarse pointers.
 * - Hover / keyboard focus: a small lift, a border-colour shift and a soft
 *   shadow — `transform` and `box-shadow` only, so no layout shift.
 * - Touch / keyboard: fully usable; the card is not itself a link, its buttons
 *   and links stay in the normal tab order.
 */
export function ProjectCard({
  featured = false,
  children,
}: {
  featured?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node || frame.current) return;
      const { clientX, clientY } = event;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--spot-x", `${clientX - rect.left}px`);
        node.style.setProperty("--spot-y", `${clientY - rect.top}px`);
      });
    },
    [],
  );

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_28px_55px_-30px_var(--card-shadow)] focus-within:-translate-y-0.5 focus-within:border-border-strong ${
        featured ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-8"
      }`}
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div className="relative">{children}</div>
    </article>
  );
}
