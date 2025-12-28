"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { LatestWork } from "@/components/sections/LatestWork";
import { Stats } from "@/components/sections/Stats";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Internship } from "@/components/sections/Internship";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactModal } from "@/components/ui/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <Hero onOpenContact={() => setIsContactOpen(true)} />
      
      <div id="about">
        <About />
      </div>
      
      <div id="work">
        <LatestWork />
      </div>
      
      <Stats />
      
      <div id="certifications">
        <Certifications />
      </div>
      
      <div id="experience">
        <Experience />
      </div>

      <div id="internship">
        <Internship />
      </div>

      <div id="skills">
        <Skills />
      </div>
      
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
