import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Owner, Bloom Café",
    text: "Devansh delivered exactly what we needed — a website that looks premium and actually brings in customers. Best decision we made.",
  },
  {
    name: "Arjun Kapoor",
    role: "Founder, Luxe Salon",
    text: "The speed, the quality, the attention to detail. Our bookings went up within the first week. Highly recommend.",
  },
  {
    name: "Sneha Iyer",
    role: "Manager, Olive & Ember",
    text: "Professional, fast, and zero hassle. The website speaks for itself — our guests love it.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Trusted by <span className="text-gradient-gold">Growing Businesses</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="p-8 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-secondary-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
