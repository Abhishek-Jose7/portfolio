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
        // Hover state removed for continuous spin preference
        const [isDragging, setIsDragging] = useState(false);

        // Continuous rotation values
        const rotateX = useMotionValue(-15);
        const rotateY = useMotionValue(15);

        // Refs for drag and interaction timing
        const prevPointer = useRef({ x: 0, y: 0 });
        const lastInteractionTime = useRef(0);

        // Interaction handling
        const handleMouseMove = (e: React.MouseEvent) => {
            // Hover effect removed as per "interactive all the time" + "slant spin" preference
            // which usually implies constant animation unless managed manually.
            if (!draggable) {
                // Simple interactive rotation on hover (tilt) if not draggable
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const rotateXValue = ((mouseY - centerY) / centerY) * -30;
                const rotateYValue = ((mouseX - centerX) / centerX) * 30;
                rotateX.set(rotateXValue);
                rotateY.set(rotateYValue);
            }
        };

        const handlePointerDown = (e: React.PointerEvent) => {
            if (!draggable) return;
            setIsDragging(true);
            lastInteractionTime.current = Date.now();
            prevPointer.current = { x: e.clientX, y: e.clientY };
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            if (!draggable) return;

            if (isDragging) {
                lastInteractionTime.current = Date.now();
                const deltaX = e.clientX - prevPointer.current.x;
                const deltaY = e.clientY - prevPointer.current.y;

                prevPointer.current = { x: e.clientX, y: e.clientY };

                const sensitivity = 0.8;
                rotateY.set(rotateY.get() + deltaX * sensitivity);
                rotateX.set(rotateX.get() - deltaY * sensitivity);
            }
        };

        const handlePointerUp = (e: React.PointerEvent) => {
            if (!draggable) return;
            setIsDragging(false);
            lastInteractionTime.current = Date.now();
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        };

        const handleMouseLeave = () => {
            // No-op
        };

        // Auto spin logic
        useAnimationFrame((t) => {
            if (!draggable) return;

            const timeSinceInteraction = Date.now() - lastInteractionTime.current;
            const isIdle = !isDragging && timeSinceInteraction > 1500; // 1.5s timeout

            if (isIdle) {
                // Resume slant spin
                rotateY.set(rotateY.get() + 0.4);

                // Lerp rotateX to a sine wave for "slant"
                // target range: -25 to 25 degrees to show all sides
                const targetX = Math.sin(t / 2000) * 25;
                const currentX = rotateX.get();
                // Smoothly interpolate towards target (lerp factor 0.02)
                rotateX.set(currentX + (targetX - currentX) * 0.02);
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
            backfaceVisibility: "hidden" as const,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "1px solid rgba(255,255,255,0.2)",
            // backgroundColor: "rgba(255,255,255,0.05)",
        };

        return (
            <div
                style={{ perspective: `${perspective}px`, width, height, touchAction: draggable ? 'none' : 'auto' }}
                className={`relative ${className} ${draggable ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={...}
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
