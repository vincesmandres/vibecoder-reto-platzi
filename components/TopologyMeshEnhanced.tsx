'use client';

import { useEffect, useRef } from 'react';

interface TopologyMeshEnhancedProps {
  className?: string;
}

export default function TopologyMeshEnhanced({ className = '' }: TopologyMeshEnhancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let time = 0;

    const drawTopologyMesh = () => {
      time += 0.001;

      // Clear with subtle fade
      ctx.fillStyle = 'rgba(26, 22, 18, 0.02)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'hsl(35 25% 65% / 0.08)';
      ctx.lineWidth = 0.5;

      // Toroidal field lines - contours
      const toroidalLines = 12;
      for (let i = 0; i < toroidalLines; i++) {
        const angle = (i / toroidalLines) * Math.PI * 2 + time * 0.3;
        const phase = Math.sin(time * 0.5 + i * 0.5) * 20;

        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
          const R = width / 3;
          const r = width / 8;
          const x = (R + r * Math.cos(t)) * Math.cos(angle) + width / 2;
          const y = (R + r * Math.cos(t)) * Math.sin(angle) + height / 2 + phase;

          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Poloidal field lines - crossing arcs
      const poloidalLines = 8;
      for (let i = 0; i < poloidalLines; i++) {
        const angle = (i / poloidalLines) * Math.PI * 2;
        const amplitude = Math.sin(time * 0.4 + i) * 15;

        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
          const radius = width / 2.5 + amplitude * Math.sin(t + time * 0.3);
          const x = Math.cos(angle) * radius * Math.cos(t) + width / 2;
          const y = Math.sin(angle) * radius * Math.sin(t) + height / 2 + amplitude;

          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Waveform-inspired oscillating lines
      ctx.strokeStyle = 'hsl(35 25% 65% / 0.06)';
      for (let wave = 0; wave < 4; wave++) {
        ctx.beginPath();
        const centerY = height * (0.2 + wave * 0.2);
        const frequency = 3 + wave * 0.5;
        const amplitude = 30 - wave * 5;

        for (let x = 0; x <= width; x += 5) {
          const y = centerY + Math.sin((x / width) * Math.PI * frequency + time * 0.5) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Radial energy pulses
      const pulses = 3;
      for (let i = 0; i < pulses; i++) {
        const pulsePhase = (time * 0.8 + i * Math.PI * 2 / pulses) % (Math.PI * 2);
        const radius = (pulsePhase / (Math.PI * 2)) * width * 0.4;
        const opacity = Math.max(0, 1 - pulsePhase / (Math.PI * 2));

        ctx.strokeStyle = `hsl(35 25% 65% / ${opacity * 0.1})`;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Nodal points with subtle glow
      const nodes = 6;
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + time * 0.2;
        const nodeRadius = width * 0.3;
        const x = width / 2 + Math.cos(angle) * nodeRadius;
        const y = height / 2 + Math.sin(angle) * nodeRadius;

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, 'hsl(35 25% 65% / 0.15)');
        gradient.addColorStop(1, 'hsl(35 25% 65% / 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 8, y - 8, 16, 16);

        // Point
        ctx.fillStyle = 'hsl(35 25% 65% / 0.4)';
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawTopologyMesh);
    };

    drawTopologyMesh();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
