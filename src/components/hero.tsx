import { ButtonLink } from "@/components/button-link";
import { GITHUB_URL } from "@/lib/content";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">
        Junior Full-Stack Developer
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
        Luca Pantis
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        I build practical full-stack web applications with React, Next.js,
        TypeScript and Node.js &mdash; owning features from database and API
        design through to accessible, responsive interfaces that solve real
        business problems.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="#projects">View projects</ButtonLink>
        <ButtonLink
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          GitHub &#8599;
        </ButtonLink>
      </div>
    </section>
  );
}
