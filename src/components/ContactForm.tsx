import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import MagneticWrapper from "./ui/MagneticWrapper";
import { toast } from "sonner"; // Assuming sonner or similar toast is available, checking imports later if not

const ContactForm = () => {
    // using uncontrolled inputs for performance (no re-renders on keystroke)
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const description = descriptionRef.current?.value;

        if (!name || !email || !description) {
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch("https://formsubmit.co/ajax/devansh.studio.work@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: description,
                    _subject: `New Project Inquiry from ${name} (Devansh Studio)`,
                    _template: "table"
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                // Reset form
                if (nameRef.current) nameRef.current.value = "";
                if (emailRef.current) emailRef.current.value = "";
                if (descriptionRef.current) descriptionRef.current.value = "";
            } else {
                console.error("Submission failed:", data);
                setStatus("idle");
                alert(data.message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setStatus("idle");
            alert("Network error. Please try again.");
        }
    }


    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center p-8 bg-card/30 backdrop-blur-md rounded-2xl border border-gold/20 text-center min-h-[300px]"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                            className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4 text-gold"
                        >
                            <CheckCircle className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">We'll be in touch shortly to discuss your vision.</p>
                        <Button
                            variant="ghost"
                            className="mt-6 text-gold hover:text-white"
                            onClick={() => setStatus("idle")}
                        >
                            Send another message
                        </Button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 bg-card/30 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                    >
                        {/* Glass Reflections */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
                            <Input
                                id="name"
                                required
                                ref={nameRef}
                                placeholder="John Doe"
                                className="bg-black/20 border-white/10 focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                            <Input
                                id="email"
                                type="email"
                                required
                                ref={emailRef}
                                placeholder="john@example.com"
                                className="bg-black/20 border-white/10 focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-muted-foreground ml-1">Project Description</label>
                            <Textarea
                                id="description"
                                required
                                ref={descriptionRef}
                                placeholder="I need a modern website for my..."
                                className="bg-black/20 border-white/10 focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 min-h-[100px] placeholder:text-white/20 resize-none"
                            />
                        </div>

                        <div className="pt-2">
                            {/* Disabled Magnetic Effect on Mobile via CSS pointer-events or media query logic in the wrapper itself */}
                            <MagneticWrapper strength={0.2}>
                                <Button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-gold text-background hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold py-6 relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Request <Send className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                                </Button>
                            </MagneticWrapper>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactForm;
