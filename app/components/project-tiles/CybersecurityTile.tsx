import React from "react";
import { motion } from "framer-motion";

export function CybersecurityTile() {
    return (
        <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

            {/* Falling Matrix Rain Effect (Simplified for performance) */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-red-500 to-transparent"
                        style={{
                            left: `${i * 10}%`,
                            height: "100%",
                        }}
                        animate={{
                            translateY: ["-100%", "200%"],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Central Glowing Lock */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    {/* Outer Shield/Ring */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 border-4 border-red-500/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                        <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-20" />

                        {/* Lock Icon */}
                        <svg
                            className="w-24 h-24 md:w-32 md:h-32 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    {/* Data Streams entering the lock */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`stream-${i}`}
                            className="absolute bg-red-400/60 h-0.5 w-24"
                            style={{
                                top: "50%",
                                left: "50%",
                                transformOrigin: "0 0",
                                rotate: `${i * 60}deg`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                translateX: ["50px", "0px"],
                                width: ["10px", "100px"],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "circIn",
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Security Scan Line */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-[20%]"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
