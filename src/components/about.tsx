import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Building practical full-stack applications"
    >
      <Reveal className="max-w-2xl space-y-4 text-muted">
        <p className="leading-relaxed">
          I&rsquo;m a junior full-stack developer focused on building and
          shipping complete web applications &mdash; from database schema and API
          design through to the user interface.
        </p>
        <p className="leading-relaxed">
          My work centres on solving real business problems: taking a concrete
          need and turning it into a working product with React, Next.js,
          TypeScript, Node.js and PostgreSQL. I care about clear code, sensible
          structure and interfaces that are straightforward to use.
        </p>
        <p className="leading-relaxed">
          I work day to day with Git and deploy on Vercel, and I&rsquo;m
          comfortable owning a feature end to end.
        </p>
      </Reveal>
    </Section>
  );
}
