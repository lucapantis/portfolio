// Structured content for the portfolio. Keep copy and links here so sections
// stay presentational and repeated items are defined once.

// Verified personal contact links, defined once and shared by the contact
// section, the site footer and the site metadata.
export const EMAIL = "lucapantis@gmail.com";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/luca-pantis-436a9b36a/";
export const GITHUB_URL = "https://github.com/lucapantis";

// Verified per-project links. Kept here so the homepage cards and the ReturnOps
// case study page cite exactly the same URLs.
export const RETURNOPS_LIVE_URL = "https://returnops-five.vercel.app";
export const RETURNOPS_REPO_URL = "https://github.com/lucapantis/returnops";
export const FLOWFUNDS_LIVE_URL = "https://flowfunds-two.vercel.app";
export const FLOWFUNDS_REPO_URL = "https://github.com/lucapantis/flowfunds";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/** Compact, factual summary shown as the hero profile card. */
export const PROFILE_ROWS: { label: string; value: string }[] = [
  { label: "Frontend", value: "React, Next.js, TypeScript" },
  { label: "Backend", value: "Node.js, Express" },
  { label: "Data", value: "PostgreSQL, Prisma" },
  { label: "Focus", value: "Practical full-stack business applications" },
  { label: "Status", value: "Open to junior full-stack opportunities" },
];

export type ProjectLink = {
  label: string;
  href: string;
};

/**
 * A single real screenshot living in `public/projects/`. `width` / `height` are
 * the file's true pixel dimensions and are used only to reserve the correct
 * aspect ratio (no layout shift); the rendered size is set in CSS.
 */
export type ProjectImage = {
  /** Path under `public/`, e.g. "/projects/returnops.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Real screenshots for a project. Left undefined until genuine local images
 * exist in `public/projects/`; components render nothing when it is absent.
 * `primary` is shown large and readable, `secondary` as a smaller supporting
 * shot composed beside it.
 */
export type ProjectScreenshots = {
  primary: ProjectImage;
  secondary?: ProjectImage;
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  /** Short, verified capability statements. */
  capabilities?: string[];
  stack: string[];
  /** External links (live demo, repository). Rendered as new-tab actions. */
  links: ProjectLink[];
  /** Internal route to a dedicated case study page, if one exists. */
  caseStudyHref?: string;
  screenshots?: ProjectScreenshots;
  /** Marks the primary case study. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "ReturnOps",
    tagline: "Returns Management Platform",
    description:
      "An internal operations tool for managing product returns: logging each return, moving it through a fixed inspection-and-resolution workflow, and reporting on return volume and reasons — with role-based access control and an append-only audit trail.",
    capabilities: [
      "Structured return records moving through a fixed five-stage inspection-and-resolution workflow",
      "Server-rendered dashboard and returns list with URL-based search, filters and CSV export",
      "CSV import wizard with row-level validation and a single-transaction commit",
      "Default-deny role-based access control with a database-enforced, append-only audit trail",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Auth.js",
      "Tailwind CSS",
    ],
    links: [
      { label: "Live demo", href: RETURNOPS_LIVE_URL },
      { label: "GitHub", href: RETURNOPS_REPO_URL },
    ],
    caseStudyHref: "/projects/returnops",
    screenshots: {
      primary: {
        src: "/projects/returnops.png",
        alt: "ReturnOps dashboard showing total returns, open and completed counts, average processing time, and a bar chart of returns by workflow status",
        width: 1227,
        height: 911,
      },
      secondary: {
        src: "/projects/returnops-returns.png",
        alt: "ReturnOps returns list with search, status and reason filters above a table of return records",
        width: 1227,
        height: 911,
      },
    },
    featured: true,
  },
  {
    name: "FlowFunds",
    tagline: "Full-Stack Finance Application",
    description:
      "A personal finance application for tracking income, expenses and budgets, with a dashboard that summarises cash flow over time and breaks spending down by category.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    links: [
      { label: "Live demo", href: FLOWFUNDS_LIVE_URL },
      { label: "GitHub", href: FLOWFUNDS_REPO_URL },
    ],
    screenshots: {
      primary: {
        src: "/projects/flowfunds.png",
        alt: "FlowFunds dashboard showing total income, total expenses and available balance cards above a recent transactions list",
        width: 1227,
        height: 911,
      },
      secondary: {
        src: "/projects/flowfunds-transactions.png",
        alt: "FlowFunds transactions page with an add-transaction form and a searchable, filterable list of transactions",
        width: 1227,
        height: 911,
      },
    },
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Prisma"],
  },
  {
    title: "Tooling & Workflow",
    skills: ["Git", "GitHub", "Vercel", "npm"],
  },
];
