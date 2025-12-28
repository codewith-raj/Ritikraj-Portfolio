"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        "bg-card hover:bg-card-hover border border-white/5 rounded-2xl p-8 transition-colors duration-300 backdrop-blur-sm",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
