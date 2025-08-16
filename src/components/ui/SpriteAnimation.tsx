import React, { useEffect, useRef } from "react";

interface SpriteAnimationProps {
  src: string;
  className?: string;
}

const SpriteAnimation: React.FC<SpriteAnimationProps> = ({ src, className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const frameWidth = 64;
  const frameHeight = 64;
  const startFrame = 0;
  const endFrame = 26;
  const cols = 12;
  const frameDelay = 90;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const sprite = new Image();
    sprite.src = src;

    let currentFrame = startFrame;
    let lastTime = 0;

    function drawFrame(frame: number) {
      if (!ctx) return; // <— add this
      const sx = (frame % cols) * frameWidth;
      const sy = Math.floor(frame / cols) * frameHeight;
      ctx.clearRect(0, 0, frameWidth, frameHeight);
      ctx.drawImage(sprite, sx, sy, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
    }

    const update = (timestamp: number) => {
      if (timestamp - lastTime > frameDelay) {
        drawFrame(currentFrame);
        currentFrame = currentFrame >= endFrame ? startFrame : currentFrame + 1;
        lastTime = timestamp;
      }
      animationRef.current = requestAnimationFrame(update);
    };

    sprite.onload = () => {
      lastTime = performance.now();
      animationRef.current = requestAnimationFrame(update);
    };

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [src]);

  return <canvas ref={canvasRef} width={64} height={64} className={className} />;
};

export default SpriteAnimation;
