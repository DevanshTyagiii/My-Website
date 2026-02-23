import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ParallaxDividerProps {
    className?: string;
    variant?: "dots" | "lines" | "orbs";
}

const ParallaxDivider = ({ className = "", variant = "lines" }: ParallaxDividerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), { stiffness: 100, damping: 20 });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 100, damping: 20 });
    const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 50]), { stiffness: 100, damping: 20 });
    const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-15, 15]), { stiffness: 100, damping: 20 });
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    if (variant === "dots") {
        return (
            <div ref={ref} className={`relative h-20 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
                <motion.div style={{ y: y1, x: x1 }} className="absolute left-[15%] top-1/2 w-2 h-2 rounded-full bg-gold/30" />
                <motion.div style={{ y: y2 }} className="absolute left-[35%] top-1/2 w-1.5 h-1.5 rounded-full bg-gold/20" />
                <motion.div style={{ y: y3 }} className="absolute left-[55%] top-1/2 w-3 h-3 rounded-full bg-gold/15 blur-[1px]" />
                <motion.div style={{ y: y1 }} className="absolute left-[75%] top-1/2 w-1 h-1 rounded-full bg-gold/40" />
                <motion.div style={{ y: y2, x: x1 }} className="absolute left-[90%] top-1/2 w-2 h-2 rounded-full bg-gold/25" />

                {/* Center line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </div>
        );
    }

    if (variant === "orbs") {
        return (
            <div ref={ref} className={`relative h-24 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
                <motion.div
                    style={{ y: y1, scale: scale1 }}
                    className="absolute left-[20%] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold/5 blur-xl"
                />
                <motion.div
                    style={{ y: y2, scale: scale1 }}
                    className="absolute left-[50%] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gold/8 blur-2xl"
                />
                <motion.div
                    style={{ y: y3, scale: scale1 }}
                    className="absolute left-[80%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold/5 blur-xl"
                />

                {/* Thin gold line */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
            </div>
        );
    }

    // Default: lines variant
    return (
        <div ref={ref} className={`relative h-16 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute left-[10%] top-1/2 w-12 h-px bg-gradient-to-r from-gold/30 to-transparent"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute left-[30%] top-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
            />
            <motion.div
                style={{ y: y3, rotate: rotate1 }}
                className="absolute left-[60%] top-1/2 w-8 h-px bg-gold/25"
            />
            <motion.div
                style={{ y: y1, x: x1 }}
                className="absolute left-[80%] top-1/2 w-16 h-px bg-gradient-to-l from-gold/30 to-transparent"
            />

            {/* Small diamond accents */}
            <motion.div style={{ y: y2, x: x1 }} className="absolute left-[45%] top-1/2 w-1.5 h-1.5 bg-gold/30 rotate-45" />
            <motion.div style={{ y: y3 }} className="absolute left-[70%] top-1/2 w-1 h-1 bg-gold/20 rotate-45" />
        </div>
    );
};

export default ParallaxDivider;
