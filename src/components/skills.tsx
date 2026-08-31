import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SKILL_GROUPS } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group.title} delay={index * 70} className="h-full">
            <div className="h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
