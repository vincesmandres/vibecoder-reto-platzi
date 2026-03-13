'use client';

import { useEffect, useRef, useState } from 'react';

interface Canvas2DMeshProps {
  audioData: number[];
  isPlaying: boolean;
}

export default function Canvas2DMesh({ audioData, isPlaying }: Canvas2DMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const gridSize = 40;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate average audio intensity
      const avgIntensity = audioData && audioData.length > 0 
        ? audioData.slice(0, 64).reduce((a, b) => a + b, 0) / 64 / 255 
        : 0;
      
      const bassIntensity = audioData && audioData.length > 0
        ? audioData.slice(0, 8).reduce((a, b) => a + b, 0) / 8 / 255 
        : 0;

      const amplitude = isPlaying ? 0.5 + avgIntensity * 2 : 0.3;
      const waveSpeed = isPlaying ? 1 + bassIntensity : 0.5;

      // Store points for wireframe
      const points: Array<Array<{ x: number; y: number; z: number }>> = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize;
          const y = row * gridSize;

          // Create wave displacement based on position and time
          const distFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          // Multiple wave frequencies for organic feel
          const wave1 = Math.sin(distFromCenter * 8 - t * waveSpeed) * amplitude;
          const wave2 = Math.sin(x * 0.01 + t * 0.5) * amplitude * 0.5;
          const wave3 = Math.cos(y * 0.01 - t * 0.3) * amplitude * 0.5;

          // Audio reactive displacement
          const freqIndex = Math.floor((col / cols) * Math.min(audioData.length, 64));
          const freqValue = audioData[freqIndex] || 0;
          const audioDisplacement = isPlaying ? (freqValue / 255) * 30 : 0;

          const z = (wave1 + wave2 + wave3) * 20 + audioDisplacement;

          points[row][col] = { x, y, z };
        }
      }

      // Draw horizontal lines
      ctx.strokeStyle = `rgba(196, 183, 166, ${0.15 + avgIntensity * 0.2})`;
      ctx.lineWidth = 1;

      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[row][col];
          const screenY = p.y + p.z;
          
          if (col === 0) {
            ctx.moveTo(p.x, screenY);
          } else {
            ctx.lineTo(p.x, screenY);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[row][col];
          const screenY = p.y + p.z;
          
          if (row === 0) {
            ctx.moveTo(p.x, screenY);
          } else {
            ctx.lineTo(p.x, screenY);
          }
        }
        ctx.stroke();
      }

      // Draw highlight points at intersections when playing
      if (isPlaying && avgIntensity > 0.1) {
        ctx.fillStyle = `rgba(196, 183, 166, ${avgIntensity * 0.5})`;
        for (let row = 0; row < rows; row += 2) {
          for (let col = 0; col < cols; col += 2) {
            const p = points[row][col];
            const screenY = p.y + p.z;
            const size = 1 + ((audioData[col % 64] || 0) / 255) * 2;
            ctx.beginPath();
            ctx.arc(p.x, screenY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [audioData, isPlaying, mounted]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}
