import Image from "next/image";
import type { ProjectImage } from "@/lib/content";

/**
 * A single framed project screenshot.
 *
 * This is the low-level frame primitive — a rounded, bordered container around a
 * responsive `next/image`. It renders a real image only; it is never used to
 * show a placeholder, an empty frame or a fabricated interface. `<ProjectShowcase>`
 * composes two of these into the primary + supporting pair shown on a card.
 *
 * `sizes` is required so Next generates a responsive `srcset` rather than
 * assuming the image spans the full viewport. Loading stays lazy (the default),
 * which is correct here: the projects section sits well below the fold.
 */
export function ProjectScreenshot({
  image,
  sizes,
  className = "",
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-surface-muted ${className}`.trim()}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}
