
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function WelcomeScreen({ onFinish }: { onFinish: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simple progress simulation or just timer
        const timer = setTimeout(() => {
            onFinish();
        }, 3500); // 3.5s total duration

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="relative">
                {/* Pulsing Glow Effect */}
                <motion.div
                    className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Main Logo - Reusing our complex component */}
                <Logo className="w-32 h-32 md:w-48 md:h-48 relative z-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
            >
                <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
                    Shah Uzair Phalgroo
                </h1>
                <p className="text-gray-400 text-sm mt-2 tracking-[0.2em] uppercase">
                    Portfolio Loading...
                </p>
            </motion.div>

            {/* Loading Bar */}
            <div className="absolute bottom-20 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
