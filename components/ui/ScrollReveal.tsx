"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  duration?: number;
  staggerIndex?: number;
  distance?: number;
  once?: boolean;
}

// Premium easing: power3.out equivalent
const EASE = [0.16, 1, 0.3, 1] as const;

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.9,
  staggerIndex = 0,
  distance = 40,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-20% 0px" });

  const totalDelay = delay + staggerIndex * 0.1;

  const getInitialStyle = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "scale":
        return { opacity: 0, scale: 1.06 };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateStyle = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "none":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialStyle()}
      animate={isInView ? getAnimateStyle() : getInitialStyle()}
      transition={{ duration, delay: totalDelay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
