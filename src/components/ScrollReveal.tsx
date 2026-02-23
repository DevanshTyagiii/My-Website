import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "blur-in";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    margin?: string;
}

const variantMap: Record<RevealVariant, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-up": {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    "blur-in": {
        hidden: { opacity: 0, filter: "blur(12px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
    },
};

const ScrollReveal = ({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 0.7,
    className = "",
    once = true,
    margin = "-80px",
}: ScrollRevealProps) => {
    return (
        <motion.div
            className={className}
            variants={variantMap[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
