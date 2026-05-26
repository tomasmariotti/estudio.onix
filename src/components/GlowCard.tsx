import { useRef, type ReactNode, type MouseEvent } from "react";

export function GlowCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "a" | "article" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      onMouseMove={onMove}
      className={`glow-card ${className}`}
    >
      <span className="glow-card__glow" aria-hidden />
      <span className="glow-card__inner">{children}</span>
    </Comp>
  );
}
