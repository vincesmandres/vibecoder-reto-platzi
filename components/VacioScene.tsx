'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import AudioReactiveMesh from './AudioReactiveMesh';

interface VacioSceneProps {
  audioData: number[];
  isPlaying: boolean;
}

function SceneFallback() {
  return (
    <mesh>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshBasicMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export default function VacioScene({ audioData, isPlaying }: VacioSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 bg-charcoal flex items-center justify-center">
        <div className="w-32 h-32 border border-khaki/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0a', 1);
        }}
      >
        <Suspense fallback={<SceneFallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <AudioReactiveMesh audioData={audioData} isPlaying={isPlaying} />
        </Suspense>
      </Canvas>
    </div>
  );
}
