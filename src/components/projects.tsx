import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { PROJECTS, type Project } from "@/lib/content";

const featured = PROJECTS.find((project) => project.featured);
const secondary = PROJECTS.filter((project) => !project.featured);

function StackTags({
  stack,
  className = "",
}: {
  stack: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[11px] text-zinc-400"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function CapabilityList({ capabilities }: { capabilities: string[] }) {
  return (
    <ul className="mt-6 space-y-2">
      {capabilities.map((capability) => (
        <li key={capability} className="flex gap-3 text-sm text-zinc-300">
          <span
            aria-hidden
            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-blue-400"
          />
          <span>{capability}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectButtons({ links }: { links: Project["links"] }) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <ButtonLink
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="px-4 py-2 text-xs"
        >
          {link.label} &#8599;
        </ButtonLink>
      ))}
    </div>
  );
}

/**
 * Shared card for a project. `featured` gets more padding, a larger heading and
 * a blue accent badge so the primary case study reads as the anchor of the
 * section; the second project uses the same full-width layout at a slightly
 * calmer scale so it carries real weight rather than looking like a stub.
 */
function ProjectCard({
  project,
  featured = false,
  delay,
}: {
  project: Project;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article
        className={`rounded-xl border border-zinc-800 bg-zinc-900/40 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 ${
          featured
            ? "p-6 hover:shadow-[0_28px_55px_-30px_rgba(0,0,0,0.75)] sm:p-8 lg:p-10"
            : "p-6 hover:shadow-[0_22px_45px_-30px_rgba(0,0,0,0.75)] sm:p-8"
        }`}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="lg:flex-1">
            <div className="flex flex-wrap items-center gap-3">
              {featured ? (
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                  Featured project
                </span>
              ) : (
                <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                  Full-stack project
                </span>
              )}
              <span className="text-xs text-zinc-500">{project.tagline}</span>
            </div>

            <h3
              className={`mt-4 font-semibold tracking-tight text-zinc-50 ${
                featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.name}
            </h3>

            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
              {project.description}
            </p>

            {project.capabilities && project.capabilities.length > 0 && (
              <CapabilityList capabilities={project.capabilities} />
            )}

            <StackTags stack={project.stack} className="mt-6" />

            {project.links.length > 0 && (
              <div className="mt-7">
                <ProjectButtons links={project.links} />
              </div>
            )}
          </div>

          {project.image && (
            <div className="lg:w-[42%] lg:shrink-0">
              <ProjectScreenshot image={project.image} />
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured projects">
      <div className="space-y-6">
        {featured && <ProjectCard project={featured} featured />}
        {secondary.map((project) => (
          <ProjectCard key={project.name} project={project} delay={80} />
        ))}
      </div>
    </Section>
  );
}
