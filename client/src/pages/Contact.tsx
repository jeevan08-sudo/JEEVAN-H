import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type GuestbookEntryInput } from "@shared/routes";
import { useGuestbook, useCreateGuestbookEntry } from "@/hooks/use-guestbook";
import { GlitchButton } from "@/components/GlitchButton";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Phone, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sticker Component
function Sticker({ data, index }: { data: any, index: number }) {
  const rotation = Math.random() * 20 - 10;
  
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

// Contact Info Card
function ContactInfoCard({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-xs font-mono text-muted-foreground mb-1">{label}</div>
        <div className="font-mono text-white text-sm">{value}</div>
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
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
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-8xl font-display text-transparent text-stroke-1 stroke-white/50 mb-4">
          CONNECT
        </h2>
        <p className="font-mono text-accent text-sm md:text-base">
          INITIATE COMMUNICATION PROTOCOL
        </p>
      </motion.div>

      {/* Contact Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
      >
        <ContactInfoCard 
          icon={Phone} 
          label="PHONE_NUMBER" 
          value="+91 XXXX-XXXX-XX"
          href="tel:+91XXXXXXXXXX"
        />
        <ContactInfoCard 
          icon={Mail} 
          label="EMAIL_ADDRESS" 
          value="jeevan.h@example.com"
          href="mailto:jeevan.h@example.com"
        />
        <ContactInfoCard 
          icon={MapPin} 
          label="LOCATION" 
          value="Piriyapatna, Mysore, India"
        />
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-4 mb-16"
      >
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
          { icon: Twitter, href: "#", label: "Twitter" },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-white/20 hover:border-secondary hover:bg-secondary/10 transition-all group"
            data-testid={`link-${social.label.toLowerCase()}`}
          >
            <social.icon className="w-6 h-6 text-white/60 group-hover:text-secondary transition-colors" />
          </a>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-4xl md:text-5xl font-display mb-8">
            SIGN<br/><span className="text-primary">THE_VOID</span>
          </h3>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
            <div className="space-y-2">
              <label className="font-mono text-accent text-xs">IDENTIFIER (NAME)</label>
              <input
                {...form.register("name")}
                className="w-full bg-black/50 border-2 border-white/20 p-4 font-mono text-white focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all"
                placeholder="GUEST_USER_01"
                data-testid="input-name"
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
                data-testid="input-message"
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
                  data-testid="input-color"
                />
                <span className="font-mono text-xs text-muted-foreground">SELECT YOUR FREQUENCY</span>
              </div>
            </div>

            <GlitchButton 
              type="submit" 
              disabled={createMutation.isPending} 
              className="w-full"
              data-testid="button-submit"
            >
              {createMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> PROCESSING...
                </span>
              ) : "TRANSMIT_DATA"}
            </GlitchButton>
          </form>
        </motion.div>

        {/* Right: Guestbook Wall */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative border-2 border-white/10 bg-black/40 p-6 min-h-[600px] overflow-hidden"
        >
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
        </motion.div>
      </div>

    </div>
  );
}
