import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    baseX: number;
    speed: number;
    size: number;
    opacity: number;
    waveOffset: number;
}

const AmbientWaveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Mobile optimization: reduce particles on smaller screens
            const isMobile = window.innerWidth < 768;
            const densityFactor = isMobile ? 15000 : 8000;
            const particleCount = Math.floor((canvas.width * canvas.height) / densityFactor);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height * 1.5 - canvas.height * 0.5, // Mix of above and in viewport
                    baseX: Math.random() * canvas.width,
                    speed: 0.3 + Math.random() * 0.5, // Slow descent
                    size: 1.5 + Math.random() * 2.5,
                    opacity: 0.15 + Math.random() * 0.25, // More visible
                    waveOffset: Math.random() * Math.PI * 2,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position - top to bottom flow
                particle.y += particle.speed;

                // Wave motion (sine wave for horizontal drift)
                const waveAmplitude = 30;
                const waveFrequency = 0.002;
                particle.x = particle.baseX + Math.sin(particle.y * waveFrequency + particle.waveOffset) * waveAmplitude;

                // Reset particle when it goes below viewport
                if (particle.y > canvas.height) {
                    particle.y = -10;
                    particle.x = Math.random() * canvas.width;
                    particle.baseX = particle.x;
                }

                // Draw particle
                ctx.fillStyle = `hsla(42, 45%, 58%, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default AmbientWaveBackground;
