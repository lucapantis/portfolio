"use client";

import { useCallback, useEffect, useRef } from "react";
import { PROFILE_ROWS } from "@/lib/content";

/**
 * Developer-profile card.
 *
 * Adds a very small pointer-responsive tilt/parallax, but only where it makes
 * sense: precise pointers (`hover` + `fine`) and users who allow motion. Touch
 * devices, keyboard users and reduced-motion users get the static card. All
 * movement is `transform`-only and coalesced through `requestAnimationFrame`.
 */
export function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const interactive = useRef(false);

  useEffect(() => {
    interactive.current = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive.current || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `translate3d(${px * 6}px, ${py * 6}px, 0) rotateX(${py * -3}deg) rotateY(${px * 3}deg)`;
    });
  }, []);

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    node.style.transform = "";
  }, []);

  return (
    <div
      className="[perspective:1000px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <div
        ref={ref}
        className="rounded-xl border border-border bg-surface/70 p-6 shadow-[0_20px_45px_-28px_var(--card-shadow)] backdrop-blur-sm transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-md border border-border-strong bg-surface-muted font-mono text-xs font-semibold text-accent"
          >
            LP
          </span>
          <div>
            <p className="text-sm font-medium text-heading">Luca Pantis</p>
            <p className="text-xs text-faint">Full-stack developer</p>
          </div>
        </div>
        <dl className="mt-4 space-y-3">
          {PROFILE_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[4.5rem_1fr] gap-3 text-sm"
            >
              <dt className="pt-px font-mono text-[11px] uppercase tracking-wider text-muted">
                {row.label}
              </dt>
              <dd className="text-foreground">
                {row.label === "Status" ? (
                  <span className="flex items-start gap-2">
                    <span
                      aria-hidden
                      data-status-dot
                      className="relative mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{row.value}</span>
                  </span>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
