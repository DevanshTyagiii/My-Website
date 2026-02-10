import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "Tailored designs — no templates",
  "Mobile-first & lightning fast",
  "Built for real customers, not designers",
  "Clear calls-to-action on every page",
  "Fast delivery (5–7 days)",
  "Direct communication, no middlemen",
];

const WhyUs = () => {
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Why Us</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Designed to Convert.{" "}
              <span className="text-gradient-gold">Built to Last.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don't build generic websites. Every pixel serves a purpose — 
              to make your business look credible and bring in customers.
            </p>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason}
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-gold" />
                </div>
                <span className="font-medium">{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
