"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    label: string;
    category: string;
}

export function NeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Get device pixel ratio for crisp rendering on high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set canvas size accounting for device pixel ratio
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Scale context to match
        ctx.scale(dpr, dpr);

        let width = rect.width;
        let height = rect.height;

        // Expanded diverse interests
        const interests = [
            // Tech
            { label: "React", category: "tech" },
            { label: "Next.js", category: "tech" },
            { label: "Python", category: "tech" },
            { label: "AI/ML", category: "tech" },
            { label: "Three.js", category: "tech" },
            { label: "Node.js", category: "tech" },
            { label: "TypeScript", category: "tech" },
            { label: "Docker", category: "tech" },
            { label: "PostgreSQL", category: "tech" },
            { label: "AWS", category: "tech" },
            // Science
            { label: "Astronomy", category: "science" },
            { label: "Quantum Physics", category: "science" },
            { label: "Astrophysics", category: "science" },
            { label: "Cosmology", category: "science" },
            { label: "Neuroscience", category: "science" },
            // Creative
            { label: "Anime", category: "creative" },
            { label: "Manga", category: "creative" },
            { label: "Sci-Fi", category: "creative" },
            { label: "Gaming", category: "creative" },
            { label: "Music", category: "creative" },
            { label: "Digital Art", category: "creative" },
            // Philosophy
            { label: "Philosophy", category: "philosophy" },
            { label: "Ethics", category: "philosophy" },
            { label: "Stoicism", category: "philosophy" },
        ];

        const nodes: Node[] = [];
        const connectionDistance = 200;

        // Initialize nodes
        interests.forEach((interest) => {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                label: interest.label,
                category: interest.category,
            });
        });

        const getCategoryColor = (category: string) => {
            const colors: Record<string, string> = {
                tech: "rgba(56, 189, 248, 1)", // Bright cyan
                science: "rgba(168, 85, 247, 1)", // Purple
                creative: "rgba(236, 72, 153, 1)", // Pink
                philosophy: "rgba(251, 191, 36, 1)", // Amber
            };
            return colors[category] || "rgba(56, 189, 248, 1)";
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            // Update nodes
            nodes.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce with padding
                if (node.x < 70 || node.x > width - 70) node.vx *= -1;
                if (node.y < 50 || node.y > height - 50) node.vy *= -1;
            });

            // Draw connections
            nodes.forEach((node, i) => {
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        const opacity = (1 - distance / connectionDistance) * 0.5;
                        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                }
            });

            // Draw nodes
            nodes.forEach((node) => {
                const color = getCategoryColor(node.category);

                // Outer glow
                ctx.beginPath();
                ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
                gradient.addColorStop(0, color.replace('1)', '0.4)'));
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Label
                ctx.font = "600 13px 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                const metrics = ctx.measureText(node.label);
                const textWidth = metrics.width;
                const padding = 6;
                const labelY = node.y + 20;

                // Label background
                ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
                ctx.fillRect(
                    node.x - textWidth / 2 - padding,
                    labelY - 9,
                    textWidth + padding * 2,
                    18
                );

                // Label border
                ctx.strokeStyle = color.replace('1)', '0.6)');
                ctx.lineWidth = 1;
                ctx.strokeRect(
                    node.x - textWidth / 2 - padding,
                    labelY - 9,
                    textWidth + padding * 2,
                    18
                );

                // Label text
                ctx.fillStyle = "#ffffff";
                ctx.fillText(node.label, node.x, labelY);
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            width = rect.width;
            height = rect.height;
        };

        window.addEventListener("resize", handleResize);
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-950 via-black to-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" />
            <canvas ref={canvasRef} className="w-full h-full block" style={{ imageRendering: 'crisp-edges' }} />
        </div>
    );
}
