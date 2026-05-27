import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            // Promote to its own compositor layer for the entry transition only
            target.style.willChange = "opacity, transform, filter";
            window.setTimeout(() => target.classList.add("is-in"), delay);
            // Drop will-change after the transition completes (~1.6s + delay)
            window.setTimeout(() => {
              target.style.willChange = "";
            }, 1700 + delay);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.04, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref as never} className={`reveal ${className}`}>{children}</Tag>;
}
