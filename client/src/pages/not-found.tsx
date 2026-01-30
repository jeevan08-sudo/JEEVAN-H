import { Link } from "wouter";
import { GlitchButton } from "@/components/GlitchButton";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground text-center p-4">
      <h1 className="text-9xl font-display font-black text-primary glitch-text" data-text="404">
        404
      </h1>
      <p className="text-xl font-mono text-accent mb-8 mt-4">
        FATAL ERROR: SECTOR NOT FOUND
      </p>
      
      <div className="border border-white/10 p-4 font-mono text-xs text-left text-muted-foreground mb-8 bg-black/50 max-w-md w-full">
        <p>{">"} Searching database...</p>
        <p>{">"} Error: Path does not exist in current timeline.</p>
        <p>{">"} Suggested action: Return to base.</p>
      </div>

      <Link href="/">
        <GlitchButton variant="secondary">RETURN_HOME</GlitchButton>
      </Link>
    </div>
  );
}
