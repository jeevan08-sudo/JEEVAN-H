import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

const skills = [
  "React", "TypeScript", "Node.js", "WebGL", 
  "Three.js", "Tailwind", "Next.js", "Postgres",
  "GraphQL", "Python", "Rust", "Docker"
];

function FloatingWord({ word, position }: { word: string, position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? "#FF00FF" : "#ffffff";
  
  useFrame((state) => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    }
  });

  return (
    <Float position={position} rotationIntensity={0.5} floatIntensity={2} speed={2}>
      <Text
        font="https://fonts.gstatic.com/s/monumentextended/v21/English.ttf" // Fallback or local needed properly
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'crosshair';
        }}
      >
        {word}
      </Text>
    </Float>
  );
}

// Simple placeholder distribution
function WordCloud() {
  return (
    <group>
      {skills.map((skill, i) => {
        const theta = (i / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius * 0.5;
        const z = (Math.random() - 0.5) * 2;
        return <FloatingWord key={skill} word={skill} position={[x, y, z]} />;
      })}
    </group>
  );
}

export default function Skills() {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="absolute top-24 left-0 w-full text-center z-10 pointer-events-none">
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-display text-transparent text-stroke-1 stroke-white/50"
        >
          TECH_STACK
        </motion.h2>
        <p className="font-mono text-accent mt-2 text-sm">INTERACT WITH ELEMENTS</p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <fog attach="fog" args={['#050505', 5, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00FF00" />
        <WordCloud />
      </Canvas>
    </div>
  );
}
