"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function About() {
  return (
    <SectionWrapper className="min-h-[50vh] flex items-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl relative z-10">
        <div className="flex items-center gap-2 mb-6 text-accent/80 font-mono text-sm tracking-widest uppercase">
             <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#FF4500]" />
             About
        </div>
        
        <h2 className="text-xl md:text-3xl font-light leading-snug text-white/90 flex flex-col gap-6">
          <span className="text-accent font-medium text-lg md:text-xl tracking-wide font-mono border-l-2 border-accent pl-4">
            // B.Tech Information Technology Student | Web Developer | Blockchain & AI/ML Enthusiast
          </span>
          <div className="relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
             <span className="leading-relaxed">
                I design and build scalable, high-performance web applications and blockchain-powered products, backed by a strong foundation in core computer science principles and modern development practices.
             </span>
          </div>
        </h2>
      </div>
    </SectionWrapper>
  );
}
