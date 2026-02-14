import { useEffect, useRef } from "react";

const InteractiveParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Mobile check
        const isMobile = window.innerWidth < 768;

        // If mobile, we might want to disable entirely or drastically reduce
        // For this implementation, we drastically reduce and remove interaction
        if (isMobile) {
            // Simplified static background or very few particles
            // Let's just return early and let CSS handle a static background if needed
            // Or render very few static particles
        }

        let particles: Particle[] = [];
        let animationFrameId: number;
        const mouse = { x: -1000, y: -1000, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                // Random velocity for continuous motion
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;

                // Premium colors: mainly gold and white
                const colors = ["hsla(42, 45%, 58%, 0.4)", "hsla(0, 0%, 100%, 0.2)"];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Continuous movement
                this.x += this.vx;
                this.y += this.vy;

                // Screen wrapping
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;

                // Mouse interaction - ONLY ON DESKTOP
                if (!isMobile) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 3;
                        const directionY = forceDirectionY * force * 3;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        const initParticles = () => {
            particles = [];
            // Balanced density for premium feel
            // Drastically reduce on mobile if not disabled
            const densityFactor = isMobile ? 20000 : 8000;
            const numberOfParticles = (canvas.width * canvas.height) / densityFactor;

            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            // Reduce connection distance on mobile or disable
            const maxDistance = isMobile ? 80 : 120;

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacityValue = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(200, 160, 100, ${opacityValue * 0.15})`; // Subtle gold lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connectParticles();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return;
            mouse.x = e.x;
            mouse.y = e.y;
        };

        window.addEventListener("resize", resizeCanvas);
        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (!isMobile) {
                window.removeEventListener("mousemove", handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: "transparent" }}
        />
    );
};

export default InteractiveParticles;
