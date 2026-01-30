import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { useState } from "react";
import { Brain, Code, Cloud, Sparkles, Users } from "lucide-react";

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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/60 border border-white/10 p-6 backdrop-blur-sm hover:border-white/30 transition-all group"
      style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="p-2 rounded-md"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: category.color }} />
        </div>
        <h3 className="font-display text-xl text-white">{category.title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + i * 0.02 }}
            className="px-3 py-1 text-xs font-mono border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-default"
            style={{ 
              borderColor: `${category.color}40`,
              color: category.color 
            }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// 3D floating elements for background
function FloatingElement({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float position={position} rotationIntensity={0.5} floatIntensity={2} speed={2}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color={hovered ? "#FF0099" : "#CCFF00"} 
          wireframe 
          emissive={hovered ? "#FF0099" : "#CCFF00"}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#050505', 5, 20]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#CCFF00" />
          <pointLight position={[-10, -10, -10]} color="#FF0099" />
          {[...Array(12)].map((_, i) => {
            const theta = (i / 12) * Math.PI * 2;
            const radius = 6;
            const x = Math.cos(theta) * radius;
            const y = Math.sin(theta) * radius * 0.5;
            const z = (Math.random() - 0.5) * 4;
            return <FloatingElement key={i} position={[x, y, z]} />;
          })}
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-display text-transparent text-stroke-1 stroke-white/50 mb-4">
            TECH_ARSENAL
          </h2>
          <p className="font-mono text-accent text-sm md:text-base">
            AI/ML ENGINEER SKILL MATRIX
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
            { label: "FRAMEWORKS", value: "15+" },
            { label: "CLOUD_PLATFORMS", value: "3" },
            { label: "SPECIALIZATIONS", value: "4" },
            { label: "YEARS_EXP", value: "5+" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center p-6 border border-white/10 bg-white/5">
              <div className="text-3xl md:text-5xl font-display text-primary mb-2">{stat.value}</div>
              <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
