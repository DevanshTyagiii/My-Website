import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const reasons = [
  "Tailored designs — no templates",
  "Mobile-first & lightning fast",
  "Built for real customers, not designers",
  "Clear calls-to-action on every page",
  "Fast delivery (5–7 days)",
  "Direct communication, no middlemen",
];

const ReasonItem = ({ reason, index }: { reason: string, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="fix-safari-flicker flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Check className="h-4 w-4 text-gold" />
      </div>
      <span className="font-medium">{reason}</span>
    </motion.div>
  );
};

const WhyUs = () => {
  const leftRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: "-100px" });

  const rightRef = useRef(null);
  const isRightInView = useInView(rightRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={leftRef}
            className="fix-safari-flicker"
            initial={{ opacity: 0, x: -30 }}
            animate={isLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Why Us</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Designed to Convert.{" "}
              <span className="text-gradient-gold">Built to Last.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We design websites that look exceptional and perform with precision.
              Every detail is crafted to elevate your brand, build credibility,
              and turn attention into measurable growth. This is not decoration.
              It is digital infrastructure for serious business.
            </p>
          </motion.div>

          <motion.div
            ref={rightRef}
            className="fix-safari-flicker space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isRightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {reasons.map((reason, i) => (
              <ReasonItem key={reason} reason={reason} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
