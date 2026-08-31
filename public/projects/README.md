# Project screenshots

Drop real screenshots here, then reference them from `src/lib/content.ts`.

1. Save the image as `public/projects/<project>.png` (e.g. `returnops.png`).
2. On that project in `PROJECTS`, add:

   ```ts
   image: {
     src: "/projects/returnops.png",
     alt: "ReturnOps internal dashboard",
     width: 1600,
     height: 1000,
   },
   ```

`width` / `height` are the image's real pixel dimensions (used only for aspect
ratio). The card renders the screenshot automatically; with no `image` set it
stays clean and shows nothing — never a placeholder or empty frame.
