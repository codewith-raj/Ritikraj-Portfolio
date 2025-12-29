"use client";

import { Button } from "@/components/ui/Button";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const companies = [
  "MySelf"
];

interface HeroProps {
  onOpenContact: () => void;
}

export function Hero({ onOpenContact }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState("");
  const { scrollY } = useScroll();
  
  // Transform for the hero text
  const fontSize = useTransform(scrollY, [0, 400], ["18vw", "1.5rem"]);
  const opacity = useTransform(scrollY, [400, 450], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const stars: {x: number, y: number, z: number}[] = [];
    const numStars = 1000;
    
    // Initialize stars
    for(let i=0; i<numStars; i++) {
        stars.push({
            x: Math.random() * w - w/2,
            y: Math.random() * h - h/2,
            z: Math.random() * w
        });
    }

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.4)'; // Clear with slight fade for trails? Or just solid clear
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#ffffff';
        const cx = w/2;
        const cy = h/2;
        
        const speed = 2; // Speed of travel

        for(let i=0; i<numStars; i++) {
            const star = stars[i];
            
            // Move star towards viewer
            star.z -= speed;
            
            // Reset if passes viewer
            if (star.z <= 0) {
                star.z = w;
                star.x = Math.random() * w - w/2;
                star.y = Math.random() * h - h/2;
            }
            
            // Project 3D to 2D
            // Perspective formula: screen_x = x / z * scale
            const x = (star.x / star.z) * w + cx;
            const y = (star.y / star.z) * h + cy;
            
            // Size increases as it gets closer
            const radius = Math.max(0.1, (1 - star.z / w) * 2.5);
            
            // Only draw if within screen bounds
            if (x >= 0 && x < w && y >= 0 && y < h) {
                const opacity = (1 - star.z / w);
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1.0;
        animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-12 pb-8 overflow-hidden bg-[#050505]">
      
      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Big Title */}
      <div className="md:col-span-12 relative z-50 h-[150vh] -mb-[100vh] pointer-events-none">
          <div className="sticky top-6 pl-1">
            <motion.h1 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize, opacity }}
                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                className="leading-[0.8] font-heading font-bold uppercase tracking-tighter text-white/90 drop-shadow-2xl"
            >
                RITIK
            </motion.h1>
          </div>
      </div>

        {/* Center Visual - New Horizontal Solar System */}
        <div className="md:col-span-12 absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden bg-[#030014]">
             
             {/* Canvas Star Field */}
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

             {/* 3D Solar System Container */}
             <div className="absolute inset-0 flex items-center justify-center [perspective:1200px] scale-[0.4] md:scale-75 lg:scale-100 transition-transform duration-500">
                <div className="relative [transform-style:preserve-3d] [transform:rotateX(70deg)]">
                    
                    {/* Central Star / Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                        {/* Glows */}
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-orange-500/20 blur-[60px] rounded-full [transform:rotateX(-70deg)]" 
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-red-500/10 blur-[40px] rounded-full [transform:rotateX(-70deg)]" 
                        />
                        
                        {/* The Sun Body */}
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-100 via-orange-400 to-red-600 shadow-[0_0_40px_rgba(255,100,0,0.6)] relative z-20 flex items-center justify-center [transform:rotateX(-70deg)]">
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-sm animate-pulse" />
                        </div>
                    </div>

                    {/* Orbits */}
                    {[
                        { size: 280, duration: 12, color: "border-blue-400/30", planetSize: 8, planetColor: "bg-blue-300" },
                        { size: 420, duration: 20, color: "border-purple-400/25", planetSize: 12, planetColor: "bg-purple-300" },
                        { size: 580, duration: 32, color: "border-cyan-400/20", planetSize: 10, planetColor: "bg-cyan-300" },
                        { size: 800, duration: 45, color: "border-emerald-400/15", planetSize: 14, planetColor: "bg-emerald-300" },
                        { size: 1100, duration: 60, color: "border-white/10", planetSize: 6, planetColor: "bg-white" },
                    ].map((orbit, i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360 }}
                            transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                            className={`absolute rounded-full border ${orbit.color}`}
                            style={{
                                width: orbit.size,
                                height: orbit.size,
                                top: -orbit.size / 2,
                                left: -orbit.size / 2,
                            }}
                        >
                            {/* Planet */}
                            <motion.div 
                                className={`absolute top-1/2 rounded-full ${orbit.planetColor} shadow-[0_0_15px_currentColor]`}
                                style={{
                                    width: orbit.planetSize,
                                    height: orbit.planetSize,
                                    marginTop: -orbit.planetSize / 2,
                                    right: -orbit.planetSize / 2,
                                }}
                            >
                                {/* Counter-rotate planet to face camera if needed, or just let it be a sphere */}
                                {/* Adding a vertical marker/pin to give it more "tech" feel */}
                                <div className="absolute bottom-full left-1/2 w-[1px] h-10 bg-gradient-to-t from-white/50 to-transparent [transform:rotateX(-70deg)] origin-bottom" />
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Asteroid Belt or Dust */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                        className="absolute rounded-full border border-dashed border-white/5"
                        style={{ width: 650, height: 650, top: -325, left: -325 }}
                    />

                </div>
             </div>

             {/* Decorative Tech Lines/Graphics */}
             <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/3 left-10 md:left-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-1/3 right-10 md:right-20 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                
                {/* Floating Code Bits */}
                <motion.div 
                    animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-[20%] left-[20%] font-mono text-[10px] text-blue-300/30"
                >
                    System.init(CORE);
                </motion.div>
                <motion.div 
                    animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-[20%] right-[20%] font-mono text-[10px] text-purple-300/30"
                >
                    &lt;Vision /&gt;
                </motion.div>
             </div>
        </div>

        {/* Bottom Left Text */}
        <div className="md:col-span-5 flex flex-col justify-end pb-24">
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-md"
            >
             Building meaningful Projects, websites, <span className="text-white/40">and digital experiences through thoughtful design and clean execution.</span>
            </motion.p>
            
            <div className="mt-8 flex items-center gap-4 text-white/60 font-mono text-sm">
                <span>LOCAL TIME</span>
                <span className="min-w-[80px] text-white">{time}</span>
            </div>
        </div>

        {/* Middle Right Text */}
        <div className="md:col-span-7 flex flex-col items-end justify-center md:justify-start pt-2 md:pt-6">
           <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl md:text-5xl font-heading font-bold text-right leading-none text-white/90"
           >
              Beyond <br />
              Visuals. <br />
              Built with <br />
              Vision.
           </motion.h2>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-white/10 pt-8 mt-12">
        
        {/* Trusted By */}
        <div className="flex flex-col gap-4">
           <span className="text-xs text-white/40 uppercase tracking-widest">Trusted By:</span>
           <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {companies.map((company, i) => (
                <span key={i} className="text-lg font-bold font-heading flex items-center gap-2">
                   <Globe className="w-4 h-4" /> {company}
                </span>
             ))}
           </div>
        </div>

        {/* CTA Button */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button onClick={onOpenContact} size="lg" className="rounded-full px-8 py-8 text-lg bg-transparent border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 group">
            START A PROJECT 
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:-rotate-45" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
