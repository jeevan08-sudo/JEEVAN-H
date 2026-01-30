import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "01. HOME" },
    { href: "/about", label: "02. ABT" },
    { href: "/skills", label: "03. SKL" },
    { href: "/contact", label: "04. CNT" },
  ];

  return (
    <>
      {/* Top Left - Logo */}
      <div className="fixed top-6 left-6 z-50 mix-blend-difference pointer-events-none">
        <h1 className="text-xl md:text-3xl font-display font-bold text-primary tracking-widest">
          CYBER<span className="text-secondary">.OS</span>
        </h1>
        <div className="text-[10px] font-mono text-accent">VERSION 4.2.0</div>
      </div>

      {/* Top Right - Status */}
      <div className="fixed top-6 right-6 z-50 font-mono text-xs md:text-sm text-right mix-blend-difference hidden md:block">
        <div className="text-primary animate-pulse">● SYSTEM ONLINE</div>
        <div className="text-muted-foreground">LOC: EARTH_C-137</div>
      </div>

      {/* Bottom Navigation HUD */}
      <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full pointer-events-auto shadow-[0_0_30px_rgba(0,255,0,0.1)]">
          <ul className="flex items-center gap-2 md:gap-8">
            {links.map((link) => {
              const isActive = location === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href} className="relative group block">
                    <span 
                      className={`
                        font-mono text-xs md:text-sm font-bold tracking-widest transition-colors duration-300
                        ${isActive ? "text-primary" : "text-zinc-500 group-hover:text-white"}
                      `}
                    >
                      {link.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_#00FF00]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Decorative Corners */}
      <div className="fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/30 z-40 pointer-events-none" />
      <div className="fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-secondary/30 z-40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-accent/30 z-40 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/30 z-40 pointer-events-none" />
    </>
  );
}
