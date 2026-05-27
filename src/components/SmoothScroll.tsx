import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        // Slower, weightier scroll — feels like entering a room
        duration: 1.95,
        // Quintic ease-out: long deceleration tail
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
        smoothWheel: true,
        wheelMultiplier: 0.62,
        touchMultiplier: 0.95,
        lerp: 0.085,
      });
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      destroy = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      if (destroy) destroy();
      else if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
