import React, { useRef, useEffect } from 'react';
import { useScratchCard } from '../hooks/useScratchCard';
import { setupScratchCanvas } from '../utils/canvas';

interface ScratchAreaProps {
  onRevealed: () => void;
}

export function ScratchArea({ onRevealed }: ScratchAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleScratch, handleInteractionStart, handleInteractionEnd } = useScratchCard({
    canvasRef,
    onRevealed,
    threshold: 0.4,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with better resolution
    const scale = window.devicePixelRatio || 1;
    canvas.width = 400 * scale;
    canvas.height = 200 * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale all drawing operations
    ctx.scale(scale, scale);
    setupScratchCanvas(ctx, 400, 200);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '400px', height: '200px' }}
      className="absolute inset-0 w-full h-full cursor-pointer touch-none"
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseMove={handleScratch}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onTouchMove={handleScratch}
    />
  );
}