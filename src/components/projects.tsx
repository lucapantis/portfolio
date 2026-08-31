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

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-[0_28px_55px_-30px_rgba(0,0,0,0.75)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="lg:flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                Featured project
              </span>
              <span className="text-xs text-zinc-500">{project.tagline}</span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              {project.name}
            </h3>

            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
              {project.description}
            </p>

            {project.capabilities && project.capabilities.length > 0 && (
              <ul className="mt-6 space-y-2">
                {project.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex gap-3 text-sm text-zinc-300"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-blue-400"
                    />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            )}

            <StackTags stack={project.stack} className="mt-6" />

            <div className="mt-7">
              <ProjectButtons links={project.links} />
            </div>
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

function SecondaryProject({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <Reveal className="h-full" delay={delay}>
      <article className="flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-[0_22px_45px_-30px_rgba(0,0,0,0.75)]">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold text-zinc-100">
            {project.name}
          </h3>
          <span className="text-xs text-zinc-500">{project.tagline}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        {project.image && (
          <ProjectScreenshot image={project.image} className="mt-4" />
        )}

        <StackTags stack={project.stack} className="mt-4" />

        {project.links.length > 0 && (
          <div className="mt-5">
            <ProjectButtons links={project.links} />
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured projects">
      {featured && <FeaturedProject project={featured} />}

      {secondary.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {secondary.map((project, index) => (
            <SecondaryProject
              key={project.name}
              project={project}
              delay={index * 60}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
