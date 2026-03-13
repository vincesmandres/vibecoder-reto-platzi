'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AudioReactiveMeshProps {
  audioData: number[];
  isPlaying: boolean;
}

export default function AudioReactiveMesh({ audioData, isPlaying }: AudioReactiveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeMeshRef = useRef<THREE.Mesh>(null);
  
  const segments = 48;
  
  const originalPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, segments, segments);
    return geo.attributes.position.array.slice();
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positionAttribute = geometry.attributes.position;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      
      const audioIndex = Math.floor((i / positionAttribute.count) * Math.min(audioData.length, 64));
      const audioValue = audioData[audioIndex] || 0;
      const normalizedAudio = audioValue / 255;
      
      const baseWave = Math.sin(x * 0.3 + time * 0.4) * 0.4 +
                       Math.cos(y * 0.3 + time * 0.25) * 0.4 +
                       Math.sin((x + y) * 0.2 + time * 0.15) * 0.2;
      
      const audioReaction = isPlaying ? normalizedAudio * 1.5 : 0;
      
      const z = baseWave + audioReaction;
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
    
    // Sync wireframe geometry
    if (wireframeMeshRef.current) {
      const wireGeo = wireframeMeshRef.current.geometry as THREE.PlaneGeometry;
      const wirePos = wireGeo.attributes.position;
      for (let i = 0; i < wirePos.count; i++) {
        wirePos.setZ(i, positionAttribute.getZ(i));
      }
      wirePos.needsUpdate = true;
    }
    
    // Subtle rotation
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;
    }
    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;
    }
  });

  return (
    <group position={[0, -2, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* Solid base */}
      <mesh ref={meshRef}>
        <planeGeometry args={[20, 20, segments, segments]} />
        <meshBasicMaterial 
          color="#0a0a0a" 
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireframeMeshRef} position={[0, 0, 0.01]}>
        <planeGeometry args={[20, 20, segments, segments]} />
        <meshBasicMaterial 
          color="#c4b7a6" 
          wireframe
          transparent 
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
