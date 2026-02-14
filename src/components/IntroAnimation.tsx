import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
    onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
    const [text, setText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [stage, setStage] = useState<"typing" | "deleting" | "retyping" | "final" | "exit">("typing");

    const fullText = "devansh.digital";

    // Timing configurations
    const typingSpeed = 80; // Slightly faster for smoother feel
    const deletingSpeed = 40;
    const pauseDuration = 600;

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (stage === "typing") {
            if (text.length < fullText.length) {
                timeout = setTimeout(() => {
                    setText(fullText.slice(0, text.length + 1));
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => setStage("deleting"), pauseDuration);
            }
        } else if (stage === "deleting") {
            if (text.length > "devansh.".length) {
                timeout = setTimeout(() => {
                    setText(text.slice(0, -1));
                }, deletingSpeed);
            } else {
                setStage("retyping");
            }
        } else if (stage === "retyping") {
            const remainingTarget = "Studio";
            const currentLength = text.length - "devansh.".length;

            if (currentLength < remainingTarget.length) {
                timeout = setTimeout(() => {
                    setText("devansh." + remainingTarget.slice(0, currentLength + 1));
                }, typingSpeed);
            } else {
                // Wait a bit before capitalizing
                timeout = setTimeout(() => {
                    setText("Devansh.Studio");
                    setStage("final");
                }, pauseDuration);
            }
        } else if (stage === "final") {
            // Stop cursor blinking before moving
            setShowCursor(false);
            timeout = setTimeout(() => {
                setStage("exit");
            }, 800);
        } else if (stage === "exit") {
            timeout = setTimeout(() => {
                onComplete();
            }, 1500);
        }

        // Failsafe: if animation gets stuck for any reason, force complete after 8 seconds
        const safetyTimeout = setTimeout(() => {
            if (stage !== "exit") {
                setStage("exit");
            }
        }, 8000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(safetyTimeout);
        };
    }, [text, stage, onComplete]);

    useEffect(() => {
        // Only blink cursor if not in final stages
        if (stage === 'final' || stage === 'exit') {
            setShowCursor(false);
            return;
        }

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, [stage]);

    const renderText = () => {
        const parts = text.split('.');
        if (parts.length > 1) {
            return (
                <>
                    {parts[0]}<span className="text-gold">.</span>{parts.slice(1).join('.')}
                </>
            );
        }
        return text;
    };

    // Custom bezier for very smooth startup and slowdown
    const smoothEase = [0.43, 0.13, 0.23, 0.96] as const;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" }, pointerEvents: "none" }}
            >
                <motion.div
                    className="font-bold tracking-[0.1em] uppercase flex items-center"
                    initial={{
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                        position: "fixed"
                    }}
                    animate={stage === "exit" ? {
                        fontSize: "0.875rem", /* text-sm */
                        top: "2rem", /* 32px center of h-16 */
                        left: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
                        x: "0%",
                        y: "-50%",
                        color: "var(--foreground)" // Ensure color consistency
                    } : {
                        scale: 1,
                        opacity: 1,
                        x: "-50%",
                        y: "-50%"
                    }}
                    transition={{
                        duration: 1.2,
                        ease: smoothEase,
                        // Layout animations for font-size can be jittery, 
                        // but Framer Motion handles it reasonably well.
                    }}
                >
                    <span className="whitespace-nowrap">{renderText()}</span>
                    {(stage !== "exit" && stage !== "final") && (
                        <motion.span
                            animate={{ opacity: showCursor ? 1 : 0 }}
                            transition={{ duration: 0.1 }}
                            className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
                        />
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default IntroAnimation;
