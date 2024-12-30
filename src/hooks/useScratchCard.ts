import { useState, useCallback } from 'react';
import { getPointerPosition } from '../utils/canvas';
import type { PointerEvent } from '../utils/canvas';

interface UseScratchCardProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onRevealed: () => void;
  threshold?: number;
}

export function useScratchCard({
  canvasRef,
  onRevealed,
  threshold = 0.5
}: UseScratchCardProps) {
  const [isScratching, setIsScratching] = useState(false);

  const checkRevealThreshold = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    if (transparent / (pixels.length / 4) > threshold) {
      onRevealed();
    }
  }, [onRevealed, threshold]);

  const handleScratch = useCallback((e: PointerEvent) => {
    if (!isScratching || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect) return;

    const pos = getPointerPosition(e, rect);
    if (!pos) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkRevealThreshold(ctx);
  }, [isScratching, canvasRef, checkRevealThreshold]);

  const handleInteractionStart = useCallback(() => setIsScratching(true), []);
  const handleInteractionEnd = useCallback(() => setIsScratching(false), []);

  return {
    handleScratch,
    handleInteractionStart,
    handleInteractionEnd,
  };
}