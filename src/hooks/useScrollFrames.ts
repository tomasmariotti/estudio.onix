import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Preloads sequential frame images and drives frame playback via scroll position.
 * Uses interpolated (lerp) frame transitions for cinematic smoothness.
 * Returns a canvas ref that renders the current frame for maximum performance.
 */
export function useScrollFrames({
  frameCount,
  getFrameSrc,
  containerRef,
  /** Lower = slower & more cinematic (0.04–0.12 sweet spot). Default 0.07 */
  lerpFactor = 0.07,
}: {
  frameCount: number;
  getFrameSrc: (index: number) => string;
  containerRef: React.RefObject<HTMLElement | null>;
  lerpFactor?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Continuous animation state (not React state — raw refs for 60fps)
  const targetFrameRef = useRef(0);
  const currentFrameSmooth = useRef(0); // float for lerp
  const lastDrawnFrame = useRef(-1);
  const rafRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  // ── Preload all images ──
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setProgress(loadedCount / frameCount);
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(loadedCount / frameCount);
      };
      images.push(img);
    }

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frameCount, getFrameSrc]);

  // ── Draw a specific frame to canvas (cover-fit, DPR-aware) ──
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (
      canvas.width !== displayWidth * dpr ||
      canvas.height !== displayHeight * dpr
    ) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Cover-fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = displayHeight;
      drawW = drawH * imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = 0;
    } else {
      drawW = displayWidth;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawH) / 2;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // ── Interpolated animation loop ──
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameSmooth.current;
      const diff = target - current;

      // Lerp toward target
      if (Math.abs(diff) > 0.15) {
        currentFrameSmooth.current += diff * lerpFactor;
      } else {
        currentFrameSmooth.current = target;
      }

      const frameIndex = Math.min(
        Math.max(0, Math.round(currentFrameSmooth.current)),
        frameCount - 1,
      );

      if (frameIndex !== lastDrawnFrame.current) {
        lastDrawnFrame.current = frameIndex;
        drawFrame(frameIndex);
      }

      // Keep looping while not settled
      if (Math.abs(target - currentFrameSmooth.current) > 0.05) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [lerpFactor, frameCount, drawFrame]);

  // ── Scroll-driven target frame update ──
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    drawFrame(0);
    lastDrawnFrame.current = 0;

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollable = container.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - containerTop;
      const fraction = Math.max(0, Math.min(1, scrolled / scrollable));

      // Set target as a float — the lerp loop handles smooth interpolation
      targetFrameRef.current = fraction * (frameCount - 1);
      startAnimationLoop();
    };

    const onResize = () => drawFrame(lastDrawnFrame.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      isAnimatingRef.current = false;
    };
  }, [loaded, frameCount, containerRef, drawFrame, startAnimationLoop]);

  return { canvasRef, loaded, progress };
}
