import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const plans = [
  {
    name: "Basic Premium",
    price: "Starting from ₹9,998",
    desc: "Perfect for new businesses that want a clean, professional online presence.",
    features: ["Custom one-page design", "Mobile responsive", "Contact & WhatsApp integration", "Basic SEO setup", "Hosting guidance"],
    featured: false,
  },
  {
    name: "High-End Business",
    price: "Custom pricing",
    desc: "For established brands that demand more — multi-page, advanced features, premium finish.",
    features: ["Multi-page custom design", "Booking & form integration", "Advanced SEO & speed optimization", "Content strategy support", "Priority delivery (5–7 days)"],
    featured: true,
  },
];

const PlanCard = ({ plan, index }: { plan: typeof plans[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`fix-safari-flicker relative h-full rounded-2xl p-8 border transition-all duration-500 overflow-hidden group ${plan.featured
          ? "bg-card/40 backdrop-blur-md border-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]"
          : "bg-card/20 backdrop-blur-sm border-white/5 hover:border-white/20"
          }`}
      >
        {/* Animated Background for Featured Card */}
        {plan.featured && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gold/5 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
          </div>
        )}

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          {plan.featured && (
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs tracking-[0.2em] uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 inline-block border border-gold/20"
            >
              Most Popular
            </motion.span>
          )}
          <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
          <p className="text-3xl font-bold text-gradient-gold mb-4 drop-shadow-md">{plan.price}</p>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed h-[40px]">{plan.desc}</p>

          <ul className="space-y-4 mb-10">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm group/item">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold/20 transition-colors">
                  <Check className="h-3 w-3 text-gold" />
                </div>
                <span className="text-secondary-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 mt-auto">
          <Button
            variant={plan.featured ? "hero" : "heroOutline"}
            className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${plan.featured ? "shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]" : "hover:bg-white/5"}`}
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding bg-gradient-section relative">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transparent Pricing. <span className="text-gradient-gold">Premium Quality.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
