"use client";

import { motion } from "motion/react";
import { Project } from "@/types/project";
import { ProjectFilters } from "./ProjectFilters";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">[01] Projects</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        {/* Section heading — editorial mix */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
            What we&apos;re
            <br />
            <span className="font-display italic font-normal text-purple-light">
              building
            </span>
          </h2>
          <p className="text-sm text-muted max-w-xs md:text-right leading-relaxed">
            Things we&apos;re building, breaking, and experimenting with. Click
            any project to learn more.
          </p>
        </div>
      </motion.div>

      <ProjectFilters projects={projects} />
    </section>
  );
}
