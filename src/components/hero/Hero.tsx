"use client";

import dynamic from "next/dynamic";
import { HeroText } from "./HeroText";

const SpinningLogo = dynamic(
  () => import("./SpinningLogo").then((mod) => mod.SpinningLogo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple/10 animate-pulse" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section className="relative h-[50dvh] min-h-[360px] flex items-center pt-14 overflow-hidden">
      {/* 3D Logo — right side */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] opacity-50 md:opacity-65">
        <SpinningLogo />
      </div>

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Text content */}
      <HeroText />
    </section>
  );
}
