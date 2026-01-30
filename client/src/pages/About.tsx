import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Dodecahedron, MeshWobbleMaterial } from "@react-three/drei";

export default function About() {
  const stats = [
    { label: "EXP_LEVEL", value: "SENIOR" },
    { label: "PROJECTS", value: "42+" },
    { label: "COFFEE", value: "∞" },
    { label: "STATUS", value: "OPEN" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-6xl md:text-8xl font-display mb-8 text-stroke-1 text-transparent stroke-white">
          ABOUT<br/>THE<br/><span className="text-secondary text-stroke-0">USER</span>
        </h2>
        
        <div className="space-y-6 font-mono text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p>
            <span className="text-primary font-bold">»</span> I craft high-performance interfaces that bridge the gap between utility and art.
          </p>
          <p>
            <span className="text-primary font-bold">»</span> Obsessed with micro-interactions, 3D web experiences, and accessible brutalism.
          </p>
          <p>
            <span className="text-primary font-bold">»</span> Currently exploring the intersection of AI-driven interfaces and retro-futurism.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
            >
              <div className="text-xs text-accent mb-1 font-mono">{stat.label}</div>
              <div className="text-2xl md:text-4xl font-display text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Content - 3D Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="h-[500px] w-full relative border-2 border-dashed border-white/20 rounded-3xl overflow-hidden"
      >
        <div className="absolute top-4 left-4 font-mono text-xs text-accent bg-black px-2 z-10">
          RENDER_PREVIEW.exe
        </div>
        
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#00FFFF" />
          <pointLight position={[-10, -10, -10]} color="#FF00FF" />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Dodecahedron args={[1, 0]} scale={2.5}>
              <MeshWobbleMaterial
                attach="material"
                factor={0.6}
                speed={1}
                color="#2a2a2a"
                emissive="#00FF00"
                emissiveIntensity={0.2}
                wireframe
              />
            </Dodecahedron>
          </Float>
        </Canvas>
      </motion.div>
    </div>
  );
}
