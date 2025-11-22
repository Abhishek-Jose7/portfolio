"use client";
import React, { useRef, useEffect } from "react";

interface StarFieldProps {
    speed?: number;
    backgroundColor?: string;
    starColor?: string;
    count?: number;
}

export const StarField = ({
    speed = 0.05,
    backgroundColor = "transparent",
    starColor = "#ffffff",
    count = 400,
}: StarFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; o: number }[] = [];
        let width = 0;
        let height = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2 + 0.5, // Depth/Size
                    o: Math.random(), // Opacity
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = backgroundColor;
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                ctx.fillStyle = starColor;
                ctx.globalAlpha = star.o;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.z * 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Move stars
                star.y -= speed * star.z;

                // Reset if off screen
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed, backgroundColor, starColor, count]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
};
