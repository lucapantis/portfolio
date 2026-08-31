# Project screenshots

Drop real screenshots here, then reference them from `src/lib/content.ts`.

1. Save each image as `public/projects/<project>-<screen>.png`
   (e.g. `returnops.png` for the main shot, `returnops-returns.png` for a
   supporting one). Use the visible screen name, in kebab-case.
2. On that project in `PROJECTS`, add a `screenshots` object with a `primary`
   and an optional `secondary`:

   ```ts
   screenshots: {
     primary: {
       src: "/projects/returnops.png",
       alt: "ReturnOps dashboard showing returns totals and a bar chart by status",
       width: 1227,
       height: 911,
     },
     secondary: {
       src: "/projects/returnops-returns.png",
       alt: "ReturnOps returns list with search and status filters",
       width: 1227,
       height: 911,
     },
   },
   ```

`width` / `height` are the image's real pixel dimensions (used only for aspect
ratio). `alt` must describe what is actually visible on that screen — never an
invented feature. The card renders `primary` large with `secondary` composed
beside it; with no `screenshots` set the card stays clean and shows nothing —
never a placeholder or empty frame.
