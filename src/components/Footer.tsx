import { motion, useInView } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <footer id="contact" className="section-padding bg-background border-t border-border/50 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            ref={ref}
            className="fix-safari-flicker"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to <span className="text-gradient-gold">Elevate Your Brand?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Let’s build a website that does more than impress. It performs.
              Start with a strategic consultation and take the first step toward measurable growth.
            </p>
            <div className="flex justify-center">
              <a href="mailto:devansh.studio.work@gmail.com?subject=Project%20Inquiry" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors bg-surface-light px-6 py-3 rounded-full border border-border/50 hover:border-gold/50">
                <Mail className="h-5 w-5" />
                <span className="font-medium">devansh.studio.work@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Devansh Digital Studio. All rights reserved.</p>
          <a href="https://instagram.com/devansh.studioo" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

