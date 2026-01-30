import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type GuestbookEntryInput } from "@shared/routes";
import { useGuestbook, useCreateGuestbookEntry } from "@/hooks/use-guestbook";
import { GlitchButton } from "@/components/GlitchButton";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Phone, Mail, MapPin, Github, Linkedin, Twitter, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sticker Component with enhanced design
function Sticker({ data, index }: { data: any, index: number }) {
  const rotation = Math.random() * 16 - 8;
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: 1, rotate: rotation, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      className="bg-black/80 backdrop-blur-sm border-2 p-4 max-w-[220px] shadow-xl relative group cursor-pointer"
      style={{
        borderColor: data.color,
        boxShadow: `4px 4px 0px ${data.color}, 0 0 20px ${data.color}20`,
      }}
    >
      <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
      <div className="font-display text-base font-bold mb-2 uppercase break-words tracking-wide" style={{ color: data.color }}>
        {data.name}
      </div>
      <div className="font-mono text-xs text-white/80 break-words leading-relaxed">
        {data.message}
      </div>
      <div className="absolute -bottom-1 -right-1 bg-black text-[10px] font-mono px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity border" style={{ borderColor: data.color, color: data.color }}>
        #{data.id}
      </div>
    </motion.div>
  );
}

// Contact Info Card with enhanced styling
function ContactInfoCard({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="flex items-center gap-4 p-5 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-3 bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-all relative z-10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="relative z-10">
        <div className="text-xs font-mono text-accent mb-1">{label}</div>
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
      color: "#CCFF00",
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
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative cyber-grid">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />
      
      {/* Header */}
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
          <Send className="w-12 h-12 text-primary mx-auto" />
        </motion.div>
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 relative z-10"
      >
        <ContactInfoCard 
          icon={Phone} 
          label="PHONE_NUMBER" 
          value="+91 9731463719"
          href="tel:+919731463719"
        />
        <ContactInfoCard 
          icon={Mail} 
          label="EMAIL_ADDRESS" 
          value="0908jeevan@gmail.com"
          href="mailto:0908jeevan@gmail.com"
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
        className="flex justify-center gap-4 mb-16 relative z-10"
      >
        {[
          { icon: Github, href: "#", label: "GitHub", color: "#CCFF00" },
          { icon: Linkedin, href: "#", label: "LinkedIn", color: "#00F0FF" },
          { icon: Twitter, href: "#", label: "Twitter", color: "#FF0099" },
        ].map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            className="p-4 border border-white/20 bg-black/40 backdrop-blur-sm transition-all group"
            style={{ 
              ['--hover-color' as any]: social.color,
            }}
            data-testid={`link-${social.label.toLowerCase()}`}
          >
            <social.icon 
              className="w-6 h-6 text-white/60 group-hover:text-[var(--hover-color)] transition-colors" 
            />
          </motion.a>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h3 className="text-3xl md:text-4xl font-display">
              SIGN<span className="text-primary">_THE_VOID</span>
            </h3>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-black/40 backdrop-blur-sm p-8 border border-white/10 relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary/50" />
            
            <div className="space-y-2">
              <label className="font-mono text-accent text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-primary" /> IDENTIFIER (NAME)
              </label>
              <input
                {...form.register("name")}
                className="w-full bg-black/50 border-2 border-white/20 p-4 font-mono text-white focus:border-primary focus:outline-none focus:shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all"
                placeholder="GUEST_USER_01"
                data-testid="input-name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs font-mono">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-accent text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary" /> DATA_PACKET (MESSAGE)
              </label>
              <textarea
                {...form.register("message")}
                rows={4}
                className="w-full bg-black/50 border-2 border-white/20 p-4 font-mono text-white focus:border-primary focus:outline-none focus:shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all resize-none"
                placeholder="Write something..."
                data-testid="input-message"
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-xs font-mono">{form.formState.errors.message.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-accent text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-accent" /> HEX_CODE (COLOR)
              </label>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <input
                    type="color"
                    {...form.register("color")}
                    className="h-12 w-12 bg-transparent border-2 border-white/20 cursor-pointer"
                    data-testid="input-color"
                  />
                </div>
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
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="animate-spin w-5 h-5" /> PROCESSING...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <Send className="w-5 h-5" /> TRANSMIT_DATA
                </span>
              )}
            </GlitchButton>
          </form>
        </motion.div>

        {/* Right: Guestbook Wall */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 min-h-[600px] overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="absolute top-0 left-0 w-full h-10 bg-black/80 flex items-center px-4 gap-2 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 font-mono text-[10px] text-white/50">GUESTBOOK.LOG // {entries?.length || 0} ENTRIES</div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] text-green-500">LIVE</span>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 content-start h-[calc(100%-60px)] overflow-y-auto custom-scrollbar p-2">
            {isLoading ? (
              <div className="text-accent font-mono animate-pulse flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> LOADING_DATABASE...
              </div>
            ) : entries?.length === 0 ? (
              <div className="text-white/30 font-mono text-center w-full py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                NO_ENTRIES_FOUND<br/>
                <span className="text-xs">Be the first to sign the void!</span>
              </div>
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
