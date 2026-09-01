import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary:
    "bg-accent-strong text-white hover:bg-accent hover:shadow-lg hover:shadow-accent-strong/25",
  secondary:
    "border border-border-strong text-foreground hover:border-accent hover:bg-surface hover:text-heading",
} as const;

type Variant = keyof typeof variants;

/**
 * Shared button styling. Use for a plain `<a>` (via `ButtonLink`), a `next/link`
 * `<Link>`, or a real `<button>`, so every call-to-action across the site — the
 * homepage and the case study page — reads the same.
 */
export function buttonClasses({
  variant = "primary",
  className = "",
}: { variant?: Variant; className?: string } = {}) {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClasses({ variant, className })} {...props} />;
}
