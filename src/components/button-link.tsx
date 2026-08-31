import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary:
    "border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900",
} as const;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: keyof typeof variants;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />
  );
}
