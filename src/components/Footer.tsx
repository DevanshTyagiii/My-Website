import { motion, useInView } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import MagneticWrapper from "./ui/MagneticWrapper";
import ContactForm from "./ContactForm";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <footer id="contact" className="section-padding bg-background border-t border-border/50 relative z-10 overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
                    linear-gradient(to right, hsl(var(--gold)) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--gold)) 1px, transparent 1px)
                `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/20 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            ref={ref}
            className="fix-safari-flicker"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Ready to <span className="text-gradient-gold">Elevate Your Brand?</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Let’s build a website that does more than impress. It performs.
              Start with a strategic consultation and take the first step toward measurable growth.
            </p>
            <div className="flex justify-center w-full">
              <ContactForm />
            </div>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Devansh Digital Studio. All rights reserved.</p>

          <div className="flex gap-6">
            <MagneticWrapper strength={0.2}>
              <a href="https://instagram.com/devansh.studioo" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors block p-2">
                <Instagram className="h-5 w-5" />
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
