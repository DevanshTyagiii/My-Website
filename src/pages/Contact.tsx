import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import AmbientWaveBackground from "@/components/AmbientWaveBackground";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background relative">
            <AmbientWaveBackground />
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Ready to start your project? Fill out the form below or reach out directly.
                    </p>
                </motion.div>
                <ContactForm />
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
