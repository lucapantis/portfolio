import { ButtonLink } from "@/components/button-link";
import { GITHUB_URL, PROFILE_ROWS } from "@/lib/content";

const GRID_MASK =
  "radial-gradient(ellipse 70% 60% at 50% 0%, #000 55%, transparent 100%)";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
      {/* Very subtle background grid, faded out towards the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
      {/* Restrained blue radial highlight behind the top of the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[34rem] w-[52rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.14), rgba(37,99,235,0))",
          filter: "blur(44px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">
              Junior Full-Stack Developer
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
              Luca Pantis
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
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

function ProfileCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.7)] backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-md border border-zinc-700 bg-zinc-950 font-mono text-xs font-semibold text-blue-400"
        >
          LP
        </span>
        <div>
          <p className="text-sm font-medium text-zinc-100">Luca Pantis</p>
          <p className="text-xs text-zinc-500">Full-stack developer</p>
        </div>
      </div>
      <dl className="mt-4 space-y-3">
        {PROFILE_ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[4.5rem_1fr] gap-3 text-sm"
          >
            <dt className="pt-px font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              {row.label}
            </dt>
            <dd className="text-zinc-300">
              {row.label === "Status" ? (
                <span className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
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
  );
}
