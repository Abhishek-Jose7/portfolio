"use client";

import React, { forwardRef, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from "framer-motion";

export interface CSSBoxProps {
    width?: number;
    height?: number;
    depth?: number;
    perspective?: number;
    stiffness?: number;
    damping?: number;
    faces: {
        front?: React.ReactNode;
        back?: React.ReactNode;
        right?: React.ReactNode;
        left?: React.ReactNode;
        top?: React.ReactNode;
        bottom?: React.ReactNode;
    };
    className?: string;
    draggable?: boolean;
}

export interface CSSBoxRef {
    // Methods can be added here if needed
}

const CSSBox = forwardRef<CSSBoxRef, CSSBoxProps>(
    (
        {
            width = 200,
            height = 200,
            depth = 200,
            perspective = 600,
            stiffness = 100,
            damping = 30,
            faces,
            className,
            draggable,
        },
        ref
    ) => {
        // Rotation state
        const [isHovered, setIsHovered] = useState(false);
        const [isDragging, setIsDragging] = useState(false);

        // Continuous rotation values
        const rotateX = useMotionValue(-15);
        const rotateY = useMotionValue(15);

        // Refs for drag
        const prevPointer = useRef({ x: 0, y: 0 });

        // Interaction handling
        const handleMouseMove = (e: React.MouseEvent) => {
            if (draggable) return;

            // Simple interactive rotation on hover (tilt)
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateXValue = ((mouseY - centerY) / centerY) * -30;
            const rotateYValue = ((mouseX - centerX) / centerX) * 30;

            rotateX.set(rotateXValue);
            rotateY.set(rotateYValue);
        };

        const handlePointerDown = (e: React.PointerEvent) => {
            if (!draggable) return;
            setIsDragging(true);
            prevPointer.current = { x: e.clientX, y: e.clientY };
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            if (!draggable || !isDragging) return;

            const deltaX = e.clientX - prevPointer.current.x;
            const deltaY = e.clientY - prevPointer.current.y;

            prevPointer.current = { x: e.clientX, y: e.clientY };

            const sensitivity = 0.8;
            rotateY.set(rotateY.get() + deltaX * sensitivity);
            rotateX.set(rotateX.get() - deltaY * sensitivity);
        };

        const handlePointerUp = (e: React.PointerEvent) => {
            if (!draggable) return;
            setIsDragging(false);
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        };

        const handleMouseLeave = () => {
            if (!draggable) setIsHovered(false);
        };

        // Auto spin logic
        useAnimationFrame((t) => {
            const isInteracting = draggable ? isDragging || isHovered : isHovered;
            if (!isInteracting) {
                rotateY.set(rotateY.get() + 0.5);
                // Gentle swaying on X axis
                rotateX.set(Math.sin(t / 3000) * 20 - 10);
            }
        });

        // Smooth rotation with springs
        const smoothRotateX = useSpring(rotateX, { stiffness, damping });
        const smoothRotateY = useSpring(rotateY, { stiffness, damping });

        const halfDepth = depth / 2;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // Face styles
        const faceStyle = {
            position: "absolute" as const,
            backfaceVisibility: "visible" as const,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.05)",
        };

        return (
            <div
                style={{ perspective: `${perspective}px`, width, height, touchAction: draggable ? 'none' : 'auto' }}
                className={`relative ${className} ${draggable ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={(e) => {
                    // If we are dragging, we might leave the element but pointer capture should handle it.
                    // But for hover effects:
                    if (!draggable) {
                        setIsHovered(false);
                        handleMouseLeave();
                    }
                }}
                onMouseMove={handleMouseMove}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        rotateX: smoothRotateX,
                        rotateY: smoothRotateY,
                    }}
                    className="w-full h-full"
                >
                    {/* Front */}
                    <div
                        style={{
                            ...faceStyle,
                            width,
                            height,
                            transform: `translateZ(${halfDepth}px)`,
                        }}
                    >
                        {faces.front}
                    </div>

                    {/* Back */}
                    <div
                        style={{
                            ...faceStyle,
                            width,
                            height,
                            transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
                        }}
                    >
                        {faces.back}
                    </div>

                    {/* Right */}
                    <div
                        style={{
                            ...faceStyle,
                            width: depth,
                            height,
                            left: width / 2 - depth / 2,
                            transform: `rotateY(90deg) translateZ(${halfWidth}px)`,
                        }}
                    >
                        {faces.right}
                    </div>

                    {/* Left */}
                    <div
                        style={{
                            ...faceStyle,
                            width: depth,
                            height,
                            left: width / 2 - depth / 2,
                            transform: `rotateY(-90deg) translateZ(${halfWidth}px)`,
                        }}
                    >
                        {faces.left}
                    </div>

                    {/* Top */}
                    <div
                        style={{
                            ...faceStyle,
                            width,
                            height: depth,
                            top: height / 2 - depth / 2,
                            transform: `rotateX(90deg) translateZ(${halfHeight}px)`,
                        }}
                    >
                        {faces.top}
                    </div>

                    {/* Bottom */}
                    <div
                        style={{
                            ...faceStyle,
                            width,
                            height: depth,
                            top: height / 2 - depth / 2,
                            transform: `rotateX(-90deg) translateZ(${halfHeight}px)`,
                        }}
                    >
                        {faces.bottom}
                    </div>
                </motion.div>
            </div>
        );
    }
);

CSSBox.displayName = "CSSBox";

export default CSSBox;
