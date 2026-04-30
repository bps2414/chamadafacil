"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before transition starts — use to stagger siblings */
  delay?: number;
  /** Fraction of element visible before triggering (0–1). Default: 0.1 */
  threshold?: number;
  /** translateY distance (px) at start. Default: 24 */
  distance?: number;
}

/**
 * Reveal — scroll-triggered entrance animation.
 *
 * Uses Intersection Observer (zero deps, zero layout cost).
 * Animates only opacity + translateY → GPU-composited, mobile-safe.
 * Respects prefers-reduced-motion: elements appear instantly if set.
 * Fires once per element — no re-trigger on scroll-up (better perf).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  distance = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Check system preference once — if reduced-motion, skip animation
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Disconnect immediately — animate once, never re-trigger
          observer.disconnect();
        }
      },
      {
        threshold,
        // Start transition when element is 48px above the bottom viewport edge
        rootMargin: "0px 0px -48px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={
        {
          "--reveal-distance": `${distance}px`,
          transitionDelay: visible ? `${delay}ms` : "0ms",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
