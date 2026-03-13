"use client";

import { motion } from "motion/react";

export function HeroText() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-base md:text-lg text-foreground/70 max-w-md">
          Experimental AI &amp; agent projects by Runpod
        </p>
      </motion.div>
    </div>
  );
}
