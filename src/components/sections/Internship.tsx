"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Building2, Calendar, MapPin, Briefcase, Terminal, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const internships = [
 {
  id: "01",
  role: "Software Engineer Intern",
  company: "Bluestock™🔺",
  period: "Jul 2025 - Aug 2025",
  location: "Remote (Maharashtra, India)",
  description:
    "As an SDE Intern, I actively contribute to the development of scalable and efficient software solutions. My responsibilities include writing clean and maintainable code, debugging and resolving issues, collaborating with senior developers in Agile teams, and participating in code reviews to ensure high-quality deliverables.",
  skills: ["JavaScript", "React", "Tailwind CSS", "Agile","Python", "Code Review"],
  color: "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
},
{
  id: "02",
  role: "Summer Intern (PHP & Web Development)",
  company: "Bandva Agro Pvt. Ltd.",
  period: "Jun 2025 - Jul 2025",
  location: "Hybrid (Uttar Pradesh, India)",
  description:
    "Worked on PHP-based web development tasks, contributing to backend logic and frontend integration. Assisted in developing and maintaining internal web applications while gaining practical exposure to real-world business requirements and deployment workflows.",
  skills: ["PHP", "Web Development", "MySQL", "HTML", "CSS"],
  color: "border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
},
{
  id: "03",
  role: "Web Development Intern",
  company: "BINDISA AGRITECH PVT LTD",
  period: "May 2025 - Jul 2025",
  location: "Remote (Gaya, Bihar, India)",
  description:
    "Contributed to web development projects by implementing responsive UI components and improving website functionality. Collaborated remotely with the team to deliver features, fix bugs, and enhance overall user experience.",
  skills: ["JavaScript", "HTML", "CSS", "Git", "Responsive Design"],
  color: "border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
}

];

export function Internship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper className="py-20 relative overflow-hidden">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
         {/* Grid lines */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="mb-20 md:mb-32 relative z-10">
        <div className="flex items-center gap-2 mb-4 text-accent/80 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Professional Growth
        </div>
        <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tight">
            Intern<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ships</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Central Timeline Line (Desktop) */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block transform -translate-x-1/2">
            <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-accent via-purple-500 to-blue-500 origin-top"
            />
        </div>

        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {internships.map((internship, index) => {
                const isEven = index % 2 === 0;
                return (
                    <motion.div 
                        key={internship.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                        {/* Timeline Node (Desktop) */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                            <div className="w-4 h-4 bg-black border-2 border-accent rounded-full relative z-20">
                                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                             {/* Date Badge (Mobile: Top, Desktop: Opposite side) */}
                             <div className="md:hidden mb-4 flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider bg-accent/5 w-fit px-3 py-1 rounded-full border border-accent/20">
                                <Calendar className="w-3 h-3" />
                                {internship.period}
                             </div>

                             <div className="group relative">
                                {/* Holographic Card Background */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                                
                                <div className={`relative bg-[#080808] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] ${internship.color ? '' : ''}`}>
                                    {/* Tech Pattern Overlay */}
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] opacity-50" />
                                    
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className={`flex flex-col gap-1 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{internship.role}</h3>
                                            <div className="flex items-center gap-2 text-white/60 text-sm font-mono uppercase tracking-wider">
                                                <Building2 className="w-4 h-4" />
                                                {internship.company}
                                            </div>
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 text-white/40 text-xs font-mono uppercase ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <MapPin className="w-3 h-3" />
                                            {internship.location}
                                        </div>

                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {internship.description}
                                        </p>

                                        <div className={`flex flex-wrap gap-2 mt-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {internship.skills.map((skill, i) => (
                                                <span 
                                                    key={i} 
                                                    className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono uppercase text-accent/80 group-hover:border-accent/30 transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Date Label (Desktop Only) */}
                        <div className={`hidden md:flex w-[calc(50%-40px)] items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                            <div className="flex items-center gap-4 text-white/40 font-mono text-sm uppercase group">
                                <span className={`w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-accent transition-all duration-300 ${isEven ? 'order-1' : 'order-2'}`} />
                                <span className={`${isEven ? 'order-2' : 'order-1'} group-hover:text-white transition-colors`}>{internship.period}</span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </SectionWrapper>
  );
}
