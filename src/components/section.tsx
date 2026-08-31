import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/** Shared shell for the main page sections: consistent spacing, width and heading. */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
