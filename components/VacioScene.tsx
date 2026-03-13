'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AudioReactiveMesh from './AudioReactiveMesh';

interface VacioSceneProps {
  audioData: number[];
  isPlaying: boolean;
}

export default function VacioScene({ audioData, isPlaying }: VacioSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <AudioReactiveMesh audioData={audioData} isPlaying={isPlaying} />
        </Suspense>
      </Canvas>
    </div>
  );
}
