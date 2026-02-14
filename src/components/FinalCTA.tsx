import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import MagneticWrapper from "./ui/MagneticWrapper";
import GlitchText from "./ui/GlitchText";

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frameId: number;
    let lines: any[] = [];

    const config = {
      lineCount: 30, // Number of horizontal lines
      amplitude: 50, // Wave height
      frequency: 0.002, // Wave frequency
      speed: 0.01, // Animation speed
      gap: 30, // Vertical gap between lines
      perspective: 300 // Pseudo-3D perspective
    };


    const init = () => {
      lines = [];
      const centerY = height / 2;
      // Create lines centered vertically
      for (let i = 0; i < config.lineCount; i++) {
        lines.push({
          y: centerY + (i - config.lineCount / 2) * config.gap,
          phase: (i * 0.1) // Offset phase for each line
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Gradient for lines
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(255, 215, 0, 0)"); // Fade out edges
      gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.4)"); // Gold center
      gradient.addColorStop(1, "rgba(255, 215, 0, 0)");

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = gradient;

      lines.forEach((line) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) { // Step size for resolution
          // Interaction of wave components
          const yOffset = Math.sin(x * config.frequency + time * config.speed + line.phase) * config.amplitude;

          // Adding a second wave layer for complexity
          const yOffset2 = Math.cos(x * config.frequency * 2 - time * config.speed * 1.5) * (config.amplitude * 0.5);

          ctx.lineTo(x, line.y + yOffset + yOffset2);
        }
        ctx.stroke();
      });

      frameId = requestAnimationFrame(() => draw(time + 1));
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    init();
    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};


const FinalCTA = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);

  const handleTakeAction = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      tx: (Math.random() - 0.5) * 300,
      ty: (Math.random() - 0.5) * 300,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section id="final-cta" className="section-padding bg-gradient-to-b from-[hsl(220_20%_7%)] to-black relative overflow-hidden min-h-[600px] flex items-center justify-center">

      <WaveBackground />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05]" style={{
        background: "radial-gradient(circle, hsl(42 100% 50%), transparent 70%)"
      }} />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.3em] uppercase mb-6 animate-pulse">Ready to Ascend?</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Let's Build Something<br />
            <span className="text-gradient-gold">
              Worth Remembering.
            </span>
          </h2>
          <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            If you care about quality, speed, and results — let's talk.
            Your digital transformation starts with one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative">

            {/* Particle Burst */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: p.tx, y: p.ty, scale: 0, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-50"
                  style={{ top: "50%", left: "50%" }}
                />
              ))}
            </AnimatePresence>

            <MagneticWrapper>
              <div className="relative group">
                <div className="absolute inset-0 bg-gold blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full" />
                <Button
                  variant="hero"
                  size="lg"
                  className="text-lg px-12 py-8 rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-shadow duration-300"
                  onClick={handleTakeAction}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />

                  <motion.span
                    animate={isAnimating ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                    className="flex items-center relative z-10"
                  >
                    Take Action <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Button>
              </div>
            </MagneticWrapper>

            <MagneticWrapper>
              <Button
                variant="heroOutline"
                size="lg"
                className="text-lg px-12 py-8 rounded-full border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group"
                onClick={() => window.open('https://wa.me/918506000070', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" /> WhatsApp Us
              </Button>
            </MagneticWrapper>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
