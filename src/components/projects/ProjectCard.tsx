"use client";

import Link from "next/link";
import Image from "next/image";
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
        <article className="diagonal-accent scanline-hover relative rounded-2xl border border-border bg-surface backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-purple/20 hover:bg-surface-hover hover:shadow-[0_8px_60px_-12px_rgba(124,58,237,0.12)]">
          {/* Header: logo + title + status */}
          <div className="flex items-center justify-between p-6 md:p-8 pb-4 md:pb-4">
            <div className="flex items-center gap-3">
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              )}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                {project.title}
              </h3>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Preview image */}
          {project.images && project.images[0] && (
            <div className="relative w-full aspect-[16/9] overflow-hidden mx-6 md:mx-8 rounded-lg border border-border" style={{ width: "calc(100% - 3rem)" }}>
              <Image
                src={project.images[0]}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          )}

          {/* Footer: tagline + tags + arrow */}
          <div className="p-6 md:p-8 pt-4 md:pt-4">
            <p className="text-muted text-base leading-relaxed mb-5">
              {project.tagline}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <span className="text-muted/30 group-hover:text-purple-light group-hover:translate-x-1 transition-all duration-300 text-lg ml-4">
                &rarr;
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
