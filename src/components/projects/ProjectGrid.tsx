"use client";

import { motion } from "motion/react";
import { Project } from "@/types/project";
import { ProjectFilters } from "./ProjectFilters";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="section-label">[01] Projects</span>
          <span className="flex-1 h-px bg-border" />
        </div>
      </motion.div>

      <ProjectFilters projects={projects} />
    </section>
  );
}
