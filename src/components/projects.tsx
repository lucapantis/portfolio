import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { PROJECTS } from "@/lib/content";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured projects">
      <div className="space-y-6">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className={`rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700 sm:p-8 ${
              project.featured ? "border-l-2 border-l-blue-500" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <h3 className="text-lg font-semibold text-zinc-100">
                {project.name}
              </h3>
              <span className="text-sm text-zinc-500">{project.tagline}</span>
              {project.featured && (
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                  Case study
                </span>
              )}
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-xs text-zinc-400"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link) => (
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
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
