import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import InteractiveParticles from "./InteractiveParticles";

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-dark overflow-hidden">
      <InteractiveParticles />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(hsl(42 45% 58% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(42 45% 58% / 0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none" style={{
        background: "radial-gradient(circle, hsl(42 45% 58%), transparent 70%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="fix-safari-flicker"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Devansh Digital Studio
          </p>
        </motion.div>

        <motion.h1
          className="fix-safari-flicker text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          Premium Websites Built to{" "}
          <span className="text-gradient-gold">Grow Businesses</span>
        </motion.h1>

        <motion.p
          className="fix-safari-flicker text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          We design modern, high-performance websites for cafes, salons, and local brands
          that care about quality, trust, and customers.
        </motion.p>

        <motion.div
          className="fix-safari-flicker flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        >
          <Button
            variant="hero"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Website <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant="heroOutline"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Work
          </Button>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-sm tracking-[0.15em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Designed. Developed. Delivered with precision.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
