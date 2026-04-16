"use client";

import { useState, useRef, useEffect } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ArrowRight, Code, Zap, Layers, Smartphone, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { 
    id: "01", 
    title: "NOVA", 
    category: "AI Assistant", 
    type: "App", 
    description: "Next-gen Virtual Assistant leveraging AI to streamline digital interactions.",
    tech: ["Python", "NLP", "ML"],
    image: "/Virtual-AI-assistant-1536x806.png", 
    icon: <Smartphone className="w-4 h-4" /> 
  },
  { 
    id: "02", 
    title: "MUJ-Marketplace", 
    category: "E-commerce", 
    type: "Web", 
    description: "Campus-focused e-commerce platform for students to buy, sell, and trade securely.",
    tech: ["Node.js", "MongoDB", "Express"],
    image: "/mqdefault.jpg", 
    icon: <Zap className="w-4 h-4" /> 
  },
  { 
    id: "03", 
    title: "Spiko", 
    category: "Extension", 
    type: "Web", 
    description: "Real-time audio translation browser extension for inclusive online education.",
    tech: ["React", "Chrome Ext", "GCP"],
    image: "/1631341422849.jpg", 
    icon: <Code className="w-4 h-4" /> 
  },
  { 
    id: "04", 
    title: "Vartul", 
    category: "Blockchain", 
    type: "Web", 
    description: "Decentralized social platform with Proof-of-Stake consensus and token rewards.",
    tech: ["Blockchain", "Smart Contracts"],
    image: "/vezzra.svg", 
    icon: <Layers className="w-4 h-4" /> 
  },
  { 
    id: "05", 
    title: "Khushi Travels", 
    category: "Travel", 
    type: "Web", 
    description: "Full-stack cab booking web application for smooth and reliable rides.",
    tech: ["Full Stack", "React", "Node"],
    image: "/ChatGPT Image Dec 28, 2025, 12_29_12 AM.png", 
    icon: <Zap className="w-4 h-4" /> 
  }
];

const categories = ["All", "Web", "App"];

export function LatestWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const spacecraftRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.type === activeCategory
  );

  // Duplicate projects for seamless infinite scroll
  // We create 3 sets to ensure we always have content to scroll through
  const displayProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];

  // Reset scroll position when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
        if (container) {
            // Update Spacecraft Position
            if (spacecraftRef.current) {
                const maxScroll = container.scrollWidth / 3; // One set width
                const currentScroll = container.scrollLeft % maxScroll;
                const progress = (currentScroll / maxScroll) * 100;
                spacecraftRef.current.style.transform = `translateX(${progress}%)`;
                // Adjust for the width of the spacecraft to keep it within bounds if needed, 
                // but percentage on parent width is fine for now
                spacecraftRef.current.style.left = `${progress}%`;
            }

            if (!isPaused) {
                // If we've scrolled past the first set of items (1/3 of total width), reset to 0
                // This creates the seamless loop illusion
                if (container.scrollLeft >= container.scrollWidth / 3) {
                     container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1; // Adjust speed here (1px per frame)
                }
            }
        }
        animationFrameId = requestAnimationFrame(scroll);
    };

    // Only start scrolling if we have enough content to scroll
    if (filteredProjects.length > 0) {
         scroll();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredProjects]);

  return (
    <SectionWrapper className="relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 relative z-10">
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4 text-accent/80 font-mono text-sm tracking-widest uppercase">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                    Mission Highlights
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-8xl font-heading font-bold uppercase tracking-tight">
                    Stellar <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Creations</span>
                </h2>
            </div>
            
            {/* Futuristic Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative px-6 py-2 rounded-lg font-mono text-sm tracking-wider uppercase transition-all duration-300 overflow-hidden group ${
                            activeCategory === cat 
                            ? "text-black bg-accent border-accent shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                            : "text-white/60 border border-white/10 hover:border-accent/50 hover:text-white"
                        }`}
                    >
                        <span className={`absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${activeCategory === cat ? 'hidden' : ''}`} />
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <Button 
          variant="outline" 
          className="hidden md:flex backdrop-blur-md border-white/20 hover:bg-white/10 font-mono uppercase tracking-wider"
          onClick={() => window.open('https://github.com/codewith-raj?tab=repositories', '_blank')}
        >
          Access Full Database <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        className="flex overflow-x-auto gap-8 pb-12 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar"
      >
        <AnimatePresence mode="popLayout">
            {displayProjects.map((project, index) => (
            <motion.div
                layout
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="group relative cursor-pointer min-w-[85vw] md:min-w-[500px] flex-shrink-0"
            >
                {/* Holographic Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="absolute -inset-[1px] bg-gradient-to-b from-accent/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />

                {/* Card Content */}
                <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-4 overflow-hidden hover:border-white/20 transition-colors duration-500">
                    
                    {/* Tech Decor */}
                    <div className="absolute top-6 right-6 z-20 flex gap-2">
                         <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                            SYS.{project.id}
                        </div>
                    </div>

                    <div className={`aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden relative ${project.image.startsWith('/') ? 'bg-black' : project.image} mb-6`}>
                        {project.image.startsWith('/') && (
                           <div className={`absolute inset-0 ${project.title === 'Vartul' ? 'p-10' : 'p-4'}`}>
                               <img 
                                  src={project.image} 
                                  alt={project.title} 
                                  className={`w-full h-full ${project.title === 'Vartul' ? 'object-contain' : 'object-cover'} rounded-2xl shadow-lg border border-white/5 transition-transform duration-700 group-hover:scale-105`}
                               />
                           </div>
                        )}
                        {/* Image Overlay/Glitch Effect */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
                        
                        {/* Reveal Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-3 justify-end">
                             <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-xs font-mono uppercase text-white/80 w-fit">
                                {project.type} Project
                             </div>
                             <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                             <div className="flex flex-wrap gap-2">
                                 {project.tech && project.tech.map((t, i) => (
                                     <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase text-accent/80">
                                         {t}
                                     </span>
                                 ))}
                             </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end px-2 pb-2">
                        <div>
                            <div className="flex items-center gap-3 mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                {project.icon}
                                <span className="text-sm font-mono uppercase tracking-wider">{project.category}</span>
                            </div>
                            <h3 className="text-3xl font-heading font-bold uppercase text-white group-hover:text-accent transition-colors duration-300 tracking-tight">
                                {project.title}
                            </h3>
                        </div>
                        
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                            {/* Orbit Effect */}
                            <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-8 md:hidden">
        <Button variant="outline" className="w-full">
          View All Projects <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Custom Spacecraft Scrollbar - Visible on all screens for the effect */}
      <div className="w-full h-[1px] bg-white/10 mt-4 relative max-w-6xl mx-auto overflow-visible hidden md:block">
          <div 
            ref={spacecraftRef}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-accent transition-transform duration-75 ease-linear will-change-transform"
            style={{ left: '0%' }}
          >
             <Rocket className="w-6 h-6 rotate-90 drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]" />
             {/* Engine trail */}
             <div className="absolute top-1/2 right-full -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent to-accent blur-[1px]" />
          </div>
      </div>
    </SectionWrapper>
  );
}
