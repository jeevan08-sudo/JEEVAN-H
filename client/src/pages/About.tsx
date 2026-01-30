import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Dodecahedron, MeshWobbleMaterial, Icosahedron, Torus, Box } from "@react-three/drei";
import { Brain, Cpu, Database, Rocket, Zap, Code, Sparkles } from "lucide-react";
import { useRef } from "react";
import * as THREE from "three";

// Animated 3D Scene
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Dodecahedron args={[1, 0]} position={[0, 0, 0]} scale={2}>
          <MeshWobbleMaterial
            attach="material"
            factor={0.3}
            speed={1}
            color="#1a1a1a"
            emissive="#CCFF00"
            emissiveIntensity={0.2}
            wireframe
          />
        </Dodecahedron>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={2} position={[-2.5, 1.5, -1]}>
        <Icosahedron args={[0.5]} scale={1}>
          <meshStandardMaterial color="#FF0099" wireframe emissive="#FF0099" emissiveIntensity={0.4} />
        </Icosahedron>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5} position={[2.5, -1, -0.5]}>
        <Torus args={[0.4, 0.15, 16, 32]} scale={1}>
          <meshStandardMaterial color="#00F0FF" wireframe emissive="#00F0FF" emissiveIntensity={0.4} />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[2, 1.5, 0.5]}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color="#CCFF00" wireframe emissive="#CCFF00" emissiveIntensity={0.3} />
        </Box>
      </Float>

      <Float speed={3.5} rotationIntensity={0.6} floatIntensity={2} position={[-2, -1.5, 0]}>
        <Icosahedron args={[0.3]}>
          <meshStandardMaterial color="#FF0099" wireframe emissive="#FF0099" emissiveIntensity={0.3} />
        </Icosahedron>
      </Float>
    </group>
  );
}

// Timeline Item with enhanced styling
function TimelineItem({ year, title, description, index }: { year: string, title: string, description: string, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.15 }}
      className="flex gap-4 relative group"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-4 h-4 rounded-full bg-primary border-2 border-primary relative"
          whileHover={{ scale: 1.3 }}
        >
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        </motion.div>
        {index < 2 && <div className="w-0.5 h-full bg-gradient-to-b from-primary via-secondary/50 to-transparent" />}
      </div>
      <div className="pb-8 group-hover:translate-x-2 transition-transform">
        <div className="font-mono text-xs text-secondary mb-1 flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> {year}
        </div>
        <div className="font-display text-xl text-white mb-2">{title}</div>
        <div className="font-mono text-sm text-muted-foreground">{description}</div>
      </div>
    </motion.div>
  );
}

// Highlight Card with glow effect
function HighlightCard({ item, index }: { item: { icon: any, label: string, value: string }, index: number }) {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-5 border border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-all group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform relative z-10" />
      <div className="text-xs text-accent font-mono mb-1 relative z-10">{item.label}</div>
      <div className="text-sm font-display text-white relative z-10">{item.value}</div>
    </motion.div>
  );
}

export default function About() {
  const highlights = [
    { icon: Brain, label: "Deep Learning", value: "Neural Networks & Transformers" },
    { icon: Cpu, label: "MLOps", value: "Production ML Systems" },
    { icon: Database, label: "Big Data", value: "Spark, Hadoop, Databricks" },
    { icon: Rocket, label: "GenAI", value: "LLMs, RAG, Fine-tuning" },
  ];

  const stats = [
    { label: "ML_MODELS_DEPLOYED", value: "50+", color: "#CCFF00" },
    { label: "RESEARCH_PAPERS", value: "10+", color: "#FF0099" },
    { label: "ACCURACY_IMPROVEMENT", value: "40%", suffix: "avg", color: "#00F0FF" },
    { label: "STATUS", value: "OPEN", color: "#CCFF00" },
  ];

  const timeline = [
    { year: "2024", title: "Senior AI/ML Engineer", description: "Leading GenAI initiatives and LLM implementations" },
    { year: "2022", title: "ML Engineer", description: "Built production ML pipelines on AWS" },
    { year: "2020", title: "Data Scientist", description: "Developed predictive models and analytics solutions" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative cyber-grid">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4"
        >
          <Code className="w-12 h-12 text-primary mx-auto" />
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-display text-transparent text-stroke-1 stroke-white/50 mb-4">
          ABOUT_ME
        </h2>
        <p className="font-mono text-accent text-sm md:text-base">
          SYSTEM.USER.PROFILE // LOADING COMPLETE
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* Left Content */}
        <div>
          {/* Bio Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative p-6 bg-black/40 backdrop-blur-sm border border-white/10">
              <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
              
              <div className="space-y-6 font-mono text-lg text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  <span className="text-primary font-bold text-2xl">&gt;</span> 
                  <span>I'm <span className="text-white font-bold">JEEVAN H</span>, an AI/ML Engineer based in Piriyapatna, Mysore.</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3"
                >
                  <span className="text-secondary font-bold text-2xl">&gt;</span> 
                  <span>I architect intelligent systems that transform complex data into actionable insights, specializing in <span className="text-secondary">Deep Learning</span>, <span className="text-accent">Generative AI</span>, and <span className="text-primary">Production ML Systems</span>.</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <span className="text-accent font-bold text-2xl">&gt;</span> 
                  <span>My mission: Bridge cutting-edge research with robust engineering to solve <span className="text-white">previously unsolved problems</span>.</span>
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {highlights.map((item, i) => (
              <HighlightCard key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border border-white/10 bg-black/40 backdrop-blur-sm p-6"
          >
            <div className="font-mono text-xs text-accent mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> CAREER_TIMELINE
            </div>
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Right Content - 3D Visual & Stats */}
        <div className="space-y-8">
          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="h-[400px] w-full relative border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-mono text-xs text-accent bg-black/80 px-3 py-1 z-10 flex items-center gap-2 border border-accent/30">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              NEURAL_NETWORK.exe
            </div>
            
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#CCFF00" intensity={0.5} />
              <pointLight position={[-10, -10, -10]} color="#FF0099" intensity={0.5} />
              <pointLight position={[5, -5, 5]} color="#00F0FF" intensity={0.3} />
              <FloatingShapes />
            </Canvas>

            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              WebGL // THREE.js
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-primary/30 transition-all text-center relative overflow-hidden group"
              >
                <div 
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500 group-hover:w-full w-0"
                  style={{ backgroundColor: stat.color }}
                />
                <div 
                  className="text-3xl md:text-4xl font-display mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative p-6 bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/30"
          >
            <div className="absolute -top-3 left-4 text-6xl text-secondary/30 font-display">"</div>
            <p className="font-mono text-white/80 italic text-sm leading-relaxed pt-4">
              The best way to predict the future is to invent it. I build AI systems that don't just process data—they understand, learn, and evolve.
            </p>
            <div className="mt-4 font-display text-secondary text-sm flex items-center gap-2">
              <div className="w-8 h-0.5 bg-secondary" />
              JEEVAN H
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
