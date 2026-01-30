import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type GuestbookEntryInput } from "@shared/routes";
import { useGuestbook, useCreateGuestbookEntry } from "@/hooks/use-guestbook";
import { GlitchButton } from "@/components/GlitchButton";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sticker Component
function Sticker({ data, index }: { data: any, index: number }) {
  // Random position for "sticker" effect
  const rotation = Math.random() * 20 - 10;
  const xOffset = (index % 3) * 10; // Simple stagger
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: rotation }}
      className="bg-zinc-900 border-2 border-white/20 p-4 max-w-[250px] shadow-lg relative group hover:z-50 hover:scale-110 transition-all duration-200"
      style={{
        borderColor: data.color,
        boxShadow: `4px 4px 0px ${data.color}`,
      }}
    >
      <div className="font-display text-lg font-bold mb-2 uppercase break-words" style={{ color: data.color }}>
        {data.name}
      </div>
      <div className="font-mono text-xs text-white/80 break-words leading-relaxed">
        {data.message}
      </div>
      <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        #{data.id}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { data: entries, isLoading } = useGuestbook();
  const createMutation = useCreateGuestbookEntry();
  const { toast } = useToast();
  
  const form = useForm<GuestbookEntryInput>({
    resolver: zodResolver(api.guestbook.create.input),
    defaultValues: {
      name: "",
      message: "",
      color: "#00FF00",
      stickerId: "basic",
    },
  });

  const onSubmit = (data: GuestbookEntryInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "TRANSMISSION RECEIVED",
          description: "Your data has been etched into the void.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "ERROR_TRANSMISSION_FAILED",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
      
      {/* Left: Form */}
      <div>
        <h2 className="text-5xl md:text-7xl font-display mb-8">
          SIGN<br/><span className="text-primary">THE_VOID</span>
        </h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="font-mono text-accent text-xs">IDENTIFIER (NAME)</label>
            <input
              {...form.register("name")}
              className="w-full bg-black/50 border-2 border-white/20 p-4 font-mono text-white focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all"
              placeholder="GUEST_USER_01"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs font-mono">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-accent text-xs">DATA_PACKET (MESSAGE)</label>
            <textarea
              {...form.register("message")}
              rows={4}
              className="w-full bg-black/50 border-2 border-white/20 p-4 font-mono text-white focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all"
              placeholder="Write something..."
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-xs font-mono">{form.formState.errors.message.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-accent text-xs">HEX_CODE (COLOR)</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                {...form.register("color")}
                className="h-12 w-12 bg-transparent border-0 cursor-pointer"
              />
              <span className="font-mono text-xs text-muted-foreground">SELECT YOUR FREQUENCY</span>
            </div>
          </div>

          <GlitchButton 
            type="submit" 
            disabled={createMutation.isPending} 
            className="w-full"
          >
            {createMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> PROCESSING...
              </span>
            ) : "TRANSMIT_DATA"}
          </GlitchButton>
        </form>
      </div>

      {/* Right: Guestbook Wall */}
      <div className="relative border-2 border-white/10 bg-black/40 p-6 min-h-[600px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-white/10 flex items-center px-4 gap-2 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="ml-auto font-mono text-[10px] text-white/50">GUESTBOOK.LOG</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 content-start h-full overflow-y-auto custom-scrollbar p-4">
          {isLoading ? (
            <div className="text-accent font-mono animate-pulse">LOADING_DATABASE...</div>
          ) : entries?.length === 0 ? (
            <div className="text-white/30 font-mono">NO_ENTRIES_FOUND</div>
          ) : (
            <AnimatePresence>
              {entries?.map((entry, idx) => (
                <Sticker key={entry.id} data={entry} index={idx} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

    </div>
  );
}
