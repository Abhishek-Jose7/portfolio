"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Environment } from "@react-three/drei";
import { useTheme } from "@/components/ThemeProvider";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const technologies = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Python", "AI/ML", "Three.js", "Tailwind"
];

function FloatingWord({ word, position, color }: { word: string; position: [number, number, number]; color: string }) {
    return (
        <Float floatIntensity={2} rotationIntensity={1} speed={1.5}>
            <Text
                position={position}
                fontSize={0.5}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.ttf" // Fallback font, might need to ensure it exists or use default
            >
                {word}
            </Text>
        </Float>
    );
}

function Scene() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const color = isDark ? "#ffffff" : "#000000";
    const accent = "#3b82f6";

    const words = useMemo(() => {
        return technologies.map((tech, i) => {
            const x = (Math.random() - 0.5) * 8;
            const y = (Math.random() - 0.5) * 6;
            const z = (Math.random() - 0.5) * 4;
            return {
                text: tech,
                position: [x, y, z] as [number, number, number],
                color: Math.random() > 0.5 ? color : accent
            };
        });
    }, [color]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {words.map((word, i) => (
                <FloatingWord key={i} word={word.text} position={word.position} color={word.color} />
            ))}
            <Environment preset="city" />
        </>
    );
}

export function TechFloatingIcons() {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
