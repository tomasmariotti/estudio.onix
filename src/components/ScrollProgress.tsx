import { useEffect, useRef } from "react";

/**
 * Editorial 1px scroll progress hairline pinned at the top of the viewport.
 * Reflects reading position of the document.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = fillRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const pct = Math.max(0, Math.min(1, window.scrollY / max));
      el.style.width = `${pct * 100}%`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={fillRef} className="scroll-progress__fill" />
    </div>
  );
}
