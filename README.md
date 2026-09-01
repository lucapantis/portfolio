# Portfolio — Luca Pantis

Personal portfolio for **Luca Pantis**, a junior full-stack developer. It is a
small, fast marketing-style site: a single scrolling homepage plus one in-depth
project case study, built with the Next.js App Router and deployed on Vercel.

## Sections

The homepage (`/`) is composed of:

- **Hero** — name, focus and primary calls to action, with a compact profile card.
- **About** — short summary of how I work.
- **Projects** — the featured projects (see below), each with a description,
  capability notes, stack tags, real screenshots and links.
- **Skills** — grouped list of tools and technologies.
- **Contact** — email, LinkedIn and GitHub actions.

A sticky header with in-page navigation and a theme toggle, a scroll-progress
indicator, and a footer with the same contact links wrap every route.

## Featured projects

### ReturnOps — Returns Management Platform

An internal operations tool for managing product returns: logging each return,
moving it through a fixed five-stage inspection-and-resolution workflow, and
reporting on return volume and reasons, with default-deny role-based access
control and a database-enforced, append-only audit trail. Built with Next.js,
TypeScript, PostgreSQL, Prisma, Zod and Auth.js.

- Live demo: https://returnops-five.vercel.app
- Source: https://github.com/lucapantis/returnops
- **Case study: [`/projects/returnops`](src/app/projects/returnops/page.tsx)** —
  a dedicated route covering the business problem, the solution, roles and
  permissions, architecture and the key engineering decisions.

### FlowFunds — Full-Stack Finance Application

A personal finance application for tracking income, expenses and budgets, with a
dashboard that summarises cash flow over time and breaks spending down by
category. Built with React, TypeScript, Node.js, Express, PostgreSQL and Prisma.

- Live demo: https://flowfunds-two.vercel.app
- Source: https://github.com/lucapantis/flowfunds

Project copy, links and screenshot metadata live in one place:
[`src/lib/content.ts`](src/lib/content.ts).

## Technology stack

- **Next.js 16** (App Router) with **Turbopack**
- **React 19**
- **TypeScript** in strict mode
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **ESLint 9** with `eslint-config-next`
- `next/font` (Geist / Geist Mono), `next/image` for screenshots
- `next/og` for the build-time Open Graph image; a repository-native SVG app icon

## Theme and accessibility

- **Dark / light theme.** Dark is the deterministic default. The active theme is
  an explicit user choice, stored in `localStorage` and reflected as
  `data-theme` on `<html>`. Theme state is read through `useSyncExternalStore`
  with a fixed server snapshot, so the server and first client render are
  identical — no hydration mismatch, and no `suppressHydrationWarning`. Colours
  are semantic CSS custom properties defined in
  [`src/app/globals.css`](src/app/globals.css).
- **Reduced motion.** Every animation (scroll reveals, hero glow drift, card
  tilt, theme-swap transition) is gated on `prefers-reduced-motion`; the reveal
  animations are progressive enhancement, so content is fully visible without
  JavaScript.
- **Keyboard and structure.** Skip-to-content link, visible focus rings on all
  interactive elements, semantic landmarks and heading hierarchy, `aria-current`
  on the active nav link, and a mobile menu that is fully keyboard operable and
  closes on `Escape`.
- **Images.** Screenshot `alt` text describes what is actually on screen; the
  screenshot frame never renders a placeholder or fabricated UI.
- External links open in a new tab with `rel="noopener noreferrer"`; the email
  action is a `mailto:` link.

## Local setup

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Validation

```bash
npm run lint     # ESLint
npm run build    # production build + TypeScript type-check
```

## Deployment

Deployed to **Vercel**. The production build is fully static; the app icon and
Open Graph image are generated at build time.
