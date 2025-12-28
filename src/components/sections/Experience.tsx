"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Briefcase, Calendar, ChevronRight, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    id: "01",
    role: "Head of operation",
    company: "INDGenius",
    period: "2023 - 2025",
    description: "As Head of Operations at INDGenius, I manage events, foster collaboration, and mentor team members to drive innovation and achieve goals.",
    skills: ["Event Management", "Team Leadership", "Mentoring", "Operations"]
  },
  {
    id: "02",
    role: "Member",
    company: "LEARN IT",
    period: "2024 - Present",
    description: "Contributed as a team member by assisting in organizing events, managing technical setups, and supporting the execution of hackathons and workshops.",
    skills: ["Technical Management", "Event Organization", "Hackathons", "Workshops"]
  },
  {
    id: "03",
    role: "Member",
    company: "GDSC",
    period: "2023 - 2025",
    description: "Organized workshops, mentored peers, and collaborated on projects at GDSC to enhance skills and community outreach.",
    skills: ["Community Building", "Mentoring", "Project Collaboration", "Workshops"]
  }
];

export { experiences };

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mobile/Tablet view (Vertical/Scroll) and Desktop view (Winding Road)
  return (
    <SectionWrapper className="relative overflow-hidden py-20">
      <div className="mb-16 md:mb-24">
        <div className="flex items-center gap-2 mb-4 text-accent/80 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
            Trajectory
        </div>
        <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tight">
            Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Odyssey</span>
        </h2>
      </div>

      {/* Desktop Winding Road (Visible on lg screens) */}
      <div className="hidden lg:block relative h-[600px] w-full max-w-6xl mx-auto mt-72 lg:mt-80">
        {/* SVG Road */}
        <svg 
            className="absolute top-0 left-0 w-full h-[200px] z-0" 
            viewBox="0 0 1200 200" 
            preserveAspectRatio="none"
        >
            {/* Road Border/Glow */}
            <path 
                d="M0,100 C50,100 100,50 200,50 C350,50 450,150 600,150 C750,150 850,50 1000,50 C1100,50 1150,100 1200,100" 
                fill="none" 
                stroke="rgba(59, 130, 246, 0.2)" 
                strokeWidth="4" 
                className="blur-sm"
            />
             {/* Main Road */}
            <path 
                d="M0,100 C50,100 100,50 200,50 C350,50 450,150 600,150 C750,150 850,50 1000,50 C1100,50 1150,100 1200,100" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="2" 
            />
            {/* Dashed Line */}
            <path 
                d="M0,100 C50,100 100,50 200,50 C350,50 450,150 600,150 C750,150 850,50 1000,50 C1100,50 1150,100 1200,100" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="1" 
                strokeDasharray="5 10" 
                className="animate-dash"
            />
        </svg>

        {/* Experience Items positioned along the curve */}
        <div className="absolute inset-0 w-full h-full">
            {experiences.map((exp, index) => {
                // Alternating positions: Down, Up, Down
                // Positions aligned with SVG Peaks (200, 50), Valley (600, 150), Peak (1000, 50)
                // Top adjustments: 
                // Down: Peak Y (50) - Pin Half Height (16) = 34px
                // Up: Valley Y (150) + Pin Half Height (16) = 166px (with translateY(-100%))
                const positions = [
                    { left: '16.66%', top: '34px', color: 'bg-red-500', orientation: 'down' },   // Peak 1
                    { left: '50%', top: '166px', color: 'bg-yellow-500', orientation: 'up' },     // Valley
                    { left: '83.33%', top: '34px', color: 'bg-blue-500', orientation: 'down' }    // Peak 2
                ];
                
                const pos = positions[index] || { left: `${(index + 1) * 25}%`, top: '100px', color: 'bg-accent', orientation: 'down' };
                const isUp = pos.orientation === 'up';

                return (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.3 }}
                        className={`absolute w-[300px] transform -translate-x-1/2 ${isUp ? '-translate-y-full' : ''}`}
                        style={{ left: pos.left, top: pos.top }}
                    >
                        {/* Wrapper to handle Up/Down layout */}
                        <div className={`relative flex flex-col items-center ${isUp ? 'flex-col-reverse' : ''}`}>
                            
                            {/* Pin Marker on the Road */}
                            <div className="relative z-20 group cursor-pointer">
                                <div className={`w-4 h-4 ${pos.color} rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center relative`}>
                                    <div className={`absolute inset-0 ${pos.color} rounded-full animate-ping opacity-50`} />
                                </div>
                            </div>

                            {/* Connecting Line */}
                            <div className={`w-px h-16 bg-gradient-to-b from-accent to-transparent ${isUp ? 'mb-[-2px] rotate-180' : 'mt-[-2px]'}`} />

                            {/* Card */}
                            <div className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 relative hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group w-full ${isUp ? 'mb-2' : 'mt-2'}`}>
                                {/* Holographic Corner Accents */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 rounded-tl" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 rounded-tr" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 rounded-bl" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 rounded-br" />

                                {/* Year Badge */}
                                <div className={`absolute ${isUp ? '-bottom-4' : '-top-4'} left-1/2 transform -translate-x-1/2 bg-white/5 border border-white/10 backdrop-blur-md text-accent font-mono text-[10px] py-1 px-3 rounded-full shadow-lg z-10 uppercase tracking-widest`}>
                                    {exp.period}
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-1 font-heading uppercase tracking-wide">{exp.role}</h3>
                                    <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-4 font-mono">
                                        <Building2 className="w-3 h-3 text-accent" />
                                        {exp.company}
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {exp.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {exp.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className="px-2 py-0.5 bg-accent/10 rounded text-[10px] text-accent/80 border border-accent/20 font-mono uppercase">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>

      {/* Mobile/Tablet Fallback (Original Layout) */}
      <div className="block lg:hidden relative">
        <div className="absolute top-[40px] left-0 w-full h-[2px] bg-white/10 hidden md:block" />
        <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-8 pb-12 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
        >
            {experiences.map((exp, index) => (
                <motion.div 
                    key={exp.id}
                    className="relative min-w-[85vw] md:min-w-[400px] snap-center group"
                >
                     {/* Existing Card Design for Mobile */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-xl text-accent">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                    <Calendar className="w-3 h-3" />
                                    {exp.period}
                                </div>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-1">{exp.role}</h3>
                            <div className="flex items-center gap-2 text-accent/80 font-mono text-sm mb-6">
                                <Building2 className="w-4 h-4" />
                                {exp.company}
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-8">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
