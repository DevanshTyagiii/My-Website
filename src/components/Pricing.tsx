import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

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

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-gradient-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Transparent Pricing. <span className="text-gradient-gold">Premium Quality.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`rounded-xl p-8 border transition-all duration-500 ${plan.featured
                ? "bg-card border-gold/30 glow-gold"
                : "bg-card border-border"
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {plan.featured && (
                <span className="text-xs tracking-[0.15em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-gradient-gold mb-3">{plan.price}</p>
              <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-gold flex-shrink-0" />
                    <span className="text-secondary-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "hero" : "heroOutline"}
                className="w-full py-5"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
