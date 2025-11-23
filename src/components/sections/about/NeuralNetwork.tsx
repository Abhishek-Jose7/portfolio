"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    label: string;
    category: string;
    id: string;
}

export function NeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        let width = rect.width;
        let height = rect.height;

        // Define interests with relationships
        const interests = [
            // Tech
            { id: "react", label: "React", category: "tech" },
            { id: "nextjs", label: "Next.js", category: "tech" },
            { id: "typescript", label: "TypeScript", category: "tech" },
            { id: "python", label: "Python", category: "tech" },
            { id: "aiml", label: "AI/ML", category: "tech" },
            { id: "threejs", label: "Three.js", category: "tech" },
            { id: "nodejs", label: "Node.js", category: "tech" },
            { id: "docker", label: "Docker", category: "tech" },
            { id: "postgresql", label: "PostgreSQL", category: "tech" },
            { id: "aws", label: "AWS", category: "tech" },
            // Science
            { id: "astronomy", label: "Astronomy", category: "science" },
            { id: "quantum", label: "Quantum Physics", category: "science" },
            { id: "astrophysics", label: "Astrophysics", category: "science" },
            { id: "cosmology", label: "Cosmology", category: "science" },
            { id: "neuroscience", label: "Neuroscience", category: "science" },
            // Creative
            { id: "anime", label: "Anime", category: "creative" },
            { id: "manga", label: "Manga", category: "creative" },
            { id: "scifi", label: "Sci-Fi", category: "creative" },
            { id: "gaming", label: "Gaming", category: "creative" },
            { id: "music", label: "Music", category: "creative" },
            { id: "digitalart", label: "Digital Art", category: "creative" },
            // Philosophy
            { id: "philosophy", label: "Philosophy", category: "philosophy" },
            { id: "ethics", label: "Ethics", category: "philosophy" },
            { id: "stoicism", label: "Stoicism", category: "philosophy" },
        ];

        // Define relationships (only related nodes connect)
        const relationships: Record<string, string[]> = {
            react: ["nextjs", "typescript", "threejs", "nodejs"],
            nextjs: ["react", "typescript", "nodejs"],
            typescript: ["react", "nextjs", "python", "nodejs"],
            python: ["aiml", "typescript", "postgresql"],
            aiml: ["python", "neuroscience", "quantum"],
            threejs: ["react", "digitalart"],
            nodejs: ["react", "nextjs", "typescript", "postgresql"],
            docker: ["aws", "nodejs", "postgresql"],
            postgresql: ["python", "nodejs", "docker"],
            aws: ["docker", "nodejs"],
            astronomy: ["astrophysics", "cosmology", "quantum"],
            quantum: ["astrophysics", "astronomy", "aiml", "philosophy"],
            astrophysics: ["astronomy", "cosmology", "quantum"],
            cosmology: ["astronomy", "astrophysics"],
            neuroscience: ["aiml", "philosophy"],
            anime: ["manga", "scifi", "gaming"],
            manga: ["anime", "digitalart"],
            scifi: ["anime", "astronomy", "quantum", "philosophy"],
            gaming: ["anime", "music", "digitalart"],
            music: ["gaming", "philosophy"],
            digitalart: ["threejs", "manga", "gaming"],
            philosophy: ["ethics", "stoicism", "quantum", "scifi", "neuroscience"],
            ethics: ["philosophy", "stoicism", "aiml"],
            stoicism: ["philosophy", "ethics"],
        };

        const nodes: Node[] = interests.map((interest) => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            label: interest.label,
            category: interest.category,
            id: interest.id,
        }));

        const getCategoryColor = (category: string) => {
            const colors: Record<string, string> = {
                tech: "rgba(56, 189, 248, 1)",
                science: "rgba(168, 85, 247, 1)",
                creative: "rgba(236, 72, 153, 1)",
                philosophy: "rgba(251, 191, 36, 1)",
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

                if (node.x < 70 || node.x > width - 70) node.vx *= -1;
                if (node.y < 50 || node.y > height - 50) node.vy *= -1;
            });

            // Draw connections (only between related nodes)
            nodes.forEach((node) => {
                const related = relationships[node.id] || [];
                related.forEach((relatedId) => {
                    const other = nodes.find((n) => n.id === relatedId);
                    if (!other) return;

                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);

                    const opacity = Math.min(0.6, 1 - distance / 400);
                    ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                });
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

                ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
                ctx.fillRect(
                    node.x - textWidth / 2 - padding,
                    labelY - 9,
                    textWidth + padding * 2,
                    18
                );

                ctx.strokeStyle = color.replace('1)', '0.6)');
                ctx.lineWidth = 1;
                ctx.strokeRect(
                    node.x - textWidth / 2 - padding,
                    labelY - 9,
                    textWidth + padding * 2,
                    18
                );

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
