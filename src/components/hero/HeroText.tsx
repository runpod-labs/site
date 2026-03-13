"use client";

import { motion } from "motion/react";

export function HeroText() {
  return (
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
      {/* Single line: tagline with status dot — no repeated "RunPod" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] max-w-2xl">
          Unofficial experiments in AI&nbsp;&&nbsp;agents
          <span className="font-display italic font-normal text-purple-light">
            {" "}
            from the community
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-5 flex items-center gap-3"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-light" />
        </span>
        <span className="text-[0.6875rem] font-mono tracking-widest uppercase text-muted/50">
          open source &middot; no roadmap &middot; no guarantees
        </span>
      </motion.div>
    </div>
  );
}
