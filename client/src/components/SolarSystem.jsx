import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Line } from "@react-three/drei";

const PLANETS = [
  { name: "Java", color: "#00f0ff", size: 0.35, orbit: 2.2, speed: 0.3, ring: false },
  { name: "Spring", color: "#00ff88", size: 0.42, orbit: 2.9, speed: 0.25, ring: true },
  { name: "NestJS", color: "#ff00aa", size: 0.3, orbit: 3.6, speed: 0.35, ring: false },
  { name: "PostgreSQL", color: "#a855f7", size: 0.32, orbit: 4.3, speed: 0.2, ring: false },
  { name: "Docker", color: "#60a5fa", size: 0.25, orbit: 4.9, speed: 0.28, ring: false },
  { name: "Redis", color: "#f43f5e", size: 0.22, orbit: 5.5, speed: 0.32, ring: false },
  { name: "Microservices", color: "#facc15", size: 0.28, orbit: 6.1, speed: 0.22, ring: false },
];

const Sun = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.06;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>
      <pointLight color="#00f0ff" intensity={2.5} distance={18} />
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          fontSize={0.22}
          color="#ffffff"
          anchorY="bottom"
          position={[0, 1.0, 0]}
          fillOpacity={0.9}
        >
          Backend Stack
        </Text>
      </Float>
    </group>
  );
};

const OrbitRing = ({ radius }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#00f0ff"
      lineWidth={0.5}
      transparent
      opacity={0.12}
    />
  );
};

const Planet = ({ name, color, size, orbit, speed, ring }) => {
  const ref = useRef();
  const labelRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const a = clock.elapsedTime * speed + offset;
    const x = Math.cos(a) * orbit;
    const z = Math.sin(a) * orbit;
    ref.current.position.set(x, 0, z);
    if (labelRef.current) {
      labelRef.current.position.set(x, size + 0.35, z);
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.5}
        />
        {ring && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[size * 1.8, 0.03, 8, 48]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.6} />
          </mesh>
        )}
      </mesh>
      <Text
        ref={labelRef}
        fontSize={0.18}
        color={color}
        anchorY="bottom"
        fillOpacity={0.85}
      >
        {name}
      </Text>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Sun />
      {PLANETS.map((p) => (
        <OrbitRing key={p.name} radius={p.orbit} />
      ))}
      {PLANETS.map((p) => (
        <Planet key={p.name} {...p} />
      ))}
    </>
  );
};

const SolarSystem = () => {
  return (
    <div className="solar-system-container">
      <Canvas
        camera={{ position: [0, 6, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
