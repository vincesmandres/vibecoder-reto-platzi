'use client';

import { useEffect, useRef, useState } from 'react';

interface TopologyMeshProps {
  isHero?: boolean;
  audioData?: number[];
  isPlaying?: boolean;
}

export default function TopologyMesh({ isHero = false, audioData = [], isPlaying = false }: TopologyMeshProps) {
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

    const draw = () => {
      timeRef.current += 0.002;
      const t = timeRef.current;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = isHero ? 60 : 40;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Audio data processing
      const avgIntensity = audioData && audioData.length > 0 
        ? audioData.slice(0, 64).reduce((a, b) => a + b, 0) / 64 / 255 
        : 0;
      
      const amplitude = isPlaying ? 0.4 + avgIntensity * 1.5 : isHero ? 0.25 : 0.2;

      // Points for topology
      const points: Array<Array<{ x: number; y: number; z: number }>> = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize;
          const y = row * gridSize;

          const distFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          // Topological wave field
          const wave1 = Math.sin(distFromCenter * 6 - t * 0.3) * amplitude;
          const wave2 = Math.sin(x * 0.005 + t * 0.2) * amplitude * 0.4;
          const wave3 = Math.cos(y * 0.005 - t * 0.15) * amplitude * 0.4;

          const freqIndex = Math.floor((col / cols) * Math.min(audioData.length, 64));
          const freqValue = audioData[freqIndex] || 0;
          const audioDisplacement = isPlaying ? (freqValue / 255) * 20 : 0;

          const z = (wave1 + wave2 + wave3) * 15 + audioDisplacement;
          points[row][col] = { x, y, z };
        }
      }

      // Draw lines with varying opacity
      const baseOpacity = isHero ? 0.08 : 0.12;
      const dynamicOpacity = isHero ? baseOpacity + avgIntensity * 0.08 : baseOpacity;
      
      ctx.strokeStyle = `rgba(196, 183, 166, ${dynamicOpacity})`;
      ctx.lineWidth = 0.8;

      // Horizontal lines
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[row][col];
          if (col === 0) ctx.moveTo(p.x, p.y + p.z);
          else ctx.lineTo(p.x, p.y + p.z);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[row][col];
          if (row === 0) ctx.moveTo(p.x, p.y + p.z);
          else ctx.lineTo(p.x, p.y + p.z);
        }
        ctx.stroke();
      }

      // Subtle nodal points
      if (isHero && t % 2 < 0.1) {
        ctx.fillStyle = `rgba(196, 183, 166, ${0.06 + avgIntensity * 0.04})`;
        for (let row = 0; row < rows; row += 3) {
          for (let col = 0; col < cols; col += 3) {
            const p = points[row][col];
            ctx.beginPath();
            ctx.arc(p.x, p.y + p.z, 1.2, 0, Math.PI * 2);
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
  }, [audioData, isPlaying, mounted, isHero]);

  if (!mounted) return <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />;

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
