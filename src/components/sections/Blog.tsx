"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    category: "Holography",
    title: "The Future of Digital Interfaces",
    date: "Oct 24, 2024",
    image: "bg-neutral-800",
  },
  {
    category: "Engineering",
    title: "Optimizing Next.js for Performance",
    date: "Nov 12, 2024",
    image: "bg-stone-800",
  },
  {
    category: "Tactics",
    title: "Building Brands that Last",
    date: "Dec 05, 2024",
    image: "bg-zinc-800",
  },
];

export function Blog() {
  return (
    <SectionWrapper>
      <div className="flex justify-between items-end mb-16 md:mb-24">
        <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase">Stardate Logs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="group cursor-pointer">
             <div className={`aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative ${post.image}`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
             </div>
             <div className="flex items-center gap-4 mb-3 text-sm">
                <span className="text-accent font-medium uppercase tracking-wider">{post.category}</span>
                <span className="text-white/40">{post.date}</span>
             </div>
             <h3 className="text-2xl font-bold leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
