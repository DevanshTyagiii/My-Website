import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
    staggerDelay?: number;
    once?: boolean;
    /** Wrap content that should not be split (e.g. JSX) */
    highlight?: ReactNode;
    highlightAfterWord?: number;
}

const TextReveal = ({
    children,
    className = "",
    as: Tag = "h2",
    delay = 0,
    staggerDelay = 0.04,
    once = true,
}: TextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-60px" });

    const words = children.split(" ");

    return (
        <Tag className={className} ref={ref as any}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true" className="inline">
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                            className="inline-block"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: delay + i * staggerDelay,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                        {i < words.length - 1 && <span>&nbsp;</span>}
                    </span>
                ))}
            </span>
        </Tag>
    );
};

export default TextReveal;
