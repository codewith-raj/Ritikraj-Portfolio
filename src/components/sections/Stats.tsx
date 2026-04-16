"use client";

import { useRef, useEffect } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { 
    value: 8, 
    suffix: "+", 
    label: "Systems Deployed",
    description: "Delivering excellence across web & mobile platforms"
  },
  { 
    value: 2, 
    suffix: "+", 
    label: "Cycles in Orbit", 
    description: "Professional journey in tech & operations"
  },
  { 
    value: 10, 
    suffix: "+", 
    label: "Modules Mastered", 
    description: "Mastering modern frameworks & tools"
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Mission Integrity", 
    description: "Dedicated to project success & innovation"
  },
];

function Counter({ value, suffix, className }: { value: number, suffix: string, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: 2
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(0) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={className} />;
}

export function Stats() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
      
      <div className="flex flex-col items-center mb-20 relative z-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
         >
            <span className="w-12 h-[1px] bg-accent" />
            <span className="text-accent font-mono text-sm tracking-[0.2em] uppercase">Mission Status</span>
            <span className="w-12 h-[1px] bg-accent" />
         </motion.div>
         
         <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold uppercase text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
         >
            System <span className="text-accent">Metrics</span>
         </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            {/* Holographic Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-500 opacity-50" />
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <div className="relative h-full bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-500">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent/30 rounded-br-lg" />
                
                <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Counter 
                        value={stat.value} 
                        suffix={stat.suffix} 
                        className="text-5xl md:text-6xl font-bold font-mono text-white relative z-10"
                    />
                </div>
                
                <h3 className="text-lg font-bold text-accent uppercase tracking-wider mb-2">{stat.label}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
