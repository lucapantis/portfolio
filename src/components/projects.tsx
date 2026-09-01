import Link from "next/link";
import { Section } from "@/components/section";
import { ButtonLink, buttonClasses } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { ProjectShowcase } from "@/components/project-showcase";
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

function ProjectActions({ project }: { project: Project }) {
  const { caseStudyHref, links } = project;
  if (!caseStudyHref && links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {caseStudyHref && (
        <Link
          href={caseStudyHref}
          className={buttonClasses({
            variant: "primary",
            className: "px-4 py-2 text-xs",
          })}
        >
          View case study <span aria-hidden>&rarr;</span>
        </Link>
      )}
      {links.map((link) => (
        <ButtonLink
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="px-4 py-2 text-xs"
        >
          {link.label} <span aria-hidden>&#8599;</span>
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
 *
 * When the project has real screenshots, the text block runs full width and the
 * two-image composition sits below it so the primary shot can be large.
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
        <div className="flex flex-col gap-10">
          <div>
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

            {(project.caseStudyHref || project.links.length > 0) && (
              <div className="mt-7">
                <ProjectActions project={project} />
              </div>
            )}
          </div>

          {project.screenshots && (
            <ProjectShowcase shots={project.screenshots} />
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
