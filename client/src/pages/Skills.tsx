import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Torus } from "@react-three/drei";
import { useState, useRef } from "react";
import { Brain, Code, Cloud, Sparkles, Users, ChevronRight } from "lucide-react";
import * as THREE from "three";

const skillCategories = [
  {
    title: "Core Programming & Mathematics",
    icon: Code,
    color: "#CCFF00",
    skills: [
      { name: "Python (Expert)", type: "language" },
      { name: "SQL", type: "language" },
      { name: "C++", type: "language" },
      { name: "R", type: "language" },
      { name: "Linear Algebra", type: "math" },
      { name: "Calculus", type: "math" },
      { name: "Probability & Statistics", type: "math" },
      { name: "Optimization Algorithms", type: "math" },
    ],
  },
  {
    title: "Machine Learning & Deep Learning",
    icon: Brain,
    color: "#FF0099",
    skills: [
      { name: "PyTorch", type: "framework" },
      { name: "TensorFlow", type: "framework" },
      { name: "Keras", type: "framework" },
      { name: "Scikit-learn", type: "framework" },
      { name: "XGBoost", type: "framework" },
      { name: "LightGBM", type: "framework" },
      { name: "CatBoost", type: "framework" },
      { name: "Pandas", type: "data" },
      { name: "NumPy", type: "data" },
      { name: "SciPy", type: "data" },
    ],
  },
  {
    title: "Generative AI & Specializations",
    icon: Sparkles,
    color: "#00F0FF",
    skills: [
      { name: "Transformers", type: "genai" },
      { name: "Hugging Face", type: "genai" },
      { name: "LangChain", type: "genai" },
      { name: "RAG", type: "genai" },
      { name: "Fine-tuning (LoRA/QLoRA)", type: "genai" },
      { name: "OpenCV", type: "cv" },
      { name: "YOLO", type: "cv" },
      { name: "CNNs", type: "cv" },
      { name: "Image Segmentation", type: "cv" },
      { name: "BERT", type: "nlp" },
      { name: "RNNs/LSTMs", type: "nlp" },
      { name: "Tokenization & Embeddings", type: "nlp" },
    ],
  },
  {
    title: "MLOps & Cloud Engineering",
    icon: Cloud,
    color: "#CCFF00",
    skills: [
      { name: "AWS SageMaker", type: "cloud" },
      { name: "Google Cloud AI", type: "cloud" },
      { name: "Azure ML", type: "cloud" },
      { name: "Docker", type: "devops" },
      { name: "Kubernetes", type: "devops" },
      { name: "MLflow", type: "mlops" },
      { name: "Weights & Biases", type: "mlops" },
      { name: "CI/CD for ML", type: "mlops" },
      { name: "Apache Spark", type: "bigdata" },
      { name: "Hadoop", type: "bigdata" },
      { name: "Databricks", type: "bigdata" },
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    color: "#FF0099",
    skills: [
      { name: "Model Explainability (SHAP, LIME)", type: "soft" },
      { name: "Stakeholder Communication", type: "soft" },
      { name: "Problem Solving", type: "soft" },
      { name: "Business Translation", type: "soft" },
    ],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0], index: number }) {
  const Icon = category.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black/60 border border-white/10 p-6 backdrop-blur-sm hover:border-white/30 transition-all group relative overflow-hidden"
    >
      {/* Animated border */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: category.color }}
        animate={{ scaleY: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at top left, ${category.color}10 0%, transparent 50%)` 
        }}
      />
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <motion.div 
          className="p-3"
          style={{ backgroundColor: `${category.color}15`, border: `1px solid ${category.color}30` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="w-6 h-6" style={{ color: category.color }} />
        </motion.div>
        <div>
          <h3 className="font-display text-lg text-white">{category.title}</h3>
          <p className="text-xs font-mono text-muted-foreground">{category.skills.length} skills</p>
        </div>
        <ChevronRight 
          className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" 
          style={{ color: category.color }}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + i * 0.02 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-3 py-1.5 text-xs font-mono border bg-black/50 hover:bg-white/10 transition-all cursor-default"
            style={{ 
              borderColor: `${category.color}40`,
              color: category.color,
              boxShadow: `0 0 10px ${category.color}00`,
            }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// 3D floating elements
function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const theta = (i / 8) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius * 0.4;
        const z = (Math.sin(theta * 2) - 0.5) * 2;
        const Shape = i % 3 === 0 ? Icosahedron : i % 3 === 1 ? Octahedron : Torus;
        const color = i % 3 === 0 ? "#CCFF00" : i % 3 === 1 ? "#FF0099" : "#00F0FF";
        
        return (
          <Float key={i} position={[x, y, z]} rotationIntensity={0.5} floatIntensity={2} speed={2}>
            <Shape args={Shape === Torus ? [0.2, 0.08, 16, 32] : [0.25]}>
              <meshStandardMaterial 
                color={color} 
                wireframe 
                emissive={color}
                emissiveIntensity={0.3}
              />
            </Shape>
          </Float>
        );
      })}
    </group>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 relative overflow-hidden cyber-grid">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#050505', 5, 20]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#CCFF00" intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#FF0099" intensity={0.5} />
          <FloatingGeometry />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Brain className="w-12 h-12 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-display text-transparent text-stroke-1 stroke-white/50 mb-4">
            TECH_ARSENAL
          </h2>
          <p className="font-mono text-accent text-sm md:text-base">
            AI/ML ENGINEER SKILL MATRIX // {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} TECHNOLOGIES
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "FRAMEWORKS", value: "15+", color: "#CCFF00" },
            { label: "CLOUD_PLATFORMS", value: "3", color: "#FF0099" },
            { label: "SPECIALIZATIONS", value: "4", color: "#00F0FF" },
            { label: "YEARS_EXP", value: "5+", color: "#CCFF00" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="text-center p-6 border border-white/10 bg-black/40 backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: stat.color }}
              />
              <div className="text-3xl md:text-5xl font-display mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-32 left-6 font-mono text-xs text-white/10 hidden lg:block">
          <div>// SKILL MATRIX</div>
          <div>// VERSION 2.0</div>
          <div>// LAST UPDATED: 2024</div>
        </div>
      </div>
    </div>
  );
}
