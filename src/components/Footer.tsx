import { motion, useInView } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Failed to send message. Please check your connection.");
    }
  };

  return (
    <footer id="contact" className="section-padding bg-background border-t border-border/50 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            ref={ref}
            className="fix-safari-flicker"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to <span className="text-gradient-gold">Elevate Your Brand?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Let's build a website that doesn't just look good — it works.
              Start with a free consultation today.
            </p>
            <div className="space-y-4">
              <a href="mailto:devansh.studio.work@gmail.com?subject=Project%20Inquiry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                devansh.studio.work@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Simple Contact Form Placeholder */}
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={4}
              required
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
            ></textarea>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-gold text-background font-semibold py-4 rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Message Sent!
                </>
              ) : (
                "Send Message"
              )}
            </button>
            {status === "error" && (
              <div className="text-red-500 text-sm flex items-center gap-2 mt-2">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}
            {status === "success" && (
              <p className="text-green-500 text-sm mt-2">
                Thank you! We'll be in touch shortly.
              </p>
            )}
          </motion.form>
        </div>

        <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Devansh Digital Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
