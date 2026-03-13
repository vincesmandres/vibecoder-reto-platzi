'use client';

import { useEffect, useRef, useState } from 'react';

interface TopologyMeshProps {
  isHero?: boolean;
  audioData?: number[];
  isPlaying?: boolean;
  isMorphing?: boolean;
}

export default function TopologyMesh({ 
  isHero = false, 
  audioData = [], 
  isPlaying = false,
  isMorphing = false
}: TopologyMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const morphStartRef = useRef(0);

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

    const gridSize = isHero ? 90 : 60;
    const cols = Math.ceil(canvas.width / gridSize) + 2;
    const rows = Math.ceil(canvas.height / gridSize) + 2;

    const draw = () => {
      timeRef.current += 0.0008;
      const t = timeRef.current;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Morphing transition state
      let morphAlpha = 0;
      if (isMorphing) {
        if (morphStartRef.current === 0) morphStartRef.current = t;
        morphAlpha = Math.min((t - morphStartRef.current) / 1.2, 1);
      }

      // Audio reactivity
      const avgIntensity = audioData && audioData.length > 0 
        ? audioData.slice(0, 64).reduce((a, b) => a + b, 0) / 64 / 255 
        : 0;
      
      const midIntensity = audioData && audioData.length > 0
        ? audioData.slice(32, 96).reduce((a, b) => a + b, 0) / 64 / 255
        : 0;

      const baseAmplitude = isHero ? 0.25 : 0.15;
      const audioAmplitude = isPlaying ? 0.15 + avgIntensity * 1 : 0;
      const amplitude = baseAmplitude + audioAmplitude;

      // Compute toroidal height field - true manifold topology
      const points: Array<Array<{ x: number; y: number; z: number }>> = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize - gridSize / 2;
          const y = row * gridSize - gridSize / 2;

          const normX = (x - canvas.width / 2) / canvas.width;
          const normY = (y - canvas.height / 2) / canvas.height;
          const distFromCenter = Math.sqrt(normX * normX + normY * normY);

          // Toroidal coordinate system - creates smooth manifold surface
          const theta = Math.atan2(normY, normX);
          const majorRadius = 0.35;
          const minorWave = Math.sin(theta * 3 + t * 0.2) * 0.15;

          // Multiple layered frequencies for complex manifold behavior
          const radialWave = Math.sin(distFromCenter * 4 - t * 0.12) * amplitude;
          const toroidalFlow = Math.sin(theta * 2 + t * 0.15 - distFromCenter * 3) * amplitude * 0.7;
          const poloidalRipple = Math.cos((distFromCenter - majorRadius) * 8 + t * 0.2) * amplitude * 0.5;
          const turbulenceField = Math.sin(Math.pow(distFromCenter, 1.5) * 6 + t * 0.3) * amplitude * 0.25;

          // Audio reactive displacement on manifold surface
          const freqIndex = Math.floor((col / cols) * Math.min(audioData.length, 64));
          const freqValue = audioData[freqIndex] || 0;
          const audioWave = isPlaying ? (freqValue / 255 - 0.5) * 0.35 : 0;

          const z = (radialWave + toroidalFlow + poloidalRipple + turbulenceField) * 25 + audioWave * 12;

          points[row][col] = { 
            x: col * gridSize, 
            y: row * gridSize, 
            z,
            height: z
          };
        }
      }

      // Layer 1: Poloidalcontour lines (latitude-like, thin dashed)
      ctx.strokeStyle = `rgba(196, 183, 166, ${(0.03 + avgIntensity * 0.03) * (1 - morphAlpha * 0.5)})`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([2, 5]);

      for (let i = -Math.max(cols, rows); i < Math.max(cols, rows) * 2; i++) {
        ctx.beginPath();
        for (let step = 0; step < Math.max(cols, rows) * 2; step++) {
          const row = Math.min(Math.max(Math.floor(i + step * 0.6), 0), rows - 1);
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

      // Layer 2: Primary mesh - toroidal grid structure
      const meshOpacity = isHero ? 0.06 : 0.09;
      const dynamicMeshOpacity = meshOpacity + avgIntensity * 0.04;
      const finalMeshOpacity = dynamicMeshOpacity * (1 - morphAlpha * 0.4);
      ctx.strokeStyle = `rgba(196, 183, 166, ${finalMeshOpacity})`;
      ctx.lineWidth = 1;

      // Horizontal toroidal lines
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[row][col];
          const screenY = p.y + p.z * 0.88;
          if (col === 0) ctx.moveTo(p.x, screenY);
          else ctx.lineTo(p.x, screenY);
        }
        ctx.stroke();
      }

      // Vertical toroidal lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[row][col];
          const screenY = p.y + p.z * 0.88;
          if (row === 0) ctx.moveTo(p.x, screenY);
          else ctx.lineTo(p.x, screenY);
        }
        ctx.stroke();
      }

      // Layer 3: Dynamic contour highlights (topographic isolines)
      if (isHero || morphAlpha > 0.3) {
        const contourLevels = [0.25, 0.55, 0.85];
        const maxZ = Math.max(...points.flat().map(p => p.z));
        const minZ = Math.min(...points.flat().map(p => p.z));
        const zRange = Math.max(maxZ - minZ, 1);

        contourLevels.forEach((level, idx) => {
          const contourValue = minZ + zRange * level;
          const contourOpacity = (0.015 + (idx * 0.008) + avgIntensity * 0.015) * (1 - morphAlpha * 0.6);
          ctx.strokeStyle = `rgba(196, 183, 166, ${contourOpacity})`;
          ctx.lineWidth = 0.7;
          
          for (let row = 0; row < rows - 1; row++) {
            ctx.beginPath();
            let started = false;
            for (let col = 0; col < cols - 1; col++) {
              const p1 = points[row][col];
              const p2 = points[row + 1] ? points[row + 1][col] : null;
              const p3 = points[row][col + 1];

              if (!p1 || !p2 || !p3) continue;

              const onContour = (p1.z - contourValue) * (p2.z - contourValue) < 0 ||
                              (p1.z - contourValue) * (p3.z - contourValue) < 0;

              if (onContour) {
                const screenY = p1.y + p1.z * 0.88;
                if (!started) {
                  ctx.moveTo(p1.x, screenY);
                  started = true;
                } else {
                  ctx.lineTo(p1.x, screenY);
                }
              }
            }
            if (started) ctx.stroke();
          }
        });
      }

      // Layer 4: Sparse nodal energy points (manifold singularities)
      if ((isHero || morphAlpha > 0.5) && avgIntensity > 0.04) {
        const nodeOpacity = Math.min(0.025 + avgIntensity * 0.04, 0.08) * (1 - morphAlpha * 0.5);
        ctx.fillStyle = `rgba(196, 183, 166, ${nodeOpacity})`;
        
        for (let row = 0; row < rows; row += 5) {
          for (let col = 0; col < cols; col += 5) {
            const p = points[row][col];
            const energy = Math.abs(p.z) / 25;
            const nodeSize = 0.6 + energy * 0.8;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y + p.z * 0.88, nodeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Layer 5: Subtle toroidal diagonal field lines (spatial topology)
      if (!isHero) {
        ctx.strokeStyle = `rgba(196, 183, 166, ${0.015 + avgIntensity * 0.015})`;
        ctx.lineWidth = 0.4;

        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const startCol = (i * cols) / 3;
          for (let row = 0; row < rows; row++) {
            const col = Math.min(Math.floor(startCol + row * 0.25), cols - 1);
            const p = points[row] && points[row][col] ? points[row][col] : null;
            if (!p) continue;

            const screenY = p.y + p.z * 0.84;
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
  }, [audioData, isPlaying, mounted, isHero, isMorphing]);

  if (!mounted) return <div className="absolute inset-0 z-0 bg-charcoal animate-mesh-morph" />;

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 animate-mesh-morph" />;
}
