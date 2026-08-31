// Structured content for the portfolio. Keep copy and links here so sections
// stay presentational and repeated items are defined once.

export const GITHUB_URL = "https://github.com/lucapantis";

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
  links: ProjectLink[];
  screenshots?: ProjectScreenshots;
  /** Marks the primary case study. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "ReturnOps",
    tagline: "Returns Management Platform",
    description:
      "A full-stack platform that addresses returns-management workflows end to end — from the customer's return request through to the team's resolution of each case.",
    capabilities: [
      "Guided flow for customers to submit return requests",
      "Internal dashboard for the team to review and approve returns",
      "Case tracking from submission through to resolution",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    links: [{ label: "Live demo", href: "https://returnops-five.vercel.app" }],
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
    links: [],
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
