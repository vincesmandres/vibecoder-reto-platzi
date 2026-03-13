'use client';

import { useEffect, useRef } from 'react';

interface RubikCubeBackgroundProps {
  sectionIndex: number;
  className?: string;
}

export default function RubikCubeBackground({ sectionIndex = 0, className = '' }: RubikCubeBackgroundProps) {
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

    const drawRubikCube = () => {
      time += 0.004;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.15;

      // Section-based rotation
      const rotX = (sectionIndex * Math.PI) / 2 + time * 0.3;
      const rotY = time * 0.5 + (sectionIndex * Math.PI) / 3;
      const rotZ = time * 0.2;

      // Helper function: 3D to 2D projection with rotation
      const project3D = (x: number, y: number, z: number) => {
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);

        let x1 = x * cosY + z * sinY;
        let z1 = -x * sinY + z * cosY;

        let y1 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        let x2 = x1 * cosZ - y1 * sinZ;
        let y2 = x1 * sinZ + y1 * cosZ;

        const screenX = centerX + x2 * scale * (2 / (z2 + 4));
        const screenY = centerY + y2 * scale * (2 / (z2 + 4));

        return { x: screenX, y: screenY, z: z2 };
      };

      // Draw cube faces with manifold topology
      const cubeSize = 1;
      ctx.globalAlpha = 0.08;

      // Toroidal field lines (contour-like)
      for (let ring = 0; ring < 3; ring++) {
        const radius = 0.3 + ring * 0.25;
        const points = 64;
        ctx.strokeStyle = `hsl(45, 70%, ${50 + ring * 15}%)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();

        for (let i = 0; i <= points; i++) {
          const theta = (i / points) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * 0.1 + Math.sin(time + i * 0.1) * 0.05;
          const z = Math.sin(theta) * radius * 0.8;

          const proj = project3D(x, y, z);
          if (i === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      }

      // Waveform-inspired vertical layers
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#d4af37';

      for (let layer = -1; layer <= 1; layer += 0.5) {
        ctx.beginPath();
        for (let x = -1; x <= 1; x += 0.1) {
          const wave = Math.sin(x * 4 + time) * 0.2;
          const proj = project3D(x, layer + wave, Math.cos(x * 2) * 0.5);
          if (x === -1) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      }

      // Poloidal field lines (vertical through center)
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#c4b5a0';
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        ctx.beginPath();
        for (let t = -1; t <= 1; t += 0.1) {
          const x = Math.cos(angle) * 0.7;
          const y = t;
          const z = Math.sin(angle) * 0.7;
          const proj = project3D(x, y, z);
          if (t === -1) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      }

      // Mesh distortion nodes
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#d4af37';
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.2;
        const radius = 0.6 + Math.sin(time + i) * 0.15;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(time * 0.7 + i) * 0.4;
        const z = Math.sin(angle) * radius;

        const proj = project3D(x, y, z);
        const nodeSize = 2 + Math.sin(time * 2 + i) * 1.5;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawRubikCube);
    };

    drawRubikCube();

    return () => cancelAnimationFrame(animationFrameId);
  }, [sectionIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
