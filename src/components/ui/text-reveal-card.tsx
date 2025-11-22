"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
    text,
    revealText,
    children,
    className,
}: {
    text: string;
    revealText: string;
    children?: React.ReactNode;
    className?: string;
}) => {
    const [widthPercentage, setWidthPercentage] = React.useState(0);
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const [left, setLeft] = React.useState(0);
    const [localWidth, setLocalWidth] = React.useState(0);
    const [isMouseOver, setIsMouseOver] = React.useState(false);

    React.useEffect(() => {
        if (cardRef.current) {
            const { left, width: localWidth } =
                cardRef.current.getBoundingClientRect();
            setLeft(left);
            setLocalWidth(localWidth);
        }
    }, []);

    function mouseMoveHandler(event: any) {
        event.preventDefault();

        const { clientX } = event;
        if (cardRef.current) {
            const relativeX = clientX - left;
            setWidthPercentage((relativeX / localWidth) * 100);
        }
    }

    function mouseLeaveHandler() {
        setIsMouseOver(false);
        setWidthPercentage(0);
    }
    function mouseEnterHandler() {
        setIsMouseOver(true);
    }
    const rotateDeg = (widthPercentage - 50) * 0.1;
    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            onMouseMove={mouseMoveHandler}
            ref={cardRef}
            className={cn(
                "bg-[#1d1c20] border border-white/[0.08] w-[40rem] rounded-lg p-8 relative overflow-hidden",
                className
            )}
        >
            {children}

            <div className="h-40  relative flex items-center overflow-hidden">
                <div
                    style={{
                        width: "100%",
                    }}
                    className="absolute bg-[#1d1c20] z-20  will-change-transform"
                >
                    <p
                        style={{
                            textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
                        }}
                        className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
                    >
                        {text}
                    </p>
                </div>
                <div
                    style={{
                        width: `${widthPercentage}%`,
                        transform: `rotate(${rotateDeg}deg)`,
                        opacity: widthPercentage > 0 ? 1 : 0,
                    }}
                    className="absolute bg-[#1d1c20] z-50  will-change-transform transition-transform duration-200"
                >
                    <p
                        style={{
                            textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
                        }}
                        className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
                    >
                        {revealText}
                    </p>
                </div>
                <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
                    <p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
                        {text}
                    </p>
                    <MemoizedStars />
                </div>
            </div>
        </div>
    );
};

export const TextRevealCardTitle = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <h2 className={cn("text-white text-lg mb-2", className)}>{children}</h2>
    );
};

export const TextRevealCardDescription = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <p className={cn("text-[#a9a9a9] text-sm", className)}>{children}</p>
    );
};

const Stars = () => {
    const randomMove = () => Math.random() * 4 - 2;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();
    return (
        <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
                <span
                    key={`star-${i}`}
                    style={{
                        top: `${random() * 100}%`,
                        left: `${random() * 100}%`,
                        animationDelay: `${random() * 5}s`,
                        animationDuration: `${random() * 10 + 10}s`,
                    }}
                    className="animate-twinkle absolute h-0.5 w-0.5 rounded-full bg-white"
                ></span>
            ))}
        </div>
    );
};

export const MemoizedStars = React.memo(Stars);
