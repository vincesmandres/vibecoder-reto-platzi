'use client';

import { useEffect, useRef, useState } from 'react';

interface TopologyMeshProps {
  isHero?: boolean;
  audioData?: number[];
  isPlaying?: boolean;
  isMorphing?: boolean;
  transitionProgress?: number;
}

export default function TopologyMesh({ 
  isHero = false, 
  audioData = [], 
  isPlaying = false,
  isMorphing = false,
  transitionProgress = 0
}: TopologyMeshProps) {
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

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      timeRef.current += 0.006;
      const t = timeRef.current;

      // Clear with charcoal-light background
      ctx.fillStyle = '#1a1612';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Manifold topology rendering - true toroidal/spherical geometry
      drawManifoldTopology(ctx, canvas, t, transitionProgress, isHero);

      animationRef.current = requestAnimationFrame(draw);
    };

    const drawManifoldTopology = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number,
      progress: number,
      hero: boolean
    ) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseScale = hero ? 1.2 : 0.9;

      // Dynamic grid resolution based on hero/section
      const gridDensity = hero ? 40 : 60;
      const cols = Math.ceil(canvas.width / gridDensity);
      const rows = Math.ceil(canvas.height / gridDensity);

      // Compute manifold surface points using toroidal parameterization
      const points: Array<Array<{ x: number; y: number; z: number; intensity: number }>> = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const u = (col / cols) * Math.PI * 2;
          const v = (row / rows) * Math.PI * 2;

          // Major and minor torus radii
          const R = 200 + progress * 50;
          const r = 80 + Math.sin(time * 0.8) * 20;

          // Toroidal surface equation: parametric 3D to 2D projection
          const torusX = (R + r * Math.cos(v)) * Math.cos(u);
          const torusY = (R + r * Math.cos(v)) * Math.sin(u);
          const torusZ = r * Math.sin(v);

          // Layered wave distortions simulating manifold ripples
          const wave1 = Math.sin(u * 3 - time * 1.2) * Math.cos(v * 2 + time * 0.8);
          const wave2 = Math.sin(v * 4 + time * 0.6) * Math.cos(u * 2.5 - time * 0.4);
          const wave3 = Math.sin((u + v) * 2.5 + time * 0.5) * 0.8;

          // Combined displacement
          const displacement = (wave1 + wave2 + wave3) * 15 * baseScale;
          const z = torusZ + displacement;

          // Project 3D to 2D isometric view
          const screenX = centerX + torusX * 0.6 + z * 0.3;
          const screenY = centerY + torusY * 0.4 + z * 0.2;

          // Field line intensity calculation
          const intensity = Math.abs(Math.sin(u * 1.5) * Math.cos(v * 1.5)) * 0.5 + 0.5;

          points[row][col] = { x: screenX, y: screenY, z, intensity };
        }
      }

      // Draw contour field lines (topographic isolines)
      ctx.strokeStyle = `rgba(196, 183, 166, ${0.06 + progress * 0.03})`;
      ctx.lineWidth = 0.7;

      for (let row = 0; row < rows - 1; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[row][col];
          if (col === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // Draw orthogonal field lines perpendicular to contours
      ctx.strokeStyle = `rgba(196, 183, 166, ${0.04 + progress * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 4]);

      for (let col = 0; col < cols; col += 2) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[row][col];
          if (row === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Flowing wave-field lines following gradient paths
      const waveCount = hero ? 8 : 5;
      for (let w = 0; w < waveCount; w++) {
        const wavePhase = (w / waveCount) * Math.PI * 2 + time * 0.4;
        ctx.strokeStyle = `rgba(196, 183, 166, ${0.05 + Math.sin(time + w) * 0.03})`;
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.05) {
          const pathRadius = 120 + Math.sin(t * 2 + wavePhase) * 80;
          const x = centerX + Math.cos(t + wavePhase) * pathRadius;
          const y = centerY + Math.sin(t + wavePhase) * pathRadius * 0.7;

          if (t === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Highlight nodal points at intersections
      if (hero) {
        ctx.fillStyle = `rgba(196, 183, 166, ${0.15 + Math.sin(time * 1.5) * 0.1})`;
        for (let row = 0; row < rows; row += 3) {
          for (let col = 0; col < cols; col += 3) {
            const p = points[row][col];
            const size = 1 + p.intensity * 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Depth vignette for spatial emphasis
      const gradient = ctx.createRadialGradient(centerX, centerY, 100, centerX, centerY, Math.max(canvas.width, canvas.height));
      gradient.addColorStop(0, 'rgba(26, 22, 18, 0)');
      gradient.addColorStop(0.7, 'rgba(26, 22, 18, 0.1)');
      gradient.addColorStop(1, 'rgba(26, 22, 18, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, transitionProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none animate-mesh-breathe"
    />
  );
}
