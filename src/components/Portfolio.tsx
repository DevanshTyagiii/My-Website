import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "The Brew Room",
    type: "Modern Café Website",
    desc: "A warm, inviting digital experience for an artisan coffee house.",
    features: ["Online menu", "Location & hours"],
    label: "Concept Project",
    link: "https://demo-website-cafe.vercel.app",
    image: "/images/portfolio/brew-room.png",
  },
  {
    title: "Aura Salon",
    type: "Luxury Salon Website",
    desc: "Elegant, minimal design for a high-end salon.",
    features: ["Service catalog", "WhatsApp booking"],
    label: "Concept Project",
    link: "https://demo-website-salon.vercel.app",
    image: "/images/portfolio/aura-salon.png",
  },
  {
    title: "Olive & Ember",
    type: "Boutique Restaurant Website",
    desc: "A rich, immersive website for a fine-dining restaurant.",
    features: ["Dynamic menu", "Reservation system"],
    label: "Concept Project",
    link: "https://demo-website-dining.vercel.app",
    image: "/images/portfolio/olive-amber.png",
  },
];

const ProjectCard3D = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
      ref={ref}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10"
      >
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            <div className="absolute inset-0 bg-gold/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center text-gold transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <ExternalLink className="h-5 w-5" />
              </div>
            </div>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col h-full bg-card/95 backdrop-blur-sm" style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-gold text-xs tracking-[0.15em] uppercase font-bold">{project.type}</p>
              <span className="text-[10px] tracking-wider uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-full">{project.label}</span>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.desc}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.features.map((f) => (
                <span key={f} className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground border border-white/5">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Holographic Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[linear-gradient(transparent_0%,rgba(66,153,244,0.1)_50%,transparent_100%)] bg-[length:100%_4px]" />
        </a>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding bg-gradient-section overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold font-bold text-sm tracking-[0.2em] uppercase mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold">Selected Work</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard3D key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
