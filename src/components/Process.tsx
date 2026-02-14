import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "1", title: "Understand", desc: "We learn your business, audience, and goals inside out." },
  { num: "2", title: "Design", desc: "Craft a visual identity that feels premium and purposeful." },
  { num: "3", title: "Build", desc: "Develop a fast, responsive, conversion-ready website." },
  { num: "4", title: "Launch", desc: "Go live with confidence. We handle hosting and support." },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0], index: number }) => {
  return (
    <div className="relative flex flex-col items-center text-center p-8 bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-card/80 transition-all duration-500 group z-10 w-full hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] hover:-translate-y-2">
      <div className="mb-6 relative">
        {/* Number Background Glow */}
        <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="relative z-10 text-7xl font-bold text-gold font-display drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
          {step.num}
        </span>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_10px_#FFD700]" />
      </div>

      <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors duration-300">{step.title}</h3>
      <p className="text-muted-foreground text-base leading-relaxed max-w-xs">{step.desc}</p>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/50 transition-all duration-300 rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/50 transition-all duration-300 rounded-br-lg" />
    </div>
  );
};

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Calculate line height based on scroll
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section-padding bg-gradient-dark relative overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            A Simple, <span className="text-gradient-gold">Proven Process</span>
          </h2>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-10 relative">
          {/* Connecting Line */}
          <div className="absolute top-20 left-0 right-0 h-[2px] bg-white/5 -z-10">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-gold via-gold/50 to-gold w-full shadow-[0_0_10px_#FFD700]"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProcessStep step={step} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden flex flex-col gap-16 relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              style={{ height: lineHeight, transformOrigin: "top" }}
              className="w-full bg-gradient-to-b from-gold via-gold/50 to-gold shadow-[0_0_10px_#FFD700]"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Bullet Point */}
              <div className="absolute -left-[39px] top-10 w-6 h-6 rounded-full bg-card border-2 border-gold z-10 flex items-center justify-center shadow-[0_0_10px_#FFD700]">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              </div>

              <ProcessStep step={step} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
