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

      // Contour-like field lines (horizontal flowing)
      ctx.strokeStyle = '#d4af37';
      ctx.globalAlpha = 0.04;
      ctx.lineWidth = 1;

      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        const yBase = (i / 12) * height;
        const amplitude = 30 + Math.sin(time * 0.3 + i) * 15;
        const frequency = 0.008 + Math.cos(i) * 0.002;

        for (let x = 0; x <= width; x += 10) {
          const wave = Math.sin(x * frequency + time * 0.5 + i * 0.3) * amplitude;
          const y = yBase + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Layered flowing curves (vertical field lines)
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        const xBase = (i / 16) * width;
        const phase = time * 0.4 + i * 0.2;

        for (let y = 0; y <= height; y += 10) {
          const distortion = Math.sin(y * 0.005 + phase) * 40;
          const x = xBase + distortion;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Waveform-inspired subtle pulses
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = '#c4b5a0';
      for (let ring = 2; ring < 5; ring++) {
        ctx.beginPath();
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = ring * 60;
        const radiusPulse = Math.sin(time * 0.3) * 20;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
          const r = baseRadius + radiusPulse + Math.sin(angle * 3 + time) * 15;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Mesh distortion node points
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#d4af37';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 1.5 + Math.sin(time * 0.5 + i) * 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
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
