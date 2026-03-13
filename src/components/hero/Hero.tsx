"use client";

import dynamic from "next/dynamic";
import { HeroText } from "./HeroText";

const SpinningLogo = dynamic(
  () => import("./SpinningLogo").then((mod) => mod.SpinningLogo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple/10 animate-pulse" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-14 overflow-hidden">
      {/* 3D Logo — positioned to the right for asymmetric layout */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[600px] h-[600px] md:w-[750px] md:h-[750px] lg:w-[900px] lg:h-[900px] opacity-50 md:opacity-60">
        <SpinningLogo />
      </div>

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Text content — left-aligned */}
      <HeroText />
    </section>
  );
}
