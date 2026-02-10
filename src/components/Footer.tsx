import { motion, useInView } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, Twitter } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <footer id="contact" className="section-padding bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
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
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Let's build a website that doesn't just look good — it works.
              Start with a free consultation today.
            </p>
            <div className="space-y-4">
              <a href="mailto:hello@devansh.studio" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                hello@devansh.studio
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                +91 98765 43210
              </a>
            </div>
          </motion.div>

          {/* Simple Contact Form Placeholder */}
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors" />
              <input type="email" placeholder="Email" className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors" />
            </div>
            <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"></textarea>
            <button className="w-full bg-gold text-background font-semibold py-4 rounded-lg hover:bg-gold/90 transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>

        <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Devansh Digital Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
