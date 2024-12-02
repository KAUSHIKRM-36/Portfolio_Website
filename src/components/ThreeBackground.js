import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function StarField({ isDarkMode }) {
  const count = 3500;

  // Correct the position array item size from 5 to 3 and update array logic
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);  // Array size corrected to count * 3
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      pos[i * 3] = Math.sin(theta) * Math.cos(phi) * 500;
      pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 500;
      pos[i * 3 + 2] = Math.cos(theta) * 500;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3}  // Fixed itemSize to 3 for 3D positions
        />
      </bufferGeometry>
      <pointsMaterial 
        color={isDarkMode ? 'white' : 'black'}  // Ensure color contrasts with background
        size={5} 
        sizeAttenuation
      />
    </points>
  );
}

function AnimatedSphere({ isDarkMode }) {
  const meshRef = useRef();

  // Slow down the rotation by decreasing the multiplier values
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    meshRef.current.rotation.x = a * 0.1;  // Slower rotation speed on the X-axis
    meshRef.current.rotation.y = a * 0.1;  // Slower rotation speed on the Y-axis
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Reduced the sphere's size to 0.75 times the original size (radius = 3) */}
      <sphereGeometry args={[200, 35, 35]} />
      <meshStandardMaterial 
        color={isDarkMode ? '#0000FF' : '#FF2400'} // Blue in dark mode, Yellow in light mode
        opacity={0.7} 
        transparent
        wireframe
      />
    </mesh>
  );
}

export default function ThreeBackground({ isDarkMode }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 500] }}  // Adjusted camera position for better view
        className="w-full h-full"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          zIndex: -1 
        }}
      >
        <ambientLight intensity={1} />  {/* Increased ambient light intensity */}
        <pointLight position={[10, 10, 10]} intensity={1} />  {/* Increased light intensity */}
        <StarField isDarkMode={isDarkMode} />
        <AnimatedSphere isDarkMode={isDarkMode} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
