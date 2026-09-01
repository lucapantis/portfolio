import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/content";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch">
      <Reveal className="max-w-2xl">
        <p className="leading-relaxed text-muted">
          I&rsquo;m open to junior full-stack roles and freelance work. Email is
          the best way to reach me; my code and side projects live on GitHub.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
            Email
          </ButtonLink>
          <ButtonLink
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            LinkedIn <span aria-hidden>&#8599;</span>
          </ButtonLink>
          <ButtonLink
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            aria-label="GitHub profile (opens in a new tab)"
          >
            GitHub <span aria-hidden>&#8599;</span>
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
