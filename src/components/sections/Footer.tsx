"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Twitter, Linkedin, Github, Mail, MapPin, FileText } from "lucide-react";

interface FooterProps {
  onOpenContact?: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-20 md:pt-32 pb-10 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] pointer-events-none select-none">
         {/* Atmospheric Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-500/10 blur-[100px] rounded-full" />

         {/* The Beam - Multi-layered for depth */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-orange-500/10 via-orange-500/2 to-transparent"
              style={{ clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0% 100%)' }} />
         
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-orange-400/20 via-transparent to-transparent blur-sm"
              style={{ clipPath: 'polygon(45% 0, 55% 0, 80% 100%, 20% 100%)' }} />

         {/* The UFO Silhouette/Light Source */}
         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-orange-500/30 rounded-[100%] blur-xl animate-pulse" />
         
         {/* Bright Engine Core */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_50px_rgba(255,165,0,1)] z-20" />
         
         {/* Subtle Horizon Line extension */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-900/50 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32">
           <h2 className="text-3xl sm:text-4xl md:text-[10vw] leading-[0.9] font-heading font-bold uppercase max-w-4xl">
              Let&apos;s Build <br />
              <span className="text-white/40">Something Great.</span>
           </h2>
           <div className="mt-8 md:mt-0">
              <Button size="lg" className="text-lg px-8 py-6 md:text-xl md:px-12 md:py-8 rounded-full font-mono uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,69,0,0.5)] transition-shadow duration-300" onClick={() => onOpenContact ? onOpenContact() : window.open('mailto:ritikrajunique111@gmail.com')}>
                 Start a Conversation <ArrowRight className="ml-2" />
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
           <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6 font-heading uppercase tracking-wide">Get In Touch</h3>
              <p className="text-white/60 mb-6 max-w-sm">Open to collaborations, freelance opportunities, and interesting conversations.</p>
              <div className="flex gap-4">
                 <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10" onClick={() => window.open('https://github.com/codewith-raj', '_blank')}>
                    <Github className="w-5 h-5 mr-2" /> GitHub
                 </Button>
                 <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10" onClick={() => window.open('https://www.linkedin.com/in/codewith-raj', '_blank')}>
                    <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                 </Button>
              </div>
           </div>
           
           <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider font-mono text-accent">Contact</h3>
              <ul className="space-y-4 text-white/60 font-mono text-sm">
                 <li className="flex items-center gap-3 group">
                    <Mail className="w-4 h-4 text-accent group-hover:animate-pulse flex-shrink-0" />
                    <a href="mailto:ritikrajunique111@gmail.com" className="hover:text-white transition-colors break-all">ritikrajunique111@gmail.com</a>
                 </li>
                 <li className="flex items-start gap-3 group">
                    <MapPin className="w-4 h-4 text-accent group-hover:animate-bounce flex-shrink-0 mt-0.5" />
                    <span>Manipal University Jaipur<br />Jaipur, Rajasthan, India</span>
                 </li>
                 <li className="flex items-center gap-3 group">
                    <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                    <a href="/resume.pdf" download="Ritik_Raj_Resume.pdf" className="hover:text-white transition-colors uppercase tracking-wider">Download Resume</a>
                 </li>
              </ul>
           </div>
           
           <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider font-mono text-accent">Social</h3>
              <ul className="flex gap-4">
                 <li><a href="https://github.com/codewith-raj" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] rounded-full p-2 block"><Github className="w-6 h-6" /></a></li>
                 <li><a href="https://x.com/RitikRaj257376" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] rounded-full p-2 block"><Twitter className="w-6 h-6" /></a></li>
                 <li><a href="https://www.linkedin.com/in/codewith-raj" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] rounded-full p-2 block"><Linkedin className="w-6 h-6" /></a></li>
              </ul>
           </div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 border-t border-white/5 pt-8 font-mono">
           <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              STATUS: ONLINE // &copy; {new Date().getFullYear()} RITIK RAJ. ALL RIGHTS RESERVED.
           </p>
           <div className="flex gap-8 mt-4 md:mt-0">
              <span className="uppercase tracking-widest text-xs opacity-50">Built with Next.js</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
