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
 * Optional real screenshot for a project. Left undefined until a genuine local
 * image exists in `public/`; components render nothing when it is absent.
 */
export type ProjectImage = {
  /** Path under `public/`, e.g. "/projects/returnops.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  /** Short, verified capability statements. Featured project only, for now. */
  capabilities?: string[];
  stack: string[];
  links: ProjectLink[];
  image?: ProjectImage;
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
  },
  {
    name: "RBM Steel",
    tagline: "Commercial WordPress / WooCommerce Website",
    description:
      "A commercial WordPress and WooCommerce website built and delivered for a real client, covering the product catalogue, content pages and online store.",
    stack: ["WordPress", "WooCommerce", "PHP"],
    links: [{ label: "Live site", href: "https://rbmsteel.ro" }],
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
