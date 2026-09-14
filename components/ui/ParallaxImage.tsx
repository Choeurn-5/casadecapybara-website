"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  parallaxAmount?: number;
  scaleFrom?: number;
  unoptimized?: boolean;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = "",
  containerClassName = "",
  parallaxAmount = 40,
  scaleFrom = 1.06,
  unoptimized = true,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-parallaxAmount, parallaxAmount]
  );

  const imageProps = fill
    ? { fill: true as const }
    : { width: width || 800, height: height || 600 };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        className="w-full h-full"
        style={{ y }}
        initial={{ scale: prefersReduced ? 1 : scaleFrom, opacity: 0.6 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: prefersReduced ? 1 : scaleFrom, opacity: 0.6 }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          unoptimized={unoptimized}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
