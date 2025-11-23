"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface OrbitingItemsProps {
  items: Array<{
    icon: React.ReactNode;
    name: string;
    level: number;
    years: number;
  }>;
  outerItems?: Array<{
    icon: React.ReactNode;
    name: string;
    level: number;
    years: number;
  }>;
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
  const [hoveredRing, setHoveredRing] = useState<'inner' | 'outer' | null>(null);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px]">
      <div className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px]">
        {/* Inner circle border */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full border-2 border-border/60" />
        </div>

        {/* Outer circle border */}
        {outerItems && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full border-2 border-border/60" />
          </div>
        )}

        {/* Inner circle container - rotates */}
        <div
          className={cn(
            "absolute inset-0 animate-[spin_40s_linear_infinite]",
            {
              "[animation-play-state:paused]": hoveredRing === 'inner',
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
                    "flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer transition-all hover:scale-110 hover:border-white/30 hover:bg-black/60",
                    isHovered && "scale-125 border-white/40 bg-black/70"
                  )}
                  // Counter-rotate the icon so it stays upright
                  style={{
                    animation: `spin 40s linear infinite reverse`,
                    animationPlayState: hoveredRing === 'inner' ? 'paused' : 'running'
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex({ circle: 'inner', index });
                    setHoveredRing('inner');
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setHoveredRing(null);
                  }}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer circle container - rotates reverse */}
        {outerItems && (
          <div
            className={cn(
              "absolute inset-0 animate-[spin_50s_linear_infinite_reverse]",
              {
                "[animation-play-state:paused]": hoveredRing === 'outer',
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
                      "flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer transition-all hover:scale-110 hover:border-white/30 hover:bg-black/60",
                      isHovered && "scale-125 border-white/40 bg-black/70"
                    )}
                    // Counter-rotate (which means rotating forward since container is reverse)
                    style={{
                      animation: `spin 50s linear infinite`,
                      animationPlayState: hoveredRing === 'outer' ? 'paused' : 'running'
                    }}
                    onMouseEnter={() => {
                      setHoveredIndex({ circle: 'outer', index });
                      setHoveredRing('outer');
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setHoveredRing(null);
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

        {/* Center element - Empty as requested */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
