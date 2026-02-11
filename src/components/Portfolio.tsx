import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "The Brew Room",
    type: "Modern Café Website",
    desc: "A warm, inviting digital experience for an artisan coffee house. Designed to drive foot traffic and build loyal regulars.",
    features: ["Online menu", "Location & hours", "Instagram integration"],
    label: "Concept Project",
    link: "https://demo-website-cafe.vercel.app",
    image: "/images/portfolio/brew-room.png",
  },
  {
    title: "Aura Salon",
    type: "Luxury Salon Website",
    desc: "Elegant, minimal design for a high-end salon. Built to attract premium clients and simplify bookings.",
    features: ["Service catalog", "WhatsApp booking", "Client testimonials"],
    label: "Concept Project",
    link: "https://demo-website-salon.vercel.app",
    image: "/images/portfolio/aura-salon.png",
  },
  {
    title: "Olive & Ember",
    type: "Boutique Restaurant Website",
    desc: "A rich, immersive website for a fine-dining restaurant. Focused on atmosphere, trust, and reservations.",
    features: ["Dynamic menu", "Reservation system", "Chef's story"],
    label: "Concept Project",
    link: "https://demo-website-dining.vercel.app",
    image: "/images/portfolio/olive-amber.png",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="fix-safari-flicker group rounded-xl overflow-hidden bg-card border border-border hover:border-gold/30 transition-all duration-500 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden h-48 sm:h-56 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gold/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center text-gold transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute bottom-4 left-4 z-20">
          <span className="text-xs tracking-[0.15em] uppercase text-gold/90 bg-background/80 px-3 py-1 rounded-full backdrop-blur-md border border-gold/10">
            {project.label}
          </span>
        </div>
      </a>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gold text-xs tracking-[0.15em] uppercase mb-2">{project.type}</p>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
          <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.features.map((f) => (
            <span key={f} className="text-xs px-3 py-1 rounded-full bg-surface-light text-muted-foreground border border-white/5">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding bg-gradient-section">
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
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
