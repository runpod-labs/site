"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function ProjectDetailClient() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 text-[0.6875rem] font-mono tracking-wider uppercase text-muted/50 hover:text-purple-light transition-colors"
      >
        <span className="w-5 h-px bg-current" />
        Back to all projects
      </Link>
    </motion.div>
  );
}
