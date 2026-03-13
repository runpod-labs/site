"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-1.5 mb-14">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3.5 py-1.5 rounded text-[0.6875rem] font-mono tracking-wider uppercase transition-all duration-300 ${
            activeTag === null
              ? "bg-purple/15 text-purple-light border border-purple/30"
              : "text-muted/50 border border-transparent hover:text-muted hover:border-border"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3.5 py-1.5 rounded text-[0.6875rem] font-mono tracking-wider uppercase transition-all duration-300 ${
              activeTag === tag
                ? "bg-purple/15 text-purple-light border border-purple/30"
                : "text-muted/50 border border-transparent hover:text-muted hover:border-border"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag || "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="font-mono text-sm text-muted/40">
            No projects match this filter.
          </p>
        </div>
      )}
    </>
  );
}
