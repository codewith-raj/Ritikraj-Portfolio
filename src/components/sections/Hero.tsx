"use client";

import { Button } from "@/components/ui/Button";
import { useScroll, useTransform, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const roles = [
  "Full Stack Developer",
  "Blockchain Engineer",
  "AI / ML Enthusiast",
  "SDE Intern @ Bluestock™",
  "Open Source Contributor",
];

const floatingSnippets = [
  { text: "const solution = await build();", color: "text-blue-300/25", top: "18%", left: "12%", delay: 0 },
  { text: "<Innovation />", color: "text-accent/25", bottom: "22%", right: "12%", delay: 1 },
  { text: "blockchain.deploy(contract)", color: "text-purple-300/20", top: "62%", left: "6%", delay: 2 },
  { text: "AI.train(model, epochs=100)", color: "text-cyan-300/20", top: "28%", right: "6%", delay: 1.5 },
  { text: "git commit -m 'ship it'", color: "text-green-300/20", bottom: "38%", left: "18%", delay: 3 },
  { text: "npm run deploy", color: "text-yellow-300/20", top: "72%", right: "18%", delay: 2.5 },
];

interface HeroProps {
  onOpenContact: () => void;
}

export function Hero({ onOpenContact }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const { scrollY } = useScroll();

  // Mouse parallax springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Scroll-driven title animation
  const fontSize = useTransform(scrollY, [0, 400], ["18vw", "1.5rem"]);
  const titleOpacity = useTransform(scrollY, [400, 450], [1, 0]);

  // Mouse parallax handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50);
      mouseY.set((e.clientY - window.innerHeight / 2) / 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Periodic glitch trigger on title
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 35 : 75;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Canvas star field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; z: number }[] = [];
    const numStars = 1000;

    for (let i = 0; i < numStars; i++) {
      stars.push({ x: Math.random() * w - w / 2, y: Math.random() * h - h / 2, z: Math.random() * w });
    }

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.4)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      const cx = w / 2;
      const cy = h / 2;
      const speed = 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed;
        if (star.z <= 0) {
          star.z = w;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }
        const x = (star.x / star.z) * w + cx;
        const y = (star.y / star.z) * h + cy;
        const radius = Math.max(0.1, (1 - star.z / w) * 2.5);
        if (x >= 0 && x < w && y >= 0 && y < h) {
          ctx.globalAlpha = 1 - star.z / w;
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
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Live clock
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setTime(fmt());
    const interval = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-12 pb-8 overflow-hidden bg-[#050505]">

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

        {/* Big Title with Glitch */}
        <div className="md:col-span-12 relative z-50 h-[150vh] -mb-[100vh] pointer-events-none">
          <div className="sticky top-6 pl-1">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize, opacity: titleOpacity }}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
              className="leading-[0.8] font-heading font-bold uppercase tracking-tighter drop-shadow-2xl select-none relative"
            >
              {/* Normal layer */}
              <span className="text-white/90">{glitch ? "" : "RITIK"}</span>

              {/* Glitch layers */}
              {glitch && (
                <>
                  <span className="absolute inset-0 text-accent/80" style={{ clipPath: "inset(20% 0 60% 0)", transform: "translateX(-3px)" }}>RITIK</span>
                  <span className="absolute inset-0 text-cyan-400/60" style={{ clipPath: "inset(55% 0 20% 0)", transform: "translateX(3px)" }}>RITIK</span>
                  <span className="absolute inset-0 text-white/90" style={{ clipPath: "inset(0 0 75% 0)" }}>RITIK</span>
                  <span className="absolute inset-0 text-white/90" style={{ clipPath: "inset(70% 0 0 0)" }}>RITIK</span>
                </>
              )}
            </motion.h1>
          </div>
        </div>

        {/* Background — Solar System + Canvas */}
        <div className="md:col-span-12 absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden bg-[#030014]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Mouse-parallax solar system */}
          <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center [perspective:1200px] scale-[0.4] md:scale-75 lg:scale-100">
              <div className="relative [transform-style:preserve-3d] [transform:rotateX(70deg)]">

                {/* Sun */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-orange-500/20 blur-[60px] rounded-full [transform:rotateX(-70deg)]" />
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-red-500/10 blur-[40px] rounded-full [transform:rotateX(-70deg)]" />
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-100 via-orange-400 to-red-600 shadow-[0_0_40px_rgba(255,100,0,0.6)] relative z-20 [transform:rotateX(-70deg)]">
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
                  <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                    className={`absolute rounded-full border ${orbit.color}`}
                    style={{ width: orbit.size, height: orbit.size, top: -orbit.size / 2, left: -orbit.size / 2 }}
                  >
                    <motion.div className={`absolute top-1/2 rounded-full ${orbit.planetColor} shadow-[0_0_15px_currentColor]`}
                      style={{ width: orbit.planetSize, height: orbit.planetSize, marginTop: -orbit.planetSize / 2, right: -orbit.planetSize / 2 }}
                    >
                      <div className="absolute bottom-full left-1/2 w-[1px] h-10 bg-gradient-to-t from-white/50 to-transparent [transform:rotateX(-70deg)] origin-bottom" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Asteroid Belt */}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full border border-dashed border-white/5"
                  style={{ width: 650, height: 650, top: -325, left: -325 }} />
              </div>
            </div>
          </motion.div>

          {/* Decorative lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/3 left-10 md:left-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute bottom-1/3 right-10 md:right-20 w-48 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            {/* Floating code snippets */}
            {floatingSnippets.map((snippet, i) => (
              <motion.div
                key={i}
                animate={{ y: [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10, i % 2 === 0 ? -10 : 10], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 5 + i, repeat: Infinity, delay: snippet.delay }}
                className={`absolute font-mono text-[10px] ${snippet.color} hidden md:block`}
                style={{ top: snippet.top, bottom: snippet.bottom, left: snippet.left, right: snippet.right }}
              >
                {snippet.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Left — Info Block */}
        <div className="md:col-span-5 flex flex-col justify-end pb-24 gap-5">

          {/* Typewriter Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 font-mono text-sm min-h-[1.5rem]"
          >
            <span className="text-accent font-bold">&gt;</span>
            <span className="text-white/80">{displayText}</span>
            <span className="w-0.5 h-[1em] bg-accent animate-pulse inline-block" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-white/60 font-light leading-relaxed max-w-md"
          >
            Building meaningful projects, websites,{" "}
            <span className="text-white/30">and digital experiences through thoughtful design and clean execution.</span>
          </motion.p>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-white/40">
              <MapPin className="w-3 h-3 text-accent/60 flex-shrink-0" />
              <span>Manipal University Jaipur, Rajasthan, India</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-white/40">
              <GraduationCap className="w-3 h-3 text-accent/60 flex-shrink-0" />
              <span>B.Tech Information Technology · 2023–2027</span>
            </div>
          </motion.div>

          {/* Local Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 text-white/40 font-mono text-xs"
          >
            <span className="uppercase tracking-widest">Local Time</span>
            <span className="text-white/70 tabular-nums">{time}</span>
          </motion.div>
        </div>

        {/* Bottom Right — Tagline + Tech Pills */}
        <div className="md:col-span-7 flex flex-col items-end justify-start pt-2 md:pt-6 gap-8">
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

      {/* Footer Bar */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-t border-white/10 pt-8 mt-12 relative z-10">

        {/* Status Badge */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/30 uppercase tracking-widest font-mono">Status</span>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm font-mono text-white/70 tracking-wide">Available for Opportunities</span>
          </div>
        </div>

        {/* CTA + Scroll indicator */}
        <div className="flex items-center gap-6">
          {/* Scroll down pulse */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex flex-col items-center gap-1 text-white/20"
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/30" />
            <ChevronDown className="w-3 h-3" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              onClick={onOpenContact}
              size="lg"
              className="rounded-full px-8 py-8 text-lg bg-transparent border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 group"
            >
              START A PROJECT
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:-rotate-45" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
