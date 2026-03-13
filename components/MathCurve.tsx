'use client';

import { useEffect, useRef } from 'react';

interface MathCurveProps {
  complexity: number; // 1-13, increases curve complexity
}

export default function MathCurve({ complexity }: MathCurveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Background glow effect
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.min(width, height) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 217, 180, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 217, 180, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.01;
      const t = timeRef.current;

      // Draw mathematical curves based on complexity
      ctx.strokeStyle = 'rgba(0, 217, 180, 0.6)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // Primary curve - complexity determines polynomial degree
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const normalizedX = (x / width) * Math.PI * 4;
        let y = height / 2;
        
        // Add harmonics based on complexity
        for (let i = 1; i <= complexity; i++) {
          const amplitude = (height / 4) / Math.sqrt(i);
          const frequency = i * 0.5;
          const phase = t * (1 + i * 0.2);
          y += Math.sin(normalizedX * frequency + phase) * amplitude;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary curve (phase shifted)
      ctx.strokeStyle = 'rgba(0, 217, 180, 0.3)';
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const normalizedX = (x / width) * Math.PI * 4;
        let y = height / 2;
        
        for (let i = 1; i <= complexity; i++) {
          const amplitude = (height / 5) / Math.sqrt(i);
          const frequency = i * 0.5;
          const phase = t * (1 + i * 0.2) + Math.PI;
          y += Math.sin(normalizedX * frequency + phase) * amplitude;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw floating particles based on complexity
      const particleCount = complexity * 3;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + t * 0.5;
        const radius = 80 + Math.sin(t * 2 + i) * 30 + complexity * 5;
        const px = width / 2 + Math.cos(angle) * radius;
        const py = height / 2 + Math.sin(angle) * radius * 0.6;
        const size = 2 + Math.sin(t * 3 + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 180, ${0.3 + Math.sin(t + i) * 0.2})`;
        ctx.fill();
      }

      // Lissajous curve overlay for higher complexity
      if (complexity > 5) {
        ctx.strokeStyle = 'rgba(0, 217, 180, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 360; i++) {
          const angle = (i / 180) * Math.PI;
          const a = complexity - 4;
          const b = complexity - 3;
          const px = width / 2 + Math.sin(a * angle + t) * (width / 4);
          const py = height / 2 + Math.sin(b * angle) * (height / 4);
          
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [complexity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
