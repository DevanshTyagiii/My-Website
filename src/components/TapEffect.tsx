import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
    x: number;
    y: number;
    id: number;
}

const TapEffect = () => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newRipple = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now(),
            };
            setRipples((prev) => [...prev, newRipple]);
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    // Remove ripples after animation
    const removeRipple = (id: number) => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        onAnimationComplete={() => removeRipple(ripple.id)}
                        className="absolute rounded-full bg-gold/30"
                        style={{
                            left: ripple.x - 25,
                            top: ripple.y - 25,
                            width: 50,
                            height: 50,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TapEffect;
