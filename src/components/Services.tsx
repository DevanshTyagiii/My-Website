import { motion, useInView, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { Palette, Layout, Coffee, MessageCircle, Zap, Rocket } from "lucide-react";
import { useRef } from "react";

const services = [
  { icon: Palette, title: "Custom Website Design", desc: "Unique designs crafted for your brand. No templates. No shortcuts." },
  { icon: Layout, title: "Business Landing Pages", desc: "High-converting pages that turn visitors into paying customers." },
  { icon: Coffee, title: "Cafe & Salon Websites", desc: "Built specifically for hospitality. Menus, bookings, vibes — all covered." },
  { icon: MessageCircle, title: "Booking & WhatsApp Integration", desc: "Let customers reach you instantly. One tap. No friction." },
  { icon: Zap, title: "Performance & SEO Basics", desc: "Fast load times. Google-friendly. Built to be found." },
  { icon: Rocket, title: "Hosting & Launch Support", desc: "We handle the tech. You focus on your business." },
];

const ServiceCard3D = ({ service, index }: { service: typeof services[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  // Transform mouse position to tilt degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Dynamic shadow and sheen
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // Disable tilt on mobile/touch devices for better scrolling experience
    if (window.matchMedia && !window.matchMedia("(hover: hover)").matches) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate normalized mouse position (-0.5 to 0.5)
    // -0.5 is left/top edge, 0 is center, 0.5 is right/bottom edge
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

  // Staggered Entrance Animation Variants
  const variants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.8, rotateX: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 15,
        stiffness: 70,
        mass: 1
      }
    })
  };

  return (
    <motion.div
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="h-full perspective-1000"
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-white/5 hover:border-gold/50 transition-all duration-300 group overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]"
      >
        {/* Dynamic Holographic Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-soft-light"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([latestX, latestY]) => `radial-gradient(circle at ${latestX} ${latestY}, hsla(47, 90%, 50%, 0.3), transparent 60%)`
            )
          }}
        />

        {/* Particle Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20" />

        {/* Depth Layers */}
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <service.icon className="h-7 w-7 text-white group-hover:text-gold transition-colors duration-300" />
          </div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{service.title}</h3>
        </div>

        <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tl-2xl">
          <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-br-2xl">
          <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 translate-x-[100%] translate-y-[100%] group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-gradient-section overflow-hidden perspective-2000">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">What We Do</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Not just websites. <br className="hidden md:block" />
            <span className="text-gradient-gold relative">
              Digital Storefronts
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gold/20 rounded-full blur-sm" />
            </span> that work.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {services.map((service, i) => (
            <ServiceCard3D key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
