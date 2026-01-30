import { motion } from "framer-motion";
import { GlitchButton } from "@/components/GlitchButton";
import { Link } from "wouter";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { MapPin, ChevronDown } from "lucide-react";
import { useRef } from "react";
import * as THREE from "three";

function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });
  
  return (
    <group>
      <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2.8}>
        <MeshDistortMaterial
          color="#CCFF00"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.8}
          wireframe
        />
      </Sphere>
      <Sphere args={[1, 32, 32]} scale={1.8}>
        <meshStandardMaterial
          color="#FF0099"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
    </group>
  );
}

function FloatingParticle({ delay, x, y }: { delay: number, x: number, y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [y, y - 100],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cyber-grid">
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.3} 
          x={Math.random() * 100} 
          y={60 + Math.random() * 30} 
        />
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />

      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#FF0099" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#00F0FF" />
          <HeroSphere />
        </Canvas>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 border border-primary/50 text-primary font-mono text-sm bg-primary/10 backdrop-blur-sm">
            [ WELCOME TO MY DIGITAL REALM ]
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 
            className="text-6xl md:text-9xl font-display font-black text-transparent text-stroke-2 md:text-stroke-2 stroke-white mb-4 glitch-text"
            data-text="JEEVAN H"
          >
            JEEVAN H
          </h1>
          <h1 
            className="text-4xl md:text-7xl font-display font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            AI&ML ENGINEER
          </h1>
          
          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="font-mono text-secondary text-lg md:text-xl tracking-wider">
              PIRIYAPATNA (MYSORE)
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative mb-12 max-w-3xl mx-auto"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
          <p className="text-primary/90 font-mono text-lg md:text-xl pl-6 text-left leading-relaxed">
            Passionate about building next-gen AI architectures, blending state-of-the-art Deep Learning research with robust production engineering to solve previously unsolved problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Link href="/contact">
            <GlitchButton variant="primary">INITIATE_CONTACT</GlitchButton>
          </Link>
          <Link href="/skills">
            <GlitchButton variant="secondary">VIEW_STACK</GlitchButton>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, y: { duration: 1.5, repeat: Infinity } }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </div>

      {/* Marquee Footer */}
      <div className="absolute bottom-20 left-0 w-full overflow-hidden bg-black/50 border-y border-white/10 py-3 backdrop-blur-sm">
        <motion.div 
          className="whitespace-nowrap flex gap-8 text-xs font-mono text-accent"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array(20).fill("PYTORCH • TENSORFLOW • LANGCHAIN • HUGGING FACE • OPENAI • AWS • DOCKER • KUBERNETES • ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-6 font-mono text-xs text-white/20 hidden md:block">
        <div>SYS.VERSION: 2.0</div>
        <div>STATUS: ONLINE</div>
      </div>
      <div className="absolute top-20 right-6 font-mono text-xs text-white/20 hidden md:block text-right">
        <div>LAT: 12.3456</div>
        <div>LON: 76.5432</div>
      </div>
    </div>
  );
}
