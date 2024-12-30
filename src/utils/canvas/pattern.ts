export function createScratchPattern(ctx: CanvasRenderingContext2D) {
  const patternCanvas = document.createElement('canvas');
  const patternCtx = patternCanvas.getContext('2d')!;
  patternCanvas.width = 50;
  patternCanvas.height = 50;

  // Fill background
  patternCtx.fillStyle = '#18181B';
  patternCtx.fillRect(0, 0, 50, 50);

  // Add subtle diagonal lines
  patternCtx.strokeStyle = '#27272A';
  patternCtx.lineWidth = 1;
  for (let i = -50; i < 100; i += 10) {
    patternCtx.beginPath();
    patternCtx.moveTo(i, 0);
    patternCtx.lineTo(i + 50, 50);
    patternCtx.stroke();
  }

  return ctx.createPattern(patternCanvas, 'repeat')!;
}