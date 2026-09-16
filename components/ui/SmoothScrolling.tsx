"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function ScrollManager() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Scroll to top on route change and recalculate page dimensions
  useEffect(() => {
    if (!lenis) return;

    // Reset scroll to top immediately on page transition
    lenis.scrollTo(0, { immediate: true });

    // Staggered resize calls to account for Next.js route transition & layout rendering
    const rafId = requestAnimationFrame(() => {
      lenis.resize();
    });

    const t1 = setTimeout(() => lenis.resize(), 150);
    const t2 = setTimeout(() => lenis.resize(), 500);
    const t3 = setTimeout(() => lenis.resize(), 1000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, lenis]);

  // Continuously observe document body size changes (e.g., images loading, async data, accordions)
  useEffect(() => {
    if (!lenis) return;

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
      }, 80);
    };

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      observer = new ResizeObserver(() => {
        scheduleResize();
      });
      observer.observe(document.body);
    }

    const handleWindowEvents = () => scheduleResize();

    window.addEventListener("load", handleWindowEvents);
    window.addEventListener("resize", handleWindowEvents);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      if (observer) observer.disconnect();
      window.removeEventListener("load", handleWindowEvents);
      window.removeEventListener("resize", handleWindowEvents);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        autoResize: true,
        syncTouch: false,
      }}
    >
      <ScrollManager />
      {children}
    </ReactLenis>
  );
}
