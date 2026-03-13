"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Lightformer, Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// The Runpod icon SVG path (extracted from the brand kit)
const RUNPOD_ICON_SVG = `<svg viewBox="0 0 195 206" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M170.04 163.76C180.216 157.899 186.485 147.067 186.485 135.344L186.485 70.656C186.485 58.9334 180.216 48.1013 170.04 42.24L113.887 9.89597C103.71 4.03467 91.1731 4.03468 80.997 9.89598L24.8432 42.24C14.6671 48.1013 8.39844 58.9334 8.39844 70.656L8.39844 135.344C8.39844 147.067 14.6672 157.899 24.8432 163.76L80.997 196.104C91.1731 201.965 103.711 201.965 113.887 196.104L170.04 163.76ZM170.04 135.344C170.04 141.205 166.906 146.621 161.818 149.552L132.428 166.48C129.838 167.972 128.543 168.718 127.48 168.607C126.553 168.51 125.711 168.025 125.163 167.272C124.535 166.41 124.535 164.918 124.535 161.934L124.535 128.078C124.535 122.217 127.669 116.801 132.757 113.87L148.493 104.806C150.654 103.562 151.734 102.939 152.52 102.068C153.214 101.298 153.739 100.39 154.058 99.404C154.42 98.2895 154.418 97.0449 154.413 94.5556L154.412 93.8078C154.405 90.0844 154.402 88.2227 153.616 87.1465C152.931 86.2077 151.879 85.6029 150.721 85.4821C149.393 85.3436 147.777 86.2745 144.545 88.1362L124.535 99.662C114.359 105.523 108.09 116.355 108.09 128.078V177.704C108.09 179.434 107.165 181.031 105.664 181.896C100.576 184.827 94.3074 184.827 89.2194 181.896L33.0656 149.552C27.9776 146.621 24.8432 141.205 24.8432 135.344L24.8432 102.001C24.8432 99.0167 24.8432 97.5248 25.4713 96.6622C26.0192 95.9099 26.8613 95.4249 27.7883 95.3277C28.8511 95.2162 30.1462 95.9621 32.7366 97.454L61.518 114.031C66.6059 116.961 69.7403 122.378 69.7403 128.239L69.7403 145.503C69.7403 147.992 69.7403 149.237 70.1037 150.35C70.4253 151.336 70.9512 152.243 71.6472 153.012C72.4339 153.881 73.5155 154.502 75.6786 155.743L76.3283 156.115C79.5638 157.971 81.1816 158.9 82.5087 158.759C83.6663 158.636 84.7175 158.029 85.4012 157.089C86.1851 156.012 86.1851 154.15 86.1851 150.426L86.1851 128.239C86.1851 116.516 79.9164 105.684 69.7403 99.8227L27.7149 75.6181C25.9379 74.5947 24.8432 72.7031 24.8432 70.656C24.8432 64.7947 27.9775 59.3786 33.0656 56.448L89.2194 24.104C94.3074 21.1733 100.576 21.1733 105.664 24.104L134.734 40.8481C137.325 42.3402 138.62 43.0862 139.055 44.0601C139.434 44.9096 139.434 45.8798 139.055 46.7293C138.62 47.7032 137.325 48.4492 134.734 49.9413L105.21 66.9473C100.121 69.8779 93.8528 69.8779 88.7647 66.9473L72.2226 57.4192C70.576 56.4708 69.7527 55.9965 68.8765 55.8061C68.1011 55.6376 67.2992 55.6309 66.5211 55.7864C65.6419 55.962 64.8107 56.4224 63.1483 57.343L61.0974 58.4789C57.7726 60.3202 56.1103 61.2409 55.5478 62.4623C55.0574 63.5273 55.0471 64.7507 55.5195 65.8238C56.0613 67.0545 57.7079 68.0029 61.0011 69.8997L80.5424 81.1553C90.7184 87.0166 103.256 87.0166 113.432 81.1553L156.327 56.448C158.026 55.4695 160.119 55.4695 161.818 56.448C166.906 59.3786 170.04 64.7947 170.04 70.656V135.344Z" fill="white"/>
</svg>`;

function RunpodLogo() {
  const meshRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const elapsed = useRef(0);
  const [shapes, setShapes] = useState<THREE.Shape[]>([]);

  useEffect(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(RUNPOD_ICON_SVG);

    const allShapes: THREE.Shape[] = [];
    svgData.paths.forEach((path) => {
      const pathShapes = SVGLoader.createShapes(path);
      allShapes.push(...pathShapes);
    });
    setShapes(allShapes);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    elapsed.current += delta;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.12,
      0.03
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.06,
      0.03
    );
    const breathe = Math.sin(elapsed.current * 0.5) * 0.02 + 1;
    meshRef.current.scale.setScalar(breathe);
  });

  if (shapes.length === 0) return null;

  const extrudeSettings = {
    depth: 12,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelOffset: 0,
    bevelSegments: 4,
  };

  // Center the geometry: the SVG viewBox is 0 0 195 206
  const centerX = 195 / 2;
  const centerY = 206 / 2;
  const scale = 0.02; // smaller than before (was 0.025)

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={meshRef}>
        <group
          scale={[scale, -scale, scale]}
          position={[-centerX * scale, centerY * scale, -6 * scale]}
        >
          {shapes.map((shape, i) => (
            <mesh key={i}>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshPhysicalMaterial
                color="#a78bfa"
                emissive="#7c3aed"
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.15}
                reflectivity={1}
                clearcoat={1}
                clearcoatRoughness={0.05}
                envMapIntensity={2.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-8, -5, -8]} intensity={1} color="#a78bfa" />
      <pointLight position={[0, 8, 5]} intensity={1.5} color="#e0d4ff" />
      <RunpodLogo />
      {/* Lightweight procedural env map — no HDR download */}
      <Environment resolution={64}>
        <Lightformer
          form="rect"
          intensity={4}
          position={[5, 5, -5]}
          scale={[10, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[-5, 2, 5]}
          scale={[8, 4, 1]}
          color="#c4b5fd"
        />
        <Lightformer
          form="circle"
          intensity={1.5}
          position={[0, -5, 0]}
          scale={4}
          color="#a78bfa"
        />
      </Environment>
    </>
  );
}

export function SpinningLogo() {
  const [hasError, setHasError] = useState(false);

  const handleContextLost = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
          const canvas = state.gl.domElement;
          canvas.addEventListener("webglcontextlost", handleContextLost);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
