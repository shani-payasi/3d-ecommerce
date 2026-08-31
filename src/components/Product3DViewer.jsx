import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

function Geo({ type }) {
  switch (type) {
    case "sneaker":
      return <torusKnotGeometry args={[0.65, 0.24, 160, 32]} />;
    case "watch":
      return <torusGeometry args={[0.8, 0.3, 48, 100]} />;
    case "headphone":
      return <sphereGeometry args={[0.9, 48, 48]} />;
    case "bag":
      return <boxGeometry args={[1.2, 1, 0.6]} />;
    case "ring":
      return <torusGeometry args={[0.7, 0.08, 32, 100]} />;
    default:
      return <icosahedronGeometry args={[1, 1]} />;
  }
}

function Scene({ type, color, autoRotate }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color={color} />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh castShadow>
          <Geo type={type} />
          <meshStandardMaterial
            color={color}
            metalness={0.65}
            roughness={0.18}
          />
        </mesh>
      </Float>
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.5}
        blur={2.5}
        far={4}
        color="#000000"
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
      />
    </>
  );
}

export default function Product3DViewer({
  model,
  autoRotate = true,
  scale = 2,
  color = "#89aacc",
  type = "default",
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full grid place-items-center text-muted text-sm">
          3D preview unavailable
        </div>
      }
    >
      <div
        className="w-full h-full"
        style={{ transform: `scale(${scale / 2})` }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene type={type} color={color} autoRotate={autoRotate} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
