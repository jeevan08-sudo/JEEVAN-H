import { motion } from "framer-motion";
import { GlitchButton } from "@/components/GlitchButton";
import { Link } from "wouter";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

function HeroSphere() {
  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
  });
  
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#00FF00"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
        metalness={0.8}
        wireframe
      />
    </Sphere>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#FF00FF" />
          <HeroSphere />
        </Canvas>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 
            className="text-6xl md:text-9xl font-display font-black text-transparent text-stroke-2 md:text-stroke-2 stroke-white mb-4 glitch-text"
            data-text="DEVELOPER"
          >
            DEVELOPER
          </h1>
          <h1 
            className="text-6xl md:text-9xl font-display font-black text-white mix-blend-difference glitch-text"
            data-text="DESIGNER"
          >
            DESIGNER
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-primary font-mono text-lg md:text-2xl mb-12 max-w-2xl mx-auto border-l-2 border-primary pl-6 text-left"
        >
          Building digital experiences for the post-internet age. 
          Specializing in React, WebGL, and Maximalist UI.
        </motion.p>

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
      </div>

      {/* Marquee Footer */}
      <div className="absolute bottom-24 left-0 w-full overflow-hidden bg-white/5 border-y border-white/10 py-2">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs font-mono text-accent">
          {Array(20).fill("REACT • THREE.JS • TYPESCRIPT • NEXT.JS • TAILWIND • WEBGL • ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
