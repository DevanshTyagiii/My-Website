import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Zap, Smartphone, UserCheck, MousePointerClick, Truck, MessageSquare } from "lucide-react";
import { useRef } from "react";

const reasons = [
  { icon: Zap, text: "Tailored designs — no templates" },
  { icon: Smartphone, text: "Mobile-first & lightning fast" },
  { icon: UserCheck, text: "Built for real customers, not designers" },
  { icon: MousePointerClick, text: "Clear calls-to-action on every page" },
  { icon: Truck, text: "Fast delivery (5–7 days)" },
  { icon: MessageSquare, text: "Direct communication, no middlemen" },
];

const ReasonCard3D = ({ reason, index }: { reason: typeof reasons[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      ref={ref}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full p-6 rounded-xl bg-card border border-white/5 overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(255,215,0,0.05)]"
      >
        {/* Holographic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content Layer */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            <reason.icon className="h-6 w-6 text-gold" />
          </div>
          <span className="font-semibold text-lg group-hover:text-gold transition-colors duration-300">{reason.text}</span>
        </div>

        {/* Floating Particles Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500">
          <div className="absolute top-2 right-2 w-1 h-1 bg-gold rounded-full animate-ping" />
          <div className="absolute bottom-4 left-10 w-1 h-1 bg-gold rounded-full animate-ping delay-100" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhyUs = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gradient-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={headerRef}
            className="fix-safari-flicker relative z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Why Us</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Designed to Convert.{" "}
              <span className="text-gradient-gold block mt-2">Built to Last.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We design websites that look exceptional and perform with precision.
              Every detail is crafted to elevate your brand, build credibility,
              and turn attention into measurable growth. This is not decoration.
              It is digital infrastructure for serious business.
            </p>

            {/* Decorative Element */}
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
          </motion.div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-1 gap-4 relative z-10">
            {/* 3D Floating Grid Effect */}
            <div className="grid gap-4">
              {reasons.map((reason, i) => (
                <ReasonCard3D key={reason.text} reason={reason} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
