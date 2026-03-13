'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AudioReactiveMeshProps {
  audioData: number[];
  isPlaying: boolean;
}

export default function AudioReactiveMesh({ audioData, isPlaying }: AudioReactiveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  
  const segments = 64;
  
  const { positions, wireframeGeometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, segments, segments);
    const wireGeo = new THREE.WireframeGeometry(geo);
    return { positions: geo.attributes.position, wireframeGeometry: wireGeo };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !geometryRef.current) return;
    
    const time = clock.getElapsedTime();
    const positionAttribute = geometryRef.current.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      const audioIndex = Math.floor((i / positionAttribute.count) * audioData.length);
      const audioValue = audioData[audioIndex] || 0;
      const normalizedAudio = audioValue / 255;
      
      const baseWave = Math.sin(vertex.x * 0.5 + time * 0.5) * 0.3 +
                       Math.cos(vertex.y * 0.5 + time * 0.3) * 0.3;
      
      const audioReaction = isPlaying ? normalizedAudio * 2 : 0;
      
      const z = baseWave + audioReaction;
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
    
    if (wireframeRef.current && wireframeRef.current.geometry) {
      const wireGeo = new THREE.WireframeGeometry(geometryRef.current);
      wireframeRef.current.geometry.dispose();
      wireframeRef.current.geometry = wireGeo;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry ref={geometryRef} args={[20, 20, segments, segments]} />
        <meshBasicMaterial 
          color="#0a0a0a" 
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      <lineSegments ref={wireframeRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <wireframeGeometry args={[new THREE.PlaneGeometry(20, 20, segments, segments)]} />
        <lineBasicMaterial 
          color="#c4b7a6" 
          transparent 
          opacity={0.6}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}
