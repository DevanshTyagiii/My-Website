import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  { num: "1", title: "Understand", desc: "We learn your business, audience, and goals inside out." },
  { num: "2", title: "Design", desc: "Craft a visual identity that feels premium and purposeful." },
  { num: "3", title: "Build", desc: "Develop a fast, responsive, conversion-ready website." },
  { num: "4", title: "Launch", desc: "Go live with confidence. We handle hosting and support." },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="fix-safari-flicker relative text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <span className="text-5xl font-bold text-gold/50 font-display">{step.num}</span>
      <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
    </motion.div>
  );
};

const Process = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            A Simple, <span className="text-gradient-gold">Proven Process</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
