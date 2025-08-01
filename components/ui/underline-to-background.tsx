"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface UnderlineToBackgroundProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  isExternal?: boolean;
}

export function UnderlineToBackground({ 
  children, 
  className = "",
  isActive = false,
  isExternal = false 
}: UnderlineToBackgroundProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span 
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        className="absolute inset-x-0 bottom-0 bg-accent origin-left"
        initial={false}
        animate={isActive || isHovered ? "active" : "inactive"}
        variants={{
          inactive: { height: "2px" },
          active: { height: "100%" }
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      />
      <span className="relative z-10 inline-flex items-center gap-1">
        <motion.span
          className="inline-block"
          initial={false}
          animate={isActive || isHovered ? "active" : "inactive"}
          variants={{
            inactive: { color: "currentColor" },
            active: { color: "var(--background)" }
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        {isExternal && (
          <motion.svg
            className="w-3 h-3 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={false}
            animate={isActive || isHovered ? "active" : "inactive"}
            variants={{
              inactive: { color: "currentColor" },
              active: { color: "var(--background)" }
            }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </motion.svg>
        )}
      </span>
    </motion.span>
  );
}