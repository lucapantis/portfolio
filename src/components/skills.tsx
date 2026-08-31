import { Section } from "@/components/section";
import { SKILL_GROUPS } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
