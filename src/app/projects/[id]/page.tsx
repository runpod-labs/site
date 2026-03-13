import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Markdown from "react-markdown";
import { getAllProjectIds, getProjectById } from "@/lib/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return params.then(({ id }) => {
    const project = getProjectById(id);
    if (!project) return { title: "Not Found" };

    return {
      title: project.title,
      description: project.tagline,
      openGraph: {
        title: project.title,
        description: project.tagline,
        url: `${SITE_URL}/projects/${project.id}`,
        type: "article",
      },
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.tagline,
          url: `${SITE_URL}/projects/${project.id}`,
          applicationCategory: "AI/ML Tool",
          author: project.authors.map((a) => ({
            "@type": "Person",
            name: a.name,
            url: `https://github.com/${a.github}`,
          })),
          codeRepository: project.repoUrl,
          dateCreated: project.createdAt,
          dateModified: project.updatedAt,
        }}
      />

      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          {/* Back link */}
          <ProjectDetailClient />

          {/* Two-column layout on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-20">
            {/* Main content */}
            <div>
              {/* Header */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <StatusBadge status={project.status} />
                  <span className="w-px h-3 bg-border-strong" />
                  <span className="text-[0.6875rem] font-mono tracking-wider text-muted/40">
                    Updated {project.updatedAt}
                  </span>
                </div>

                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={80}
                    height={80}
                    className="rounded-xl mb-6"
                  />
                )}

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                  {project.title.split(" ")[0]}
                  <br />
                  <span className="font-display italic font-normal text-purple-light">
                    {project.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-10">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 mb-20">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-purple/15 border border-purple/25 text-purple-light text-sm font-medium hover:bg-purple/25 hover:border-purple/40 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View Source
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-strong text-foreground/80 text-sm font-medium hover:bg-surface-hover hover:border-purple/15 transition-all duration-300"
                  >
                    Live Demo &rarr;
                  </a>
                )}
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-strong text-foreground/80 text-sm font-medium hover:bg-surface-hover hover:border-purple/15 transition-all duration-300"
                  >
                    Documentation
                  </a>
                )}
              </div>

              {/* Screenshots */}
              {project.images && project.images.length > 0 && (
                <div className="mb-16 space-y-4">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        width={1200}
                        height={675}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description / Content */}
              <div className="project-prose prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border prose-p:text-muted prose-p:leading-relaxed prose-a:text-purple-light prose-a:no-underline hover:prose-a:underline prose-code:bg-surface-solid prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-accent prose-pre:bg-surface-solid prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-strong:text-foreground prose-li:text-muted prose-ul:space-y-1">
                <Markdown>{project.description}</Markdown>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:pt-28">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Project meta card */}
                <div className="rounded-xl border border-border bg-surface backdrop-blur-xl p-6 space-y-5">
                  <h4 className="text-[0.6875rem] font-mono tracking-[0.2em] uppercase text-muted/50">
                    Project Info
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[0.625rem] font-mono tracking-wider uppercase text-muted/40 block mb-1">
                        Status
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    <div>
                      <span className="text-[0.625rem] font-mono tracking-wider uppercase text-muted/40 block mb-1">
                        Created
                      </span>
                      <span className="text-sm text-foreground/70">
                        {project.createdAt}
                      </span>
                    </div>

                    <div>
                      <span className="text-[0.625rem] font-mono tracking-wider uppercase text-muted/40 block mb-1">
                        Last Update
                      </span>
                      <span className="text-sm text-foreground/70">
                        {project.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Authors */}
                <div className="rounded-xl border border-border bg-surface backdrop-blur-xl p-6">
                  <h4 className="text-[0.6875rem] font-mono tracking-[0.2em] uppercase text-muted/50 mb-5">
                    Built by
                  </h4>
                  <div className="space-y-3">
                    {project.authors.map((author) => (
                      <a
                        key={author.github}
                        href={`https://github.com/${author.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/15 flex items-center justify-center group-hover:bg-purple/20 group-hover:border-purple/30 transition-all">
                          <span className="text-xs font-bold text-purple-light">
                            {author.name[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                            {author.name}
                          </div>
                          <div className="text-[0.625rem] font-mono text-muted/50">
                            @{author.github}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
