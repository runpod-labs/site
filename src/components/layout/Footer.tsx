import { GITHUB_ORG, RUNPOD_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        {/* Top section with large italic text */}
        <div className="mb-12">
          <p className="font-display italic text-2xl md:text-3xl text-muted/40 max-w-xl leading-snug">
            Where experiments live and
            <br />
            no one expects anything.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-3 max-w-md">
            <p className="text-xs font-mono tracking-wider uppercase text-muted/60">
              Disclaimer
            </p>
            <p className="text-sm text-muted/80 leading-relaxed">
              Runpod Labs is an experimental space. Projects here are unofficial
              and come with zero guarantees. Break things. Learn
              stuff. Ship it anyway.
            </p>
            <p className="text-xs text-muted/40">
              Not an official{" "}
              <a
                href={RUNPOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-muted/60 transition-colors"
              >
                Runpod
              </a>{" "}
              product.
            </p>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-muted/50">
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/80 transition-colors"
            >
              GitHub
            </a>
            <a
              href={RUNPOD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/80 transition-colors"
            >
              Runpod
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
