"use client";

import { motion } from "framer-motion";

export default function SmokeBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Smoke Layer 1 - Large drifting cloud */}
            <motion.div
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["0%", "10%", "0%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-gray-500 rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] will-change-transform"
            />

            {/* Smoke Layer 2 - Center breathing cloud (Hidden on mobile) */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.03, 0.08, 0.03],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="hidden md:block absolute top-[20%] left-[20%] w-[60vw] h-[60vw] bg-slate-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] will-change-transform"
            />

            {/* Smoke Layer 3 - Bottom drifter */}
            <motion.div
                animate={{
                    x: ["20%", "-20%", "20%"],
                    y: ["0%", "-15%", "0%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gray-400 rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] will-change-transform"
            />

            {/* Smoke Layer 4 - Subtle color tint (Hidden on mobile) */}
            <motion.div
                animate={{
                    opacity: [0.02, 0.05, 0.02],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="hidden md:block absolute top-[40%] right-[30%] w-[50vw] h-[50vw] bg-blue-900 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.02] will-change-transform"
            />
        </div>
    );
}
