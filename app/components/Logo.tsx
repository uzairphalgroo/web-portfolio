
"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            whileHover={{ scale: 1.05 }}
        >
            <defs>
                <linearGradient id="luxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="10%" stopColor="#FBAB7E" /> {/* Gold/Rose */}
                    <stop offset="50%" stopColor="#F7CE68" /> {/* Gold */}
                    <stop offset="90%" stopColor="#C850C0" /> {/* Deep luxurious purple/pink */}
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Central Core (AI/Intelligence) - Diamond Shape */}
            <motion.path
                d="M50 20 L80 50 L50 80 L20 50 Z"
                stroke="url(#luxGradient)"
                strokeWidth="1.5"
                fill="url(#luxGradient)"
                fillOpacity="0.1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Orbiting Ring 1 (Cybersecurity/Shield) */}
            <motion.ellipse
                cx="50"
                cy="50"
                rx="35"
                ry="15"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.8"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{
                    pathLength: { duration: 2, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
            />

            {/* Orbiting Ring 2 (Web/Global) */}
            <motion.ellipse
                cx="50"
                cy="50"
                rx="35"
                ry="15"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.6"
                initial={{ pathLength: 0, rotate: 60 }}
                animate={{ pathLength: 1, rotate: 420 }} // 60 + 360
                transition={{
                    pathLength: { duration: 2, delay: 0.3, ease: "easeInOut" },
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
            />

            {/* Orbiting Ring 3 (Finance/Flow) */}
            <motion.ellipse
                cx="50"
                cy="50"
                rx="35"
                ry="15"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.4"
                initial={{ pathLength: 0, rotate: 120 }}
                animate={{ pathLength: 1, rotate: 480 }} // 120 + 360
                transition={{
                    pathLength: { duration: 2, delay: 0.6, ease: "easeInOut" },
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
            />

            {/* Center Sparkle */}
            <motion.circle
                cx="50"
                cy="50"
                r="2"
                fill="white"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

        </motion.svg>
    );
}
