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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <article className="diagonal-accent scanline-hover relative h-full rounded-xl border border-border bg-surface backdrop-blur-xl p-5 md:p-6 transition-all duration-500 hover:border-purple/20 hover:bg-surface-hover hover:shadow-[0_8px_60px_-12px_rgba(124,58,237,0.12)]">
          {/* Top row: catalog number + status */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[0.625rem] font-mono tracking-[0.25em] text-muted/30">
              {catalogNumber}
            </span>
            <StatusBadge status={project.status} />
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors mb-2">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
            {project.tagline}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1 mb-5">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
            {project.tags.length > 3 && (
              <span className="text-[0.625rem] font-mono text-muted/40 self-center ml-1">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Bottom: author + arrow */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-purple/15 flex items-center justify-center">
                <span className="text-[0.5rem] font-bold text-purple-light">
                  {project.authors[0]?.name[0]}
                </span>
              </div>
              <span className="text-xs font-mono text-muted/50">
                {project.authors[0]?.github}
              </span>
            </div>

            <span className="text-muted/30 group-hover:text-purple-light group-hover:translate-x-0.5 transition-all duration-300 text-sm">
              &rarr;
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
