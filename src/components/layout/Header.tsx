"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { GITHUB_ORG } from "@/lib/constants";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/runpod-wordmark-text.webp"
            alt="Runpod"
            width={90}
            height={20}
            className="opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-muted/40 text-sm">/</span>
          <span className="font-display italic text-purple-light text-base">
            Labs
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/#projects"
            className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <div className="w-px h-3 bg-border-strong mx-1" />
          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
