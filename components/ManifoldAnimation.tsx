'use client';

import { useEffect, useRef } from 'react';

export default function ManifoldAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    // Generate grid points for manifold
    const gridSize = 8;
    const spacing = canvas.width / (gridSize + 1);
    const points: Array<{ x: number; y: number; ox: number; oy: number }> = [];

    for (let i = 1; i <= gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        const x = i * spacing;
        const y = j * (canvas.height / gridSize);
        points.push({ x, y, ox: x, oy: y });
      }
    }

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f5f3ed';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points with wave deformation
      points.forEach((p, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        const waveX = Math.sin(col * 0.3 + time) * 15;
        const waveY = Math.cos(row * 0.3 + time * 0.7) * 12;
        const radialWave = Math.sin(time + (col + row) * 0.2) * 8;

        p.x = p.ox + waveX + radialWave;
        p.y = p.oy + waveY + Math.sin(time * 0.8 + i * 0.1) * 10;
      });

      // Draw mesh
      ctx.strokeStyle = 'rgba(80, 64, 60, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize - 1; j++) {
          const p1 = points[i * gridSize + j];
          const p2 = points[i * gridSize + j + 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < gridSize - 1; i++) {
        for (let j = 0; j < gridSize; j++) {
          const p1 = points[i * gridSize + j];
          const p2 = points[(i + 1) * gridSize + j];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw contour lines (topography effect)
      ctx.strokeStyle = 'rgba(80, 64, 60, 0.08)';
      ctx.lineWidth = 0.5;
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-96 bg-bone"
    />
  );
}
