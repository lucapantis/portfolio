import Image from "next/image";
import type { ProjectImage } from "@/lib/content";

/**
 * Renders a real project screenshot when one exists in `public/`.
 *
 * There are no screenshots yet, so no project defines `image` and this
 * component is never rendered. To add one later, drop a real image into
 * `public/projects/` and set `image` on that project in `content.ts` — the
 * card picks it up with no other changes. Never used to show a placeholder,
 * an empty frame or a fabricated interface.
 */
export function ProjectScreenshot({
  image,
  className = "",
}: {
  image: ProjectImage;
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
        sizes="(min-width: 1024px) 480px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
