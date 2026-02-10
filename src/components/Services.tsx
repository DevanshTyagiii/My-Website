import { motion } from "framer-motion";
import { Palette, Layout, Coffee, MessageCircle, Zap, Rocket } from "lucide-react";

const services = [
  { icon: Palette, title: "Custom Website Design", desc: "Unique designs crafted for your brand. No templates. No shortcuts." },
  { icon: Layout, title: "Business Landing Pages", desc: "High-converting pages that turn visitors into paying customers." },
  { icon: Coffee, title: "Cafe & Salon Websites", desc: "Built specifically for hospitality. Menus, bookings, vibes — all covered." },
  { icon: MessageCircle, title: "Booking & WhatsApp Integration", desc: "Let customers reach you instantly. One tap. No friction." },
  { icon: Zap, title: "Performance & SEO Basics", desc: "Fast load times. Google-friendly. Built to be found." },
  { icon: Rocket, title: "Hosting & Launch Support", desc: "We handle the tech. You focus on your business." },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-gradient-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Not just websites.{" "}
            <span className="text-gradient-gold">Digital storefronts</span> that work.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="fix-safari-flicker group p-8 rounded-xl bg-card border border-border hover:border-gold/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <service.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
