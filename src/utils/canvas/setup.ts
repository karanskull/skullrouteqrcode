import { createScratchPattern } from './pattern';

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