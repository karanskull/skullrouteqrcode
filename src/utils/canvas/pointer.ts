import type { PointerEvent } from './types';

export function getPointerPosition(e: PointerEvent, rect: DOMRect) {
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