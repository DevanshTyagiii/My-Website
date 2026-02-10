import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "Understand", desc: "We learn your business, audience, and goals inside out." },
  { num: "2", title: "Design", desc: "Craft a visual identity that feels premium and purposeful." },
  { num: "3", title: "Build", desc: "Develop a fast, responsive, conversion-ready website." },
  { num: "4", title: "Launch", desc: "Go live with confidence. We handle hosting and support." },
];

const Process = () => {
  return (
    <section id="process" className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            A Simple, <span className="text-gradient-gold">Proven Process</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="fix-safari-flicker relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="text-5xl font-bold text-gold/50 font-display">{step.num}</span>
              <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
