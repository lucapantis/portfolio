import Image from "next/image";
import type { ProjectImage } from "@/lib/content";

/**
 * Renders a real project screenshot when one exists in `public/`.
 *
 * There are no screenshots yet, so no project defines `image` and this
 * component is never rendered. It exists so a genuine screenshot can be added
 * later by setting `image` on a project in `content.ts` — nothing else changes.
 * Never used to show a placeholder or a fabricated interface.
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
      className={`overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 ${className}`.trim()}
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
