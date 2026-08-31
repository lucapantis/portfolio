import { ButtonLink } from "@/components/button-link";
import { ProfileCard } from "@/components/profile-card";
import { GITHUB_URL } from "@/lib/content";

const GRID_MASK =
  "radial-gradient(ellipse 70% 60% at 50% 0%, #000 55%, transparent 100%)";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-hairline">
      {/* Very subtle background grid, faded out towards the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
      {/* Restrained blue radial highlight behind the top of the hero. */}
      <div
        aria-hidden
        data-hero-glow
        className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[34rem] w-[52rem] will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, var(--hero-glow), transparent)",
          filter: "blur(44px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Junior Full-Stack Developer
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-heading sm:text-5xl md:text-6xl">
              Luca Pantis
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
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
          </div>

          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
