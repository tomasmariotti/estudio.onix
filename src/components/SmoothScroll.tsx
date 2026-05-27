import { useEffect } from "react";

/**
 * Lenis smooth scroll.
 *
 * Mobile strategy: leave touch scrolling NATIVE.
 * - iOS rubber-band, momentum, and swipe gestures feel best when not intercepted.
 * - On mobile we skip Lenis entirely; the browser delivers 60/120fps native scroll.
 * - On desktop (mouse wheel / trackpad) we run Lenis with a long, weighted curve.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Detect coarse-pointer / touch primary devices
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (isTouch) return; // native scroll on mobile/tablet

    let rafId = 0;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.95,
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
