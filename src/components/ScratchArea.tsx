import React, { useRef, useEffect, useState } from 'react';
import { useScratchCard } from '../hooks/useScratchCard';
import { setupScratchCanvas } from '../utils/canvas';

interface ScratchAreaProps {
  onRevealed: () => void;
}

export function ScratchArea({ onRevealed }: ScratchAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { handleScratch, handleInteractionStart, handleInteractionEnd } = useScratchCard({
    canvasRef,
    onRevealed,
    threshold: 0.4,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    // Set canvas size with better resolution
    const scale = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * scale;
    canvas.height = dimensions.height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale all drawing operations
    ctx.scale(scale, scale);
    setupScratchCanvas(ctx, dimensions.width, dimensions.height);
  }, [dimensions]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer touch-none"
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseMove={handleScratch}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onTouchMove={handleScratch}
      />
    </div>
  );
}