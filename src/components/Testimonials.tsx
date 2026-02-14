import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Owner, Bloom Café",
    text: "Honestly, I didn't think a website would change much for a local spot, but I was wrong. Customers actually tell us they found us through Google and loved the vibe online. It really works.",
  },
  {
    name: "Arjun Kapoor",
    role: "Founder, Luxe Salon",
    text: "I usually don't write reviews, but the work here was exceptional. He didn't just build what I asked for; he actually improved on my ideas. The new booking flow saves us hours every week.",
  },
  {
    name: "Sneha Iyer",
    role: "Manager, Olive & Ember",
    text: "Super fast and actually listens. We had a tight deadline for our launch, and Devansh delivered two days early. The site looks better than our competitors', which is exactly what we wanted.",
  },
  {
    name: "Rohan Das",
    role: "Director, Urban Fitness",
    text: "The responsiveness is insane. It looks perfect on every phone we tested. The animations are subtle but make such a difference in how premium the brand feels now.",
  }
];

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX);
    y.set(clientY);
  };

  return (
    <motion.div
      ref={ref}
      className="fix-safari-flicker relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5 hover:border-gold/30 transition-colors duration-500 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse Follow Glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] bg-gold/10 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          top: y,
          left: x,
          transform: "translate(-50%, -50%)"
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="h-4 w-4 text-gold fill-gold" />
            ))}
          </div>
          <Quote className="h-8 w-8 text-white/5 group-hover:text-gold/20 transition-colors duration-500" />
        </div>

        <p className="text-secondary-foreground text-sm leading-relaxed mb-6 italic tracking-wide">"{t.text}"</p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold text-lg">
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{t.name}</p>
            <p className="text-muted-foreground text-xs">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Use framer-motion useScroll inside the component if needed for parallax bg
  // For now we simulate subtle movement

  return (
    <section className="section-padding bg-gradient-dark relative overflow-hidden" ref={containerRef}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Trusted by <span className="text-gradient-gold">Growing Businesses</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
