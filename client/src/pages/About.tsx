import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Dodecahedron, MeshWobbleMaterial, Icosahedron, Torus } from "@react-three/drei";
import { Brain, Cpu, Database, Rocket, Target, Zap } from "lucide-react";

// Floating 3D Elements
function FloatingShapes() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Dodecahedron args={[1, 0]} position={[0, 0, 0]} scale={2}>
          <MeshWobbleMaterial
            attach="material"
            factor={0.4}
            speed={1}
            color="#1a1a1a"
            emissive="#CCFF00"
            emissiveIntensity={0.15}
            wireframe
          />
        </Dodecahedron>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={2} position={[-2, 1.5, -1]}>
        <Icosahedron args={[0.4]} scale={1}>
          <meshStandardMaterial color="#FF0099" wireframe emissive="#FF0099" emissiveIntensity={0.3} />
        </Icosahedron>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5} position={[2, -1, -0.5]}>
        <Torus args={[0.3, 0.1, 16, 32]} scale={1}>
          <meshStandardMaterial color="#00F0FF" wireframe emissive="#00F0FF" emissiveIntensity={0.3} />
        </Torus>
      </Float>
    </group>
  );
}

// Timeline Item
function TimelineItem({ year, title, description, index }: { year: string, title: string, description: string, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className="flex gap-4 relative"
    >
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
        {index < 2 && <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent" />}
      </div>
      <div className="pb-8">
        <div className="font-mono text-xs text-secondary mb-1">{year}</div>
        <div className="font-display text-xl text-white mb-2">{title}</div>
        <div className="font-mono text-sm text-muted-foreground">{description}</div>
      </div>
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
    { label: "ML_MODELS_DEPLOYED", value: "50+" },
    { label: "RESEARCH_PAPERS", value: "10+" },
    { label: "ACCURACY_IMPROVEMENT", value: "40%", suffix: "avg" },
    { label: "STATUS", value: "OPEN", color: "#CCFF00" },
  ];

  const timeline = [
    { year: "2024", title: "Senior AI/ML Engineer", description: "Leading GenAI initiatives and LLM implementations" },
    { year: "2022", title: "ML Engineer", description: "Built production ML pipelines on AWS" },
    { year: "2020", title: "Data Scientist", description: "Developed predictive models and analytics solutions" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-8xl font-display text-transparent text-stroke-1 stroke-white/50 mb-4">
          ABOUT_ME
        </h2>
        <p className="font-mono text-accent text-sm md:text-base">
          SYSTEM.USER.PROFILE
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Content */}
        <div>
          {/* Bio Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
              
              <div className="space-y-6 font-mono text-lg text-muted-foreground leading-relaxed pl-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-primary font-bold text-2xl">&gt;</span> I'm <span className="text-white font-bold">JEEVAN H</span>, an AI/ML Engineer based in Piriyapatna, Mysore.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-secondary font-bold text-2xl">&gt;</span> I architect intelligent systems that transform complex data into actionable insights, specializing in <span className="text-secondary">Deep Learning</span>, <span className="text-accent">Generative AI</span>, and <span className="text-primary">Production ML Systems</span>.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-accent font-bold text-2xl">&gt;</span> My mission: Bridge cutting-edge research with robust engineering to solve <span className="text-white">previously unsolved problems</span>.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-12"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all group"
              >
                <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xs text-accent font-mono mb-1">{item.label}</div>
                <div className="text-sm font-display text-white">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border border-white/10 bg-white/5 p-6"
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
            className="h-[400px] w-full relative border-2 border-dashed border-white/20 rounded-lg overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-mono text-xs text-accent bg-black/80 px-2 py-1 z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              NEURAL_NETWORK.exe
            </div>
            
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#CCFF00" />
              <pointLight position={[-10, -10, -10]} color="#FF0099" />
              <pointLight position={[5, -5, 5]} color="#00F0FF" intensity={0.5} />
              <FloatingShapes />
            </Canvas>

            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/30">
              WebGL // THREE.js
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="border border-white/10 bg-black/40 p-6 hover:bg-white/5 transition-colors text-center"
              >
                <div 
                  className="text-3xl md:text-4xl font-display mb-2"
                  style={{ color: stat.color || '#CCFF00' }}
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
            className="border-l-4 border-secondary p-6 bg-secondary/5"
          >
            <p className="font-mono text-white/80 italic text-sm leading-relaxed">
              "The best way to predict the future is to invent it. I build AI systems that don't just process data—they understand, learn, and evolve."
            </p>
            <div className="mt-4 font-display text-secondary text-sm">— JEEVAN H</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
