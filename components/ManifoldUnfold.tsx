'use client';

import { useEffect, useRef } from 'react';

export default function ManifoldUnfold() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    let animationProgress = 0;
    const animationDuration = 3200;
    let startTime: number | null = null;

    const draw = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      const alpha = Math.max(0, 1 - animationProgress * 1.15);
      ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (animationProgress < 1) {
        drawTorusManifold(ctx, canvas, animationProgress);
        requestAnimationFrame(draw);
      }
    };

    const drawTorusManifold = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      progress: number
    ) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const easeProgress = 1 - Math.pow(1 - progress, 2.5);

      // Draw torus-like manifold unfolding (topologically coherent surface)
      const numLayers = 6;
      const baseRadius = 80;

      // Main torus shape - smooth toroidal surface
      for (let layer = 0; layer < numLayers; layer++) {
        const layerProgress = Math.max(0, easeProgress - (layer * 0.12));
        if (layerProgress <= 0) continue;

        const opacity = Math.sin(layerProgress * Math.PI) * 0.18;
        ctx.strokeStyle = `rgba(196, 183, 166, ${opacity})`;
        ctx.lineWidth = 1.2;

        const majorRadius = baseRadius + layer * 60;
        const minorRadius = 40 + layerProgress * 80;

        // Draw poloidal circles (small circles around the torus)
        const numPoloidal = 24;
        for (let i = 0; i < numPoloidal; i++) {
          const toroidalAngle = (i / numPoloidal) * Math.PI * 2;
          const cx = centerX + Math.cos(toroidalAngle) * majorRadius;
          const cy = centerY + Math.sin(toroidalAngle) * majorRadius * 0.6;

          // Draw small circles with wave distortion
          ctx.beginPath();
          for (let j = 0; j < Math.PI * 2; j += 0.08) {
            const distortion = Math.sin(j * 3 + easeProgress * Math.PI * 2) * 15;
            const scaledRadius = minorRadius * (0.7 + layerProgress * 0.3) + distortion;

            const px = cx + Math.cos(j) * scaledRadius;
            const py = cy + Math.sin(j) * scaledRadius * 0.8;

            if (j === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Toroidal field lines (longitude lines)
      const numToroidal = 16;
      for (let i = 0; i < numToroidal; i++) {
        const angle = (i / numToroidal) * Math.PI * 2;
        const opacity = Math.sin(easeProgress * Math.PI) * 0.12;
        ctx.strokeStyle = `rgba(196, 183, 166, ${opacity})`;
        ctx.lineWidth = 0.8;

        ctx.beginPath();
        const distFromCenter = baseRadius + easeProgress * 150;
        const startRadius = 0;
        const endRadius = distFromCenter + 200;

        for (let r = startRadius; r < endRadius; r += 20) {
          const perpWave = Math.sin((r / 60 - easeProgress * 2) * Math.PI) * 15;
          const x = centerX + Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * perpWave;
          const y = centerY + Math.sin(angle) * r * 0.6 + Math.sin(angle + Math.PI / 2) * perpWave * 0.6;

          if (r === startRadius) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Poloidalfield lines (latitude lines)
      const poloidalSteps = 8;
      for (let i = 0; i < poloidalSteps; i++) {
        const majorAngle = (i / poloidalSteps) * Math.PI * 2;
        const opacity = Math.sin(easeProgress * Math.PI) * 0.1;
        ctx.strokeStyle = `rgba(196, 183, 166, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 6]);

        ctx.beginPath();
        const majorRadius = baseRadius + 80 + easeProgress * 100;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const minorWave = Math.sin(angle * 2 + easeProgress * Math.PI) * 20;
          const distortion = Math.sin(angle - easeProgress * 3) * 10;

          const x = centerX + Math.cos(majorAngle) * majorRadius + Math.cos(angle) * (minorWave + distortion);
          const y = centerY + Math.sin(majorAngle) * majorRadius * 0.6 + Math.sin(angle) * (minorWave + distortion) * 0.6;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Contour isolines (topographic effect)
      const numContours = 5;
      for (let c = 0; c < numContours; c++) {
        const contourOpacity = Math.sin(easeProgress * Math.PI) * (0.08 - c * 0.01);
        ctx.strokeStyle = `rgba(196, 183, 166, ${contourOpacity})`;
        ctx.lineWidth = 0.5;

        const contourRadius = (baseRadius + 80 + easeProgress * 150) * (0.6 + (c / numContours) * 0.8);
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
          const wobble = Math.sin(angle * 4 + easeProgress * Math.PI * 2) * 8;
          const x = centerX + Math.cos(angle) * (contourRadius + wobble);
          const y = centerY + Math.sin(angle) * (contourRadius + wobble) * 0.6;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Central manifold node
      const nodeOpacity = Math.sin(easeProgress * Math.PI) * 0.4;
      ctx.fillStyle = `rgba(196, 183, 166, ${nodeOpacity})`;
      const nodeSize = 3 + easeProgress * 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // Radiating pulses from center
      const pulseCount = Math.floor(easeProgress * 4);
      for (let p = 0; p < pulseCount; p++) {
        const pulsProgress = (easeProgress - p * 0.25) * 4;
        if (pulsProgress <= 0 || pulsProgress > 1) continue;

        const pulseOpacity = (1 - pulsProgress) * 0.08;
        ctx.strokeStyle = `rgba(196, 183, 166, ${pulseOpacity})`;
        ctx.lineWidth = 1;

        const pulseRadius = pulsProgress * 350;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none bg-charcoal animate-manifold-unfold"
    />
  );
}
