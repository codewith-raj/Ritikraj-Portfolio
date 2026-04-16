"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Award, CheckCircle, Shield, Code, ArrowUpRight, Cpu, Terminal, Globe, Lock, Database, Cloud, Layout, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const certifications = [
  {
    id: "01",
    title: "Red Hat System Administration I & II (RH134)",
    issuer: "Red Hat",
    description: "Core system administration skills in Red Hat Enterprise Linux environments.",
    icon: <Server className="w-8 h-8" />,
    date: "Apr 2025",
    skills: ["Linux", "System Admin", "RHEL"],
    color: "from-red-600 to-red-400",
    link: "https://drive.google.com/file/d/1eVOoaZ-1CVeIDgfI31iaqu0i32MAots8/view"
  },
  {
    id: "02",
    title: "Introduction to Forensic Science",
    issuer: "NTU Singapore",
    description: "Fundamentals of forensic science principles and investigative techniques.",
    icon: <Shield className="w-8 h-8" />,
    date: "Apr 2025",
    skills: ["Forensics", "Investigation", "Analysis"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "03",
    title: "Python Programming Fundamentals",
    issuer: "Microsoft",
    description: "Comprehensive foundation in Python programming language and development.",
    icon: <Terminal className="w-8 h-8" />,
    date: "Apr 2025",
    skills: ["Python", "Development", "Logic"],
    color: "from-blue-400 to-yellow-500",
    link: "https://www.coursera.org/account/accomplishments/verify/D488E01HV25U?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  },
  {
    id: "04",
    title: "Google UX Design",
    issuer: "Google",
    description: "Foundations of User Experience (UX) Design including research and prototyping.",
    icon: <Layout className="w-8 h-8" />,
    date: "May 2025",
    skills: ["UX Design", "Wireframing", "Research"],
    color: "from-blue-500 to-red-500",
    link: "https://www.coursera.org/account/accomplishments/verify/XA4SI74PSBTR?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  },
  {
    id: "05",
    title: "Front-End Developer",
    issuer: "IBM",
    description: "Introduction to HTML, CSS, & JavaScript for modern web development.",
    icon: <Code className="w-8 h-8" />,
    date: "Feb 2025",
    skills: ["HTML", "CSS", "JavaScript"],
    color: "from-blue-600 to-blue-400",
    link: "https://www.coursera.org/account/accomplishments/verify/SNTCLTZAEHX6?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  },
  {
    id: "06",
    title: "Oracle Database Programming",
    issuer: "Oracle",
    description: "Database programming with SQL, data management, and query optimization.",
    icon: <Database className="w-8 h-8" />,
    date: "Nov 2024",
    skills: ["SQL", "Database", "Oracle"],
    color: "from-red-500 to-orange-500",
    link: "https://drive.google.com/file/d/1bcck9odYTgPIXkaEI72bj2Z5J6wH2pOM/view"
  },
  {
    id: "07",
    title: "Blockchain Revolution",
    issuer: "INSEAD",
    description: "Introduction to Blockchain Technologies and decentralized systems.",
    icon: <Lock className="w-8 h-8" />,
    date: "Oct 2024",
    skills: ["Blockchain", "Crypto", "Decentralization"],
    color: "from-green-500 to-emerald-500",
    link: "https://www.coursera.org/account/accomplishments/verify/4DPWEZY3U8SO?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  },
  {
    id: "08",
    title: "Programming in Modern C++",
    issuer: "NPTEL",
    description: "Advanced concepts and modern practices in C++ programming.",
    icon: <Cpu className="w-8 h-8" />,
    date: "Oct 2024",
    skills: ["C++", "OOP", "Algorithms"],
    color: "from-purple-500 to-indigo-500",
    link: "https://drive.google.com/file/d/1dwBVpNxtDygd_eHkUVSU5e_tU0t5P4le/view"
  },
  {
    id: "09",
    title: "Social Determinants of Health",
    issuer: "University of Michigan",
    description: "Examine social, economic, and political factors that contribute to health inequalities.",
    icon: <Globe className="w-8 h-8" />,
    date: "Sep 2025",
    skills: ["Health Equity", "Public Health", "Socioeconomics"],
    color: "from-teal-500 to-green-500",
    link: "https://www.coursera.org/account/accomplishments/verify/BVS6K30AVV2F"
  },
  {
    id: "10",
    title: "Social Psychology",
    issuer: "Wesleyan University",
    description: "Understanding human behavior, social influence, and decision-making processes.",
    icon: <Award className="w-8 h-8" />,
    date: "Nov 2025",
    skills: ["Psychology", "Behavior", "Social Science"],
    color: "from-pink-500 to-rose-500",
    link: "https://www.coursera.org/account/accomplishments/verify/MPHI6PJZO7YC"
  }
];

export function Certifications() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLDivElement>(null);

  // Triple the items for infinite scroll effect
  const displayCertificates = [...certifications, ...certifications, ...certifications];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
        if (container) {
            // Update UFO Position
            if (ufoRef.current) {
                const maxScroll = container.scrollWidth / 3; // One set width
                const currentScroll = container.scrollLeft % maxScroll;
                const progress = (currentScroll / maxScroll) * 100;
                ufoRef.current.style.transform = `translateX(${progress}%)`;
                ufoRef.current.style.left = `${progress}%`;
            }

            if (!isPaused) {
                // If we've scrolled past the first set of items (approx 1/3 of width), reset to 0
                if (container.scrollLeft >= container.scrollWidth / 3) {
                     container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1;
                }
            }
        }
        animationFrameId = requestAnimationFrame(scroll);
    };

    if (certifications.length > 0) {
         scroll();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
        <div>
            <div className="flex items-center gap-2 mb-4 text-accent/80 font-mono text-sm tracking-widest uppercase">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#FF4500]" />
                Clearance Levels
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight">
                License <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Keys</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mt-6">
                Recognized industry credentials validating technical expertise and professional growth in a rapidly evolving digital landscape.
            </p>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        className="flex overflow-x-auto gap-8 pb-12 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar"
      >
        <AnimatePresence mode="popLayout">
            {displayCertificates.map((cert, index) => (
            <motion.div
                layout
                key={`${cert.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                onClick={() => cert.link && window.open(cert.link, '_blank')}
                className="group relative cursor-pointer min-w-[85vw] md:min-w-[450px] flex-shrink-0"
            >
                {/* Hover Glow Gradient */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg`} />
                
                {/* Card Main */}
                <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors duration-300 flex flex-col justify-between">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0gMSAwIEwgMCAwIEwgMCAxIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20" />
                    
                    <div>
                        {/* Header */}
                        <div className="relative z-10 flex justify-between items-start mb-8">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                                {cert.icon}
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-accent/80 mb-1">
                                    {cert.date}
                                </div>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
                                    {cert.link ? (
                                        <>
                                            View Credential <ArrowUpRight className="w-3 h-3" />
                                        </>
                                    ) : "Verified"}
                                </span>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                                {cert.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                                <span className="text-sm font-mono text-white/50 uppercase tracking-wider group-hover:text-white/80 transition-colors">{cert.issuer}</span>
                            </div>
                            
                            <p className="text-white/60 mb-8 leading-relaxed text-sm">
                                {cert.description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                        {cert.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/50 group-hover:border-accent/30 group-hover:text-accent transition-colors duration-300">
                            {skill}
                        </span>
                        ))}
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowUpRight className="w-24 h-24 text-white -mb-8 -mr-8" />
                    </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {/* Custom UFO Scrollbar */}
      <div className="w-full h-[1px] bg-white/10 mt-4 relative max-w-6xl mx-auto overflow-visible hidden md:block">
          <div 
            ref={ufoRef}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-accent transition-transform duration-75 ease-linear will-change-transform"
            style={{ left: '0%' }}
          >
             {/* UFO Icon SVG */}
             <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] text-green-400"
             >
                <path d="M2 12h20" />
                <path d="M7 12a5 5 0 0 1 10 0" />
                <path d="M12 7V4" />
                <path d="M3 15h18" />
                <path d="M5 15l2 4h10l2-4" />
             </svg>
             
             {/* Beam/Glow below */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-12 bg-gradient-to-b from-green-400/20 to-transparent blur-sm -z-10" />
          </div>
      </div>
    </SectionWrapper>
  );
}
