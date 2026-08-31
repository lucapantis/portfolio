import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { GITHUB_URL } from "@/lib/content";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch">
      <Reveal className="max-w-2xl">
        <p className="leading-relaxed text-muted">
          I&rsquo;m open to junior full-stack roles and freelance work. GitHub is
          the best place to see what I&rsquo;m building and to reach me.
        </p>
        <div className="mt-8">
          <ButtonLink href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            github.com/lucapantis &#8599;
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
