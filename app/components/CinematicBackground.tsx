
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Deep Dynamic Gradient Base */}
            <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, #0f0c29 0%, #000000 60%)",
                        "radial-gradient(circle at 100% 0%, #16213e 0%, #000000 60%)",
                        "radial-gradient(circle at 100% 100%, #1a1a2e 0%, #000000 60%)",
                        "radial-gradient(circle at 0% 100%, #0f3460 0%, #000000 60%)",
                        "radial-gradient(circle at 0% 0%, #0f0c29 0%, #000000 60%)"
                    ]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* THE GALAXY: Milky Way Representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none overflow-hidden">
                <motion.div
                    className="relative w-[120vmax] h-[120vmax] flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                >
                    {/* Spiral Arms - Conic Gradient (Brighter) */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(124, 58, 237, 0.6) 60deg, transparent 100deg, rgba(236, 72, 153, 0.5) 180deg, transparent 240deg, rgba(99, 102, 241, 0.6) 300deg, transparent 360deg)",
                            filter: "blur(40px)",
                            transform: "rotateX(60deg) scale(1.5)" // Tilted perspective
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Secondary Dust Lane (Brighter) */}
                    <motion.div
                        className="absolute inset-0 rounded-full scale-75"
                        style={{
                            background: "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(168, 85, 247, 0.4) 60deg, transparent 120deg, rgba(244, 114, 182, 0.3) 180deg, transparent 240deg, transparent 360deg)",
                            filter: "blur(60px)",
                            transform: "rotateX(60deg) scale(1.5)"
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Galactic Core (Brighter) */}
                    <motion.div
                        className="absolute w-[25vmax] h-[25vmax] bg-indigo-500/20 rounded-full blur-[60px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>

            {/* Digital Grid Horizon */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Floating Particles (Data/Stars) */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        boxShadow: "0 0 4px rgba(255,255,255,0.5)"
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}

            {/* Matrix-like Data Streams (Subtle) */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`stream-${i}`}
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
                    style={{
                        height: Math.random() * 300 + 200,
                        left: `${Math.random() * 100}%`,
                        top: -500
                    }}
                    animate={{
                        top: ["0%", "100%"]
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
}
