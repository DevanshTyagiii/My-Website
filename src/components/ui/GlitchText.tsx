import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";

const GlitchText = ({ text, className = "", speed = 50 }: GlitchTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            setDisplayText(text);
            return;
        }

        let interval: NodeJS.Timeout;
        let iteration = 0;

        interval = setInterval(() => {
            setDisplayText((prev) =>
                prev
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Slow down the reveal
        }, speed);

        return () => clearInterval(interval);
    }, [isHovered, text, speed]);

    return (
        <motion.span
            className={`inline-block truncate ${className}`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {displayText}
        </motion.span>
    );
};

export default GlitchText;
