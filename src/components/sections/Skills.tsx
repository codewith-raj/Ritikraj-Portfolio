"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const skillCategories = [
  {
    title: "Core Systems",
    skills: ["Web Development","BLOCKCHAIN","AI & Machine Learning", "Technical Management", "Hackathons", "Project Collaboration"],
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "Command & Ops",
    skills: ["Team Leadership", "Event Management", "Operations Strategy", "Community Building","Problem Solving","Creativity & Innovation"],
    color: "from-purple-400 to-pink-400"
  },
  {
    title: "Navigation Tools",
    skills: ["Git", "GitHub", "VS Code","Figma", "Communication Tools", "Project Management Software"],
    color: "from-emerald-400 to-teal-400"
  }
];

const ConstellationCanvas = ({ color = "255, 255, 255" }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000); // Density
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.fillStyle = `rgba(${color}, ${Math.random() * 0.5 + 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
};

export function Skills() {
  return (
    <SectionWrapper>
      <div className="mb-16 md:mb-24 relative">
        <div className="flex items-center gap-2 mb-4 text-accent/80 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
            System Modules
        </div>
        <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tight relative z-10">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Constellations</span>
        </h2>
        
        {/* Decorative background elements for the title */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-500"
          >
             {/* Dynamic Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <ConstellationCanvas color={index === 0 ? "59, 130, 246" : index === 1 ? "168, 85, 247" : "16, 185, 129"} />

             {/* Content */}
             <div className="relative p-8 z-10">
                <div className={`w-12 h-1 mb-6 rounded-full bg-gradient-to-r ${category.color}`} />
                
                <h3 className="text-2xl font-bold text-white mb-6 font-heading uppercase tracking-wide flex items-center gap-3">
                    {category.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-white/70 hover:text-white hover:bg-white/10 hover:border-accent/50 transition-all cursor-default hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
             </div>

             {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
