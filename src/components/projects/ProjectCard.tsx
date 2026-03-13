"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const catalogNumber = String(index + 1).padStart(3, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <article className="diagonal-accent scanline-hover relative h-full rounded-xl border border-border bg-surface backdrop-blur-xl p-7 md:p-9 transition-all duration-500 hover:border-purple/20 hover:bg-surface-hover hover:shadow-[0_8px_60px_-12px_rgba(124,58,237,0.12)]">
          {/* Top row: catalog number + status */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[0.625rem] font-mono tracking-[0.25em] text-muted/30">
              {catalogNumber}
            </span>
            <StatusBadge status={project.status} />
          </div>

          {/* Title — mix of sans and serif for featured */}
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors mb-3">
            {project.featured ? (
              <>
                <span>{project.title.split(" ")[0]}</span>{" "}
                <span className="font-display italic font-normal text-purple-light">
                  {project.title.split(" ").slice(1).join(" ")}
                </span>
              </>
            ) : (
              project.title
            )}
          </h3>

          {/* Tagline */}
          <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            {project.tagline}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {/* Bottom: authors + explore indicator */}
          <div className="flex items-center justify-between pt-5 border-t border-border">
            <div className="flex items-center gap-3">
              {project.authors.map((author) => (
                <div key={author.github} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple/15 flex items-center justify-center">
                    <span className="text-[0.5rem] font-bold text-purple-light">
                      {author.name[0]}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted/60">
                    {author.github}
                  </span>
                </div>
              ))}
            </div>

            <span className="text-xs font-mono tracking-wider uppercase text-muted/40 group-hover:text-purple-light transition-all duration-500 flex items-center gap-2">
              Explore
              <motion.span
                className="inline-block"
                initial={false}
                whileHover={{ x: 4 }}
              >
                &rarr;
              </motion.span>
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
