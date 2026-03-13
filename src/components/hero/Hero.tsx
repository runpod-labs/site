"use client";

import dynamic from "next/dynamic";

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
    <section className="relative flex items-center justify-center pt-20 pb-6 overflow-hidden">
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />

      {/* 3D Logo — centered and large */}
      <div className="relative z-10 w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]">
        <SpinningLogo />
      </div>
    </section>
  );
}
