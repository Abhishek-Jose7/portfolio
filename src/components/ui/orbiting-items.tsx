"use client"

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OrbitingItemsProps {
  /**
   * The items to orbit around the center of the parent element.
   */
  items: Array<{
    icon: React.ReactNode;
    name: string;
    level: number;
    years: number;
  }>;

  /**
   * Additional items for the outer circle.
   */
  outerItems?: Array<{
    icon: React.ReactNode;
    name: string;
    level: number;
    years: number;
  }>;

  /**
   * Callback when an item is clicked.
   */
  onItemClick?: (item: { name: string; level: number; years: number }) => void;
}

const calculateItemStyle = ({
  index,
  radius,
  totalItems,
}: {
  radius: number;
  index: number;
  totalItems: number;
}) => {
  const angle = (index / totalItems) * 360;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);
  return {
    left: `${50 + x}%`,
    top: `${50 + y}%`,
  };
};

export default function OrbitingItems({
  items,
  outerItems,
  onItemClick,
}: OrbitingItemsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<{ circle: 'inner' | 'outer', index: number } | null>(null);
  const [innerPaused, setInnerPaused] = useState(false);
  const [outerPaused, setOuterPaused] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [innerRotation, setInnerRotation] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);

  // Track rotation angles for keeping icons upright
  useEffect(() => {
    const interval = setInterval(() => {
      if (innerRef.current) {
        const computedStyle = window.getComputedStyle(innerRef.current);
        const matrix = computedStyle.transform;
        if (matrix !== 'none') {
          const values = matrix.split('(')[1].split(')')[0].split(',');
          const angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
          setInnerRotation(angle);
        }
      }
      if (outerRef.current) {
        const computedStyle = window.getComputedStyle(outerRef.current);
        const matrix = computedStyle.transform;
        if (matrix !== 'none') {
          const values = matrix.split('(')[1].split(')')[0].split(',');
          const angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
          setOuterRotation(angle);
        }
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px]">
      <div className="relative w-[500px] h-[500px]">
        {/* Inner circle border */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border-2 border-border/60" />
        </div>

        {/* Outer circle border */}
        {outerItems && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[450px] h-[450px] rounded-full border-2 border-border/60" />
          </div>
        )}

        {/* Inner circle - clockwise */}
        <div
          ref={innerRef}
          className={cn(
            "absolute inset-0 animate-[rotate-full_45s] ease-linear repeat-infinite",
            {
              "[animation-play-state:paused]": innerPaused,
            }
          )}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex?.circle === 'inner' && hoveredIndex?.index === index;
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  ...calculateItemStyle({
                    index,
                    radius: 30,
                    totalItems: items.length,
                  }),
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 cursor-pointer transition-all",
                    isHovered && "bg-primary/30 scale-110 border-primary/40"
                  )}
                  style={{
                    transform: `rotate(${-innerRotation}deg)`,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex({ circle: 'inner', index });
                    setInnerPaused(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setInnerPaused(false);
                  }}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer circle - counter-clockwise */}
        {outerItems && (
          <div
            ref={outerRef}
            className={cn(
              "absolute inset-0 animate-[rotate-full_25s] ease-linear direction-reverse repeat-infinite",
              {
                "[animation-play-state:paused]": outerPaused,
              }
            )}
          >
            {outerItems.map((item, index) => {
              const isHovered = hoveredIndex?.circle === 'outer' && hoveredIndex?.index === index;
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    ...calculateItemStyle({
                      index,
                      radius: 45,
                      totalItems: outerItems.length,
                    }),
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 cursor-pointer transition-all",
                      isHovered && "bg-primary/30 scale-110 border-primary/40"
                    )}
                    style={{
                      transform: `rotate(${-outerRotation}deg)`,
                    }}
                    onMouseEnter={() => {
                      setHoveredIndex({ circle: 'outer', index });
                      setOuterPaused(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setOuterPaused(false);
                    }}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Center element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl">
            ⚡
          </div>
        </div>
      </div>
    </div>
  );
}
