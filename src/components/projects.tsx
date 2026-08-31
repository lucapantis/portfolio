import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
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
          className="rounded border border-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-border-strong hover:text-foreground"
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
        <li key={capability} className="flex gap-3 text-sm text-foreground">
          <span
            aria-hidden
            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent"
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
function ProjectEntry({
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
      <ProjectCard featured={featured}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="lg:flex-1">
            <div className="flex flex-wrap items-center gap-3">
              {featured ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-strong">
                  Featured project
                </span>
              ) : (
                <span className="rounded-full border border-border-strong bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
                  Full-stack project
                </span>
              )}
              <span className="text-xs text-faint">{project.tagline}</span>
            </div>

            <h3
              className={`mt-4 font-semibold tracking-tight text-heading ${
                featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.name}
            </h3>

            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
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
      </ProjectCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured projects">
      <div className="space-y-6">
        {featured && <ProjectEntry project={featured} featured />}
        {secondary.map((project, index) => (
          <ProjectEntry
            key={project.name}
            project={project}
            delay={80 + index * 80}
          />
        ))}
      </div>
    </Section>
  );
}
