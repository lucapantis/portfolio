"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-theme-change";

/**
 * `localStorage` treated as an external store.
 *
 * - `getServerSnapshot` is what both the server render and the hydrating client
 *   render see: always `"dark"`. So the initial render is deterministic and
 *   identical on both sides — no hydration mismatch, and nothing touches
 *   `window` / `localStorage` during that render.
 * - `getSnapshot` runs only *after* mount, when React reconciles the store. That
 *   is where a saved explicit choice is picked up.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage unavailable (privacy mode) — fall back to the default.
  }
  return "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Reflect the active theme onto <html> (and the browser-chrome colour). Runs
  // after mount and on every change, never during render, so it cannot desync
  // the server/client markup.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f8f7f5" : "#09090b");
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const allowsMotion = !window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (allowsMotion) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }

    root.dataset.theme = next;
    try {
      // Only an explicit choice is ever persisted.
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persisting is best-effort; the in-memory choice still applies.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { theme, toggle };
}
