"use client";

import { motion } from "framer-motion";

export function KineticPhilosophy() {
    const text = "Simplicity is the ultimate sophistication";
    const words = text.split(" ");

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="flex flex-wrap justify-center gap-2">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: [0.2, 0.65, 0.3, 0.9]
                        }}
                        viewport={{ once: true }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-4 text-sm text-muted-foreground font-mono"
            >
        // Code is Poetry
            </motion.p>
        </div>
    );
}
