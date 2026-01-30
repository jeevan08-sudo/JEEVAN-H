import { motion } from "framer-motion";

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
}

export function GlitchButton({ children, variant = "primary", className = "", ...props }: GlitchButtonProps) {
  const colors = {
    primary: "border-primary text-primary hover:bg-primary hover:text-black shadow-primary/20",
    secondary: "border-secondary text-secondary hover:bg-secondary hover:text-black shadow-secondary/20",
    accent: "border-accent text-accent hover:bg-accent hover:text-black shadow-accent/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-8 py-4 font-mono font-bold text-lg uppercase tracking-widest
        border-2 transition-all duration-200 bg-transparent
        shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_30px_currentColor]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${colors[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers on hover */}
      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-10 transition-opacity duration-100" />
    </motion.button>
  );
}
