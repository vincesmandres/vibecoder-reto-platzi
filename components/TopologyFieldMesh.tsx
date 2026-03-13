'use client';

import { useEffect, useRef } from 'react';

interface TopologyFieldMeshProps {
  className?: string;
}

export default function TopologyFieldMesh({ className = '' }: TopologyFieldMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationFrameId: number;
    let time = 0;

    const drawFieldMesh = () => {
      time += 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Dynamic contour-like field lines (horizontal flowing)
      ctx.strokeStyle = '#d4af37';
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        const yBase = (i / 12) * height;
        const amplitude = 35 + Math.sin(time * 0.4 + i * 0.5) * 20;
        const frequency = 0.009 + Math.cos(i * 0.2) * 0.003;
        const flowSpeed = 0.6 + (i % 3) * 0.15;

        for (let x = 0; x <= width; x += 8) {
          const wave = Math.sin(x * frequency + time * flowSpeed + i * 0.4) * amplitude;
          const rhythmicPulse = Math.sin(time * 0.3 + i) * 8;
          const y = yBase + wave + rhythmicPulse;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Layered flowing curves (vertical field lines) - enhanced motion
      ctx.globalAlpha = 0.04;
      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        const xBase = (i / 16) * width;
        const phase = time * 0.5 + i * 0.2;
        const flowIntensity = 50 + Math.sin(time * 0.2 + i) * 20;

        for (let y = 0; y <= height; y += 8) {
          const distortion = Math.sin(y * 0.006 + phase) * flowIntensity;
          const x = xBase + distortion;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Waveform-inspired pulsing rings - more energetic
      ctx.globalAlpha = 0.035;
      ctx.strokeStyle = '#c4b5a0';
      ctx.lineWidth = 1.5;
      for (let ring = 1; ring < 6; ring++) {
        ctx.beginPath();
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = ring * 50;
        const rhythmPulse = Math.sin(time * 0.5 + ring) * 30;
        const radiusVariation = Math.sin(time * 0.3 + ring * 0.7) * 25;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.06) {
          const r = baseRadius + rhythmPulse + radiusVariation + Math.sin(angle * 4 + time * 0.4) * 18;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Mesh distortion node points - deterministic grid with pulsing
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#d4af37';
      const gridSpacing = 80;
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSpacing;
          const y = row * gridSpacing;
          const distortion = Math.sin(time * 0.6 + col + row) * 15;
          const pulseIndex = (row * cols + col);
          const size = 1.2 + Math.sin(time * 0.8 + pulseIndex * 0.3) * 0.8 + Math.abs(distortion) * 0.05;
          ctx.beginPath();
          ctx.arc(x + distortion, y + distortion, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawFieldMesh);
    };

    drawFieldMesh();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
