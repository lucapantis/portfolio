import { ProjectScreenshot } from "@/components/project-screenshot";
import type { ProjectScreenshots } from "@/lib/content";

/**
 * Two-image composition for a project (not a carousel).
 *
 * - Mobile: the two screenshots stack full-width with a small gap.
 * - `sm+`: they overlap into a single grid cell — the primary large and
 *   readable on the left, the supporting shot smaller and dropped down on the
 *   right, with a thin surface-coloured ring so the overlap reads as layered.
 * - Hover / keyboard focus on the card (`.group`) nudges the pair very gently:
 *   a slight scale on the primary, a small drift on the secondary. Transforms
 *   only — no layout shift — and gated behind `motion-safe`, so
 *   `prefers-reduced-motion` and the global reduced-motion reset both keep it
 *   still. Coarse-pointer / touch devices simply never trigger hover and get
 *   the static composition, which is fully usable.
 */
export function ProjectShowcase({ shots }: { shots: ProjectScreenshots }) {
  const { primary, secondary } = shots;

  if (!secondary) {
    return (
      <ProjectScreenshot
        image={primary}
        sizes="(min-width: 1024px) 900px, (min-width: 640px) 90vw, 100vw"
        className="shadow-[0_24px_50px_-28px_var(--card-shadow)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.012] motion-safe:group-focus-within:scale-[1.012]"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-1">
      <ProjectScreenshot
        image={primary}
        sizes="(min-width: 1024px) 620px, (min-width: 640px) 62vw, 100vw"
        className="shadow-[0_24px_50px_-28px_var(--card-shadow)] motion-safe:transition-transform motion-safe:duration-300 sm:col-start-1 sm:row-start-1 sm:w-[62%] sm:self-start motion-safe:group-hover:scale-[1.012] motion-safe:group-focus-within:scale-[1.012]"
      />
      <ProjectScreenshot
        image={secondary}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 40vw, 100vw"
        className="shadow-[0_0_0_4px_var(--surface),0_22px_45px_-22px_var(--card-shadow)] motion-safe:transition-transform motion-safe:duration-300 sm:col-start-1 sm:row-start-1 sm:mt-[8%] sm:w-[40%] sm:self-end sm:justify-self-end motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:-translate-y-1.5 motion-safe:group-focus-within:translate-x-1"
      />
    </div>
  );
}
