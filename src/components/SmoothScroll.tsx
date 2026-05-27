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
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.75,
        touchMultiplier: 1.0,
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
