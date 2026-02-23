const defaultItems = [
    "Premium Design",
    "✦",
    "Conversion Focused",
    "✦",
    "Lightning Fast",
    "✦",
    "Mobile First",
    "✦",
    "SEO Optimized",
    "✦",
    "Hosted & Managed",
    "✦",
    "Custom Built",
    "✦",
    "Pixel Perfect",
    "✦",
];

interface ScrollingMarqueeProps {
    items?: string[];
    speed?: number;
    reverse?: boolean;
    className?: string;
}

const ScrollingMarquee = ({
    items = defaultItems,
    speed = 40,
    reverse = false,
    className = "",
}: ScrollingMarqueeProps) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`relative overflow-hidden py-6 select-none ${className}`}
            aria-hidden="true"
        >
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            <div
                className="flex whitespace-nowrap"
                style={{
                    animation: `marquee-scroll ${animationDuration} linear infinite${reverse ? " reverse" : ""}`,
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className={`mx-4 text-sm md:text-base font-medium tracking-[0.15em] uppercase ${item === "✦"
                                ? "text-gold text-xs"
                                : "text-muted-foreground/50"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ScrollingMarquee;
