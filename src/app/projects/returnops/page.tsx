import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ButtonLink, buttonClasses } from "@/components/button-link";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Reveal } from "@/components/reveal";
import {
  PROJECTS,
  RETURNOPS_LIVE_URL,
  RETURNOPS_REPO_URL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "ReturnOps — Returns Management Platform · Case study | Luca Pantis",
  description:
    "A case study of ReturnOps: an internal returns-management tool with a fixed inspection workflow, URL-driven reporting, CSV import/export, default-deny role-based access and a database-enforced audit trail — built with Next.js, TypeScript, PostgreSQL and Prisma.",
  openGraph: {
    title: "ReturnOps — Returns Management Platform · Case study",
    description:
      "How ReturnOps organises returns handling for a small operations team, and the engineering behind it.",
    type: "article",
  },
};

const returnopsEntry = PROJECTS.find((project) => project.name === "ReturnOps");
if (!returnopsEntry) {
  throw new Error("ReturnOps project is missing from content.ts");
}
const returnops = returnopsEntry;

const TECH_STACK: { area: string; choice: string }[] = [
  { area: "Framework", choice: "Next.js 16 (App Router), React 19" },
  { area: "Language", choice: "TypeScript, strict mode" },
  { area: "Styling", choice: "Tailwind CSS 4" },
  { area: "Database", choice: "PostgreSQL, hosted on Neon" },
  {
    area: "ORM",
    choice: "Prisma 7 with the @prisma/adapter-pg driver adapter over pg",
  },
  {
    area: "Validation",
    choice: "Zod 4 — one shared schema module for API bodies, forms and CSV rows",
  },
  {
    area: "Auth",
    choice: "Auth.js (NextAuth v5), Credentials provider, JWT sessions, bcryptjs",
  },
  { area: "Charts", choice: "Recharts" },
  { area: "Testing", choice: "Vitest (unit), Playwright (end-to-end)" },
  { area: "Hosting", choice: "Vercel (app), Neon (database)" },
];

type RoleColumn = "Demo" | "VIEWER" | "OPERATOR" | "ADMIN";
const ROLE_COLUMNS: RoleColumn[] = ["Demo", "VIEWER", "OPERATOR", "ADMIN"];

const PERMISSION_MATRIX: { capability: string; roles: Record<RoleColumn, boolean> }[] =
  [
    {
      capability: "Dashboard, returns list & detail, search, filters",
      roles: { Demo: true, VIEWER: true, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "CSV export of the filtered view",
      roles: { Demo: false, VIEWER: true, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "Create returns",
      roles: { Demo: false, VIEWER: false, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "Edit returns",
      roles: { Demo: false, VIEWER: false, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "Legal status transitions",
      roles: { Demo: false, VIEWER: false, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "CSV import",
      roles: { Demo: false, VIEWER: false, OPERATOR: true, ADMIN: true },
    },
    {
      capability: "Audit log (page + API)",
      roles: { Demo: false, VIEWER: false, OPERATOR: false, ADMIN: true },
    },
  ];

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal
      as="section"
      className="scroll-mt-24 border-t border-hairline pt-12"
    >
      <h2
        id={id}
        className="text-xl font-semibold tracking-tight text-heading sm:text-2xl"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}

function Figure({
  image,
  caption,
}: {
  image: { src: string; alt: string; width: number; height: number };
  caption: string;
}) {
  return (
    <figure className="space-y-3">
      <ProjectScreenshot
        image={image}
        sizes="(min-width: 768px) 720px, 100vw"
        className="shadow-[0_24px_50px_-28px_var(--card-shadow)]"
      />
      <figcaption className="text-sm text-faint">{caption}</figcaption>
    </figure>
  );
}

export default function ReturnOpsCaseStudy() {
  const { primary, secondary } = returnops.screenshots ?? {};

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-heading"
      >
        <span aria-hidden>&larr;</span> All projects
      </Link>

      {/* Hero */}
      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Case study
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
          ReturnOps
        </h1>
        <p className="mt-2 text-lg text-foreground">Returns Management Platform</p>
        <p className="mt-6 leading-relaxed text-muted">
          ReturnOps is an internal operations tool for managing product returns
          — one place for a small operations team to log every return, move it
          through a fixed inspection-and-resolution workflow, and report on what
          is coming back and why. It is a self-contained MVP built to demonstrate
          full-stack practice: type-safe data flow, role-based access control, an
          append-only audit trail, and a production deployment. Every record in
          the demo is fictional.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={RETURNOPS_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm"
          >
            Live demo <span aria-hidden>&#8599;</span>
          </ButtonLink>
          <ButtonLink
            href={RETURNOPS_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="px-4 py-2 text-sm"
          >
            GitHub <span aria-hidden>&#8599;</span>
          </ButtonLink>
        </div>

        <ul className="mt-7 flex flex-wrap gap-2">
          {returnops.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-14 space-y-12">
        <CaseSection id="problem" title="The business problem">
          <p>
            A retailer receiving returns by post has the same questions every
            week: which returns are sitting in the queue and how long have they
            been there, why are customers sending things back, how long does it
            actually take to process a return end to end, and who changed a given
            record.
          </p>
          <p>
            Without a system, that lives in a spreadsheet: no validation, no
            enforced workflow, no history of who did what, and no safe way to
            give a colleague read-only access. ReturnOps replaces that
            spreadsheet with a small web app that enforces the workflow,
            validates every entry against one shared schema, keeps a
            tamper-proof log of every change, and separates &ldquo;can
            look&rdquo; from &ldquo;can edit&rdquo; from &ldquo;can see the audit
            trail&rdquo;.
          </p>
        </CaseSection>

        <CaseSection id="solution" title="The solution">
          <p>
            Each return is logged as a structured record — order number,
            product, SKU, customer name, reason and received date — and moves
            through a fixed five-stage workflow:
          </p>
          <p className="font-mono text-sm text-foreground">
            RECEIVED &rarr; INSPECTING &rarr; APPROVED &rarr; COMPLETED, with a
            REJECTED branch that also ends in COMPLETED, and APPROVED able to
            revert to INSPECTING when a re-examination is needed.
          </p>
          <p>
            Both the API and the UI reject any transition outside that table. The
            returns list is server-rendered and paginated, with free-text search
            and filters for status, reason and received-date range; every filter
            lives in the URL, so a filtered view is shareable and survives a
            refresh. The dashboard turns the same data into headline metrics and
            bar charts of returns by status and by reason.
          </p>
        </CaseSection>

        <CaseSection id="capabilities" title="Key capabilities">
          <ul className="space-y-4">
            {[
              [
                "Returns workflow",
                "Create, view and edit returns. The workflow panel offers only the transitions that are legal from the current status; the return reference (RET-<year>-<sequence>) is generated automatically; completing a return stamps the completion date and reopening it clears the date.",
              ],
              [
                "Dashboard & reporting",
                "Total returns, open / in-progress and completed counts, average processing time across completed returns, and bar charts of returns by workflow status and by most common reason — with dedicated empty and error states.",
              ],
              [
                "CSV import",
                "A three-step upload → preview → commit wizard. Every row is validated against the same schema used everywhere else and flagged as ready, invalid (with field-level errors) or duplicate; only valid, non-duplicate rows are inserted, in a single transaction, and the server re-validates from scratch at commit. Imports are capped at 5,000 rows / 5 MB per file.",
              ],
              [
                "CSV export",
                "Exports the currently filtered view. Any cell that begins with a spreadsheet formula character is quote-prefixed so an exported file cannot carry a formula into a downstream spreadsheet.",
              ],
              [
                "Authentication",
                "A single Credentials provider with no public sign-up, passwords stored only as a bcrypt hash, stateless JWT sessions, generic login errors, and a per-account lockout after five consecutive failed attempts.",
              ],
              [
                "Authorization & audit trail",
                "Default-deny permissions with four independent enforcement layers (see below). Every create, edit, status change and import writes one row to an append-only audit table, in the same transaction as the change; the audit page (ADMIN only) filters by actor, action, entity and date.",
              ],
            ].map(([term, detail]) => (
              <li key={term} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>
                  <strong className="font-medium text-foreground">
                    {term}.
                  </strong>{" "}
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="roles" title="Roles and permissions">
          <p>
            The database defines three roles — <code>ADMIN</code>,{" "}
            <code>OPERATOR</code> and <code>VIEWER</code>. The public demo account
            is a <code>VIEWER</code> whose session is forced to the{" "}
            <code>VIEWER</code> role regardless of its database row, with an even
            narrower read-only grant. Authorization is default-deny: a capability
            is granted only if the role is explicitly listed for it.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                ReturnOps capability-by-role permission matrix
              </caption>
              <thead>
                <tr className="border-b border-border-strong text-left">
                  <th scope="col" className="py-2 pr-4 font-medium text-foreground">
                    Capability
                  </th>
                  {ROLE_COLUMNS.map((role) => (
                    <th
                      key={role}
                      scope="col"
                      className="px-3 py-2 text-center font-mono text-xs font-medium text-foreground"
                    >
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSION_MATRIX.map((row) => (
                  <tr key={row.capability} className="border-b border-hairline">
                    <th
                      scope="row"
                      className="py-2 pr-4 text-left font-normal text-muted"
                    >
                      {row.capability}
                    </th>
                    {ROLE_COLUMNS.map((role) => (
                      <td key={role} className="px-3 py-2 text-center">
                        <span
                          className={
                            row.roles[role]
                              ? "text-accent"
                              : "text-faint"
                          }
                        >
                          {row.roles[role] ? "✔" : "–"}
                        </span>
                        <span className="sr-only">
                          {row.roles[role] ? "granted" : "denied"}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Any capability not listed above is denied for every role, including
            the demo account.
          </p>
        </CaseSection>

        <CaseSection id="architecture" title="Architecture">
          <p>
            The whole application is one Next.js 16 (App Router) deployment on
            Vercel. Pages are React Server Components that query PostgreSQL
            directly through Prisma; the same query helpers back both the returns
            list page and its REST endpoint, so the page never calls its own API
            over HTTP. Prisma 7 uses the <code>@prisma/adapter-pg</code> driver
            adapter over the <code>pg</code> driver.
          </p>
          <p>
            The database is Neon PostgreSQL — the app runtime connects through
            the pooled endpoint, while migrations run against the direct
            endpoint. Auth.js (NextAuth v5) handles sessions; the optimistic
            route-protection check runs in <code>proxy.ts</code> (Next.js 16&rsquo;s
            renamed middleware) from a database-free copy of the auth config, so
            it never loads Prisma or bcrypt. Validation is one shared module of
            Zod schemas imported by the API routes, the forms and the CSV
            importer alike. There are no queues, background workers or external
            services.
          </p>
        </CaseSection>

        <CaseSection id="decisions" title="Engineering decisions">
          <ul className="space-y-4">
            {[
              [
                "One validation schema, reused everywhere",
                "The create/edit routes, the CSV pipeline and the React forms all import the same Zod schemas — so a rule is written once and cannot drift between entry points.",
              ],
              [
                "Layered authorization",
                "Four independent checks: the optimistic middleware redirect, a per-page session check, a guard() call in every API route and mutation that returns a real 401 / 403, and hidden UI affordances. Mutations and the audit trail re-load the user from the database, so a revoked role takes effect on the next request even with a valid session cookie.",
              ],
              [
                "Append-only audit at the database layer",
                "Beyond only ever inserting rows, a migration installs PostgreSQL triggers that reject UPDATE, DELETE and TRUNCATE on the audit table, and audit metadata passes through a redactor that drops secret-looking keys and truncates long values.",
              ],
              [
                "URL-driven table state",
                "Search, filters, sort and pagination live entirely in the query string; the filter bar only pushes new URLs and the data fetch happens server-side on the resulting request.",
              ],
              [
                "Enums stored as TEXT",
                "status and reason are plain text columns validated only by Zod at the application boundary, so adding a new status or reason is a code-only change with no migration.",
              ],
              [
                "No CSV library",
                "The import/export format is a flat one-record-per-row shape, so a small hand-rolled RFC 4180 parser/serializer handles it correctly without adding a dependency.",
              ],
            ].map(([term, detail]) => (
              <li key={term} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>
                  <strong className="font-medium text-foreground">
                    {term}.
                  </strong>{" "}
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="security" title="Security and demo approach">
          <p>
            The public &ldquo;Try demo&rdquo; button on the login screen signs
            you in with no sign-up and nothing to type. The demo credentials are
            read from server-side environment variables and handed straight to
            Auth.js — they are never exposed to the client bundle, logs or
            committed files.
          </p>
          <p>
            The demo session is always forced to the <code>VIEWER</code> role and
            flagged as a demo account, which narrows it to read-only: it cannot
            create, edit, import, export, change statuses or open the audit log,
            and that is enforced by the same server-side guard as every other
            role — not just hidden in the UI. The entire database is fictional
            seed data. Passwords are stored only as bcrypt hashes and are never
            logged; no credentials or connection strings appear in the
            repository.
          </p>
        </CaseSection>

        {(primary || secondary) && (
          <CaseSection id="screenshots" title="Screenshots">
            <div className="space-y-8">
              {primary && (
                <Figure
                  image={primary}
                  caption="The dashboard: headline metrics and a breakdown of returns by workflow status."
                />
              )}
              {secondary && (
                <Figure
                  image={secondary}
                  caption="The returns list: URL-based search and filters over a paginated table."
                />
              )}
            </div>
          </CaseSection>
        )}

        <CaseSection id="stack" title="Technology stack">
          <dl className="divide-y divide-hairline border-y border-hairline">
            {TECH_STACK.map(({ area, choice }) => (
              <div
                key={area}
                className="grid grid-cols-[7rem_1fr] gap-4 py-3 sm:grid-cols-[9rem_1fr]"
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {area}
                </dt>
                <dd className="text-sm text-foreground">{choice}</dd>
              </div>
            ))}
          </dl>
          <p>
            Verified in the project&rsquo;s README (2026-08-31): lint and
            type-check clean, 106 unit tests passing across 14 files, and a
            production build of 17 routes. The end-to-end suite drives desktop
            and mobile viewports and asserts that a lower-privileged session is
            rejected with a 403 when it calls the API directly.
          </p>
        </CaseSection>
      </div>

      {/* Final CTA */}
      <div className="mt-16 border-t border-hairline pt-10">
        <p className="text-sm text-muted">
          Browse the live demo or read the source, then head back to the rest of
          the portfolio.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink
            href={RETURNOPS_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm"
          >
            Live demo <span aria-hidden>&#8599;</span>
          </ButtonLink>
          <ButtonLink
            href={RETURNOPS_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="px-4 py-2 text-sm"
          >
            GitHub repository <span aria-hidden>&#8599;</span>
          </ButtonLink>
          <Link
            href="/#projects"
            className={buttonClasses({
              variant: "secondary",
              className: "px-4 py-2 text-sm",
            })}
          >
            Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
