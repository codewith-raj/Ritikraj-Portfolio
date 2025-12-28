"use client";

import { motion } from "framer-motion";
import { 
  Home, 
  Rocket, 
  Award, 
  Compass, 
  Cpu, 
  Zap, 
  User, 
  Mail,
  Radio
} from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const navItems = [
    { name: "Home", icon: Home, href: "#" },
    { name: "Projects", icon: Rocket, href: "#work" },
    { name: "Credentials", icon: Award, href: "#certifications" },
    { name: "Odyssey", icon: Compass, href: "#experience" },
    { name: "Simulations", icon: Cpu, href: "#internship" },
    { name: "Arsenal", icon: Zap, href: "#skills" },
    { name: "Profile", icon: User, href: "#about" },
    { name: "Comms", icon: Mail, action: onOpenContact },
  ];

  return (
    <>


      {/* Floating Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-2 sm:px-4">
        <motion.nav 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center gap-2 md:gap-3 px-3 py-3 md:px-4 md:py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 overflow-x-auto no-scrollbar max-w-full"
        >
          {navItems.map((item) => (
            <DockItem key={item.name} item={item} />
          ))}
        </motion.nav>
      </div>
    </>
  );
}

function DockItem({ item }: { item: any }) {
  const isAction = !!item.action;
  const Component = isAction ? motion.button : motion.a;
  const props = isAction ? { onClick: item.action } : { href: item.href };

  return (
    <div className="relative group flex flex-col items-center shrink-0">
        {/* Tooltip */}
        <span className="absolute -top-12 md:-top-14 px-2 py-1 bg-neutral-900/90 backdrop-blur border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap shadow-xl z-50 hidden md:block">
            {item.name}
            {/* Tiny triangle */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900/90 rotate-45 border-r border-b border-white/10" />
        </span>

        <Component
            {...props}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className={`
                relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl 
                transition-all duration-300
                ${isAction 
                    ? 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                    : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                }
            `}
        >
            <item.icon className="w-5 h-5" strokeWidth={1.5} />
        </Component>
    </div>
  )
}
