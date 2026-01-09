"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="flex items-center justify-center w-full h-full min-h-[300px] md:min-h-[600px]">
      <div className="relative w-full max-w-[280px] aspect-square md:w-[500px] md:h-[500px] md:max-w-none">
        {/* Inner circle border */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] h-[60%] rounded-full border-2 border-border/60" />
        </div>

        {/* Outer circle border */}
        {outerItems && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[90%] h-[90%] rounded-full border-2 border-border/60" />
          </div>
        )}

        {/* Inner circle container - rotates */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            animationPlayState: hoveredRing === 'inner' ? 'paused' : 'running'
          }}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex?.circle === 'inner' && hoveredIndex?.index === index;
            return (
              <div
                key={index}
                className="absolute pointer-events-auto"
                style={{
                  ...calculateItemStyle({
                    index,
                    radius: 30,
                    totalItems: items.length,
                  }),
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  className={cn(
                    "flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer transition-all hover:scale-110 hover:border-white/30 hover:bg-black/60",
                    isHovered && "scale-125 border-white/40 bg-black/70"
                  )}
                  // Counter-rotate the icon so it stays upright
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{
                    animationPlayState: hoveredRing === 'inner' ? 'paused' : 'running'
                  }}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setHoveredIndex({ circle: 'inner', index });
                      setHoveredRing('inner');
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setHoveredRing(null);
                  }}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.icon}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Outer circle container - rotates reverse */}
        {outerItems && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{
              animationPlayState: hoveredRing === 'outer' ? 'paused' : 'running'
            }}
          >
            {outerItems.map((item, index) => {
              const isHovered = hoveredIndex?.circle === 'outer' && hoveredIndex?.index === index;
              return (
                <div
                  key={index}
                  className="absolute pointer-events-auto"
                  style={{
                    ...calculateItemStyle({
                      index,
                      radius: 45,
                      totalItems: outerItems.length,
                    }),
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className={cn(
                      "flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer transition-all hover:scale-110 hover:border-white/30 hover:bg-black/60",
                      isHovered && "scale-125 border-white/40 bg-black/70"
                    )}
                    // Counter-rotate (which means rotating forward since container is reverse)
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    style={{
                      animationPlayState: hoveredRing === 'outer' ? 'paused' : 'running'
                    }}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover)").matches) {
                        setHoveredIndex({ circle: 'outer', index });
                        setHoveredRing('outer');
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setHoveredRing(null);
                    }}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Center element - Empty as requested */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
