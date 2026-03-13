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
    const animationDuration = 2800; // 2.8 seconds
    let startTime: number | null = null;

    const draw = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      // Clear with fade-out effect during animation
      const alpha = Math.max(0, 1 - animationProgress * 1.2);
      ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (animationProgress < 1) {
        drawManifold(ctx, canvas, animationProgress);
        requestAnimationFrame(draw);
      }
    };

    const drawManifold = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      progress: number
    ) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Easing function for smooth unfolding
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Draw unfolding layers
      const numLayers = 8;
      for (let layer = 0; layer < numLayers; layer++) {
        const layerProgress = Math.max(0, easeProgress - (layer * 0.08));
        if (layerProgress <= 0) continue;

        const opacity = Math.sin(layerProgress * Math.PI) * 0.15;
        ctx.strokeStyle = `rgba(196, 183, 166, ${opacity})`;
        ctx.lineWidth = 1;

        // Draw expanding ripples with waveform distortion
        const baseRadius = 50 + layer * 80;
        const expandRadius = baseRadius + layerProgress * 300;

        ctx.beginPath();

        for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
          // Add wave distortion
          const waveDistortion = Math.sin(angle * 4 - easeProgress * Math.PI * 2) * 30;
          const distortedRadius = expandRadius + waveDistortion;

          const x = centerX + Math.cos(angle) * distortedRadius;
          const y = centerY + Math.sin(angle) * distortedRadius;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      // Draw radiating field lines (like topographic contours)
      const numRadii = 12;
      for (let i = 0; i < numRadii; i++) {
        const angle = (i / numRadii) * Math.PI * 2;
        const fieldLineLength = 400 + easeProgress * 200;

        const opacity = Math.sin(easeProgress * Math.PI) * 0.1;
        ctx.strokeStyle = `rgba(196, 183, 166, ${opacity})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        for (let dist = 0; dist < fieldLineLength; dist += 20) {
          const x = centerX + Math.cos(angle) * dist;
          const y = centerY + Math.sin(angle) * dist;
          
          // Perpendicular wave for field effect
          const perpAngle = angle + Math.PI / 2;
          const wave = Math.sin((dist / 50 - easeProgress * 3) * Math.PI) * 8;
          
          const finalX = x + Math.cos(perpAngle) * wave;
          const finalY = y + Math.sin(perpAngle) * wave;

          if (dist === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }

        ctx.stroke();
      }

      // Draw center manifold node with pulsing effect
      const nodeOpacity = Math.sin(easeProgress * Math.PI) * 0.3;
      ctx.fillStyle = `rgba(196, 183, 166, ${nodeOpacity})`;
      const nodeSize = 4 + easeProgress * 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nodeSize, 0, Math.PI * 2);
      ctx.fill();
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-charcoal"
    />
  );
}
