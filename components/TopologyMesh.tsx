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
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    resize();
    window.addEventListener('resize', resize);

    const gridSize = isHero ? 80 : 50;
    const cols = Math.ceil(canvas.width / gridSize) + 2;
    const rows = Math.ceil(canvas.height / gridSize) + 2;

    const draw = () => {
      timeRef.current += 0.001;
      const t = timeRef.current;

      // Clear with subtle dark bg
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Audio data processing
      const avgIntensity = audioData && audioData.length > 0 
        ? audioData.slice(0, 64).reduce((a, b) => a + b, 0) / 64 / 255 
        : 0;
      
      const midIntensity = audioData && audioData.length > 0
        ? audioData.slice(32, 96).reduce((a, b) => a + b, 0) / 64 / 255
        : 0;

      const baseAmplitude = isHero ? 0.3 : 0.2;
      const audioAmplitude = isPlaying ? 0.2 + avgIntensity * 1.2 : 0;
      const amplitude = baseAmplitude + audioAmplitude;

      // Compute height field (topography)
      const points: Array<Array<{ x: number; y: number; z: number }>> = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize - gridSize / 2;
          const y = row * gridSize - gridSize / 2;

          const distFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          // Multi-layered wave field with different frequencies
          const radialWave = Math.sin(distFromCenter * 5 - t * 0.15) * amplitude;
          const horizontalFlow = Math.sin(x * 0.004 + t * 0.1) * amplitude * 0.6;
          const verticalFlow = Math.cos(y * 0.004 - t * 0.08) * amplitude * 0.6;
          const turbulence = Math.sin(distFromCenter * 12 + t * 0.3) * amplitude * 0.3;

          // Audio reactive tertiary wave
          const freqIndex = Math.floor((col / cols) * Math.min(audioData.length, 64));
          const freqValue = audioData[freqIndex] || 0;
          const audioWave = isPlaying ? (freqValue / 255 - 0.5) * 0.4 : 0;

          const z = (radialWave + horizontalFlow + verticalFlow + turbulence) * 20 + audioWave * 15;

          points[row][col] = { 
            x: col * gridSize, 
            y: row * gridSize, 
            z,
            height: z
          };
        }
      }

      // Layer 1: Field lines (contours) - subtle flowing lines
      ctx.strokeStyle = `rgba(196, 183, 166, ${0.04 + avgIntensity * 0.04})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 4]);

      // Diagonal field lines (flowing curves)
      for (let i = -Math.max(cols, rows); i < Math.max(cols, rows) * 2; i++) {
        ctx.beginPath();
        for (let step = 0; step < Math.max(cols, rows) * 2; step++) {
          const row = Math.min(Math.max(Math.floor(i + step * 0.7), 0), rows - 1);
          const col = Math.min(Math.max(step, 0), cols - 1);
          const p = points[row] && points[row][col] ? points[row][col] : null;
          if (!p) continue;

          const screenY = p.y + p.z * 0.8;
          if (step === 0) ctx.moveTo(p.x, screenY);
          else ctx.lineTo(p.x, screenY);
        }
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Layer 2: Primary mesh grid (main structure)
      const meshOpacity = isHero ? 0.08 : 0.12;
      const dynamicMeshOpacity = meshOpacity + avgIntensity * 0.06;
      ctx.strokeStyle = `rgba(196, 183, 166, ${dynamicMeshOpacity})`;
      ctx.lineWidth = 0.9;

      // Horizontal lines
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[row][col];
          const screenY = p.y + p.z * 0.9;
          if (col === 0) ctx.moveTo(p.x, screenY);
          else ctx.lineTo(p.x, screenY);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[row][col];
          const screenY = p.y + p.z * 0.9;
          if (row === 0) ctx.moveTo(p.x, screenY);
          else ctx.lineTo(p.x, screenY);
        }
        ctx.stroke();
      }

      // Layer 3: Contour highlights (topographic isolines)
      if (isHero) {
        const contourLevels = [0.3, 0.6, 0.9];
        const maxZ = Math.max(...points.flat().map(p => p.z));
        const minZ = Math.min(...points.flat().map(p => p.z));
        const zRange = maxZ - minZ;

        contourLevels.forEach((level, idx) => {
          const contourValue = minZ + zRange * level;
          ctx.strokeStyle = `rgba(196, 183, 166, ${0.02 + (idx * 0.01) + avgIntensity * 0.02})`;
          ctx.lineWidth = 0.6;
          
          for (let row = 0; row < rows - 1; row++) {
            ctx.beginPath();
            let started = false;
            for (let col = 0; col < cols - 1; col++) {
              const p1 = points[row][col];
              const p2 = points[row + 1] ? points[row + 1][col] : null;
              const p3 = points[row][col + 1];

              if (!p1 || !p2 || !p3) continue;

              // Simple contour tracing
              const onContour = (p1.z - contourValue) * (p2.z - contourValue) < 0 ||
                              (p1.z - contourValue) * (p3.z - contourValue) < 0;

              if (onContour) {
                const y = p1.y + p1.z * 0.9;
                if (!started) {
                  ctx.moveTo(p1.x, y);
                  started = true;
                } else {
                  ctx.lineTo(p1.x, y);
                }
              }
            }
            ctx.stroke();
          }
        });
      }

      // Layer 4: Subtle nodal energy points (sparse, elegant)
      if (isHero && avgIntensity > 0.05) {
        const nodeOpacity = Math.min(0.04 + avgIntensity * 0.06, 0.12);
        ctx.fillStyle = `rgba(196, 183, 166, ${nodeOpacity})`;
        
        for (let row = 0; row < rows; row += 4) {
          for (let col = 0; col < cols; col += 4) {
            const p = points[row][col];
            const energy = Math.abs(p.z) / 20;
            const nodeSize = 0.8 + energy * 1.2;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y + p.z * 0.9, nodeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Layer 5: Depth variation (subtle depth cues)
      if (!isHero) {
        ctx.strokeStyle = `rgba(196, 183, 166, ${0.02 + avgIntensity * 0.02})`;
        ctx.lineWidth = 0.4;

        // Sparse diagonal lines for spatial tension
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          const startCol = (i * cols) / 4;
          for (let row = 0; row < rows; row++) {
            const col = Math.min(Math.floor(startCol + row * 0.3), cols - 1);
            const p = points[row] && points[row][col] ? points[row][col] : null;
            if (!p) continue;

            const screenY = p.y + p.z * 0.85;
            if (row === 0) ctx.moveTo(p.x, screenY);
            else ctx.lineTo(p.x, screenY);
          }
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [audioData, isPlaying, mounted, isHero]);

  if (!mounted) return <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />;

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
