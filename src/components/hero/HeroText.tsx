"use client";

import { motion } from "motion/react";

export function HeroText() {
  return (
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
      {/* Lab designation label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-muted/60">
          <span className="w-8 h-px bg-purple/40" />
          Experimental Division
        </span>
      </motion.div>

      {/* Main headline — editorial serif + sans mix */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tighter font-bold"
      >
        <span className="block text-foreground">RunPod</span>
        <span className="block font-display italic font-normal text-purple-light">
          Labs
        </span>
      </motion.h1>

      {/* Subtitle — offset to the right for asymmetry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="mt-8 md:mt-10 md:ml-auto md:max-w-md md:text-right"
      >
        <p className="text-base md:text-lg text-muted leading-relaxed">
          Unofficial experiments in AI&nbsp;&&nbsp;agents from the RunPod
          community. Open source. No&nbsp;roadmap. No&nbsp;guarantees.
        </p>
      </motion.div>

      {/* Bottom ticker line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-16 flex items-center gap-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-light" />
        </span>
        <span className="text-[0.6875rem] font-mono tracking-widest uppercase text-muted/40">
          experimental &middot; open source &middot; break things
        </span>
      </motion.div>
    </div>
  );
}
