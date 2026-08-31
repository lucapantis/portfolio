import { GITHUB_URL } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Luca Pantis</p>
        <div className="flex gap-6">
          <a
            href="#main"
            className="transition-colors hover:text-zinc-300"
          >
            Back to top
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
