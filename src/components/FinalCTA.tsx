import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const FinalCTA = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);

  const handleTakeAction = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Determine direction based on screen width (mobile < 640px usually stacks vertically)
    // Adjust breakpoint to match your CSS grid/flex wrapping point
    const isMobile = window.innerWidth < 640;

    // Generate particles with specific targets
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      // Target Coordinates
      tx: isMobile
        ? Math.random() * 100 - 50       // Mobile: Spread horizontally slightly
        : Math.random() * 200 - 100 + 150, // Desktop: Move right towards WhatsApp
      ty: isMobile
        ? Math.random() * 100 + 50       // Mobile: Move DOWN towards WhatsApp
        : Math.random() * 100 - 50,      // Desktop: Spread vertically slightly
    }));
    setParticles(newParticles);

    // Clear particles and reset after animation
    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{
        background: "radial-gradient(circle, hsl(42 45% 58%), transparent 70%)"
      }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Ready?</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's Build Something{" "}
            <span className="text-gradient-gold">Worth Remembering.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            If you care about quality, speed, and results — let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            {/* Particle burst effect */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-gold pointer-events-none"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: particle.tx, // Use calculated target x
                    y: particle.ty, // Use calculated target y
                    opacity: 0,
                    scale: 0.5
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    ease: "easeOut"
                  }}
                  style={{
                    left: typeof window !== 'undefined' && window.innerWidth < 768 ? "calc(50% - 50px)" : "calc(50% - 100px)",
                    top: "50%",
                  }}
                />
              ))}
            </AnimatePresence>

            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6 relative"
              onClick={handleTakeAction}
            >
              <motion.span
                animate={isAnimating ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                Take Action <ArrowRight className="ml-1 h-4 w-4 inline" />
              </motion.span>
            </Button>

            <motion.div
              animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="heroOutline"
                size="lg"
                className="text-base px-8 py-6"
                onClick={() => window.open('https://wa.me/918506000070', '_blank')}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
