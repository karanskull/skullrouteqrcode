export function setupScratchCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Create a subtle pattern
  const pattern = createScratchPattern(ctx);
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, width, height);

  // Add scratch instruction text
  ctx.font = '600 16px system-ui';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Scratch here to reveal', width / 2, height / 2);
}

function createScratchPattern(ctx: CanvasRenderingContext2D) {
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

export function getPointerPosition(
  e: React.MouseEvent | React.TouchEvent,
  rect: DOMRect
) {
  const canvas = e.currentTarget as HTMLCanvasElement;
  const isTouch = 'touches' in e;
  const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  const clientY = isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
  
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}