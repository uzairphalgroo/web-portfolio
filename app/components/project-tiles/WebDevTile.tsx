import React from "react";
import { motion } from "framer-motion";

export function WebDevTile() {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Isometric abstract layout */}
            <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
                <div className="relative transform-style-3d rotate-x-6 rotate-y-6 rotate-z-2 w-full max-w-2xl h-full flex items-center justify-center scale-90 md:scale-100">

                    {/* Back Window - Code Editor */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -left-12 -top-12 w-64 h-48 bg-slate-900/90 border border-slate-700 rounded-lg p-3 shadow-2xl backdrop-blur-sm z-0"
                    >
                        <div className="flex gap-1.5 mb-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-1.5">
                            <motion.div
                                className="h-2 w-1/3 bg-blue-500/50 rounded"
                                animate={{ width: ["0%", "33%"] }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                            <motion.div
                                className="h-2 w-2/3 bg-slate-700 rounded"
                                animate={{ width: ["0%", "66%"] }}
                                transition={{ duration: 1, delay: 0.7 }}
                            />
                            <motion.div
                                className="h-2 w-1/2 bg-slate-700 rounded"
                                animate={{ width: ["0%", "50%"] }}
                                transition={{ duration: 1, delay: 0.9 }}
                            />
                            <motion.div
                                className="h-2 w-3/4 bg-purple-500/50 rounded"
                                animate={{ width: ["0%", "75%"] }}
                                transition={{ duration: 1, delay: 1.1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Front Window - UI Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute z-10 w-72 h-48 bg-gradient-to-br from-slate-800 to-black border border-cyan-500/30 rounded-lg shadow-[0_20px_50px_rgba(8,145,178,0.2)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4">
                            <div className="w-24 h-2 bg-slate-600 rounded-full" />
                        </div>
                        {/* Body */}
                        <div className="flex-1 p-4 grid grid-cols-2 gap-3">
                            <motion.div
                                className="col-span-2 h-16 bg-cyan-900/20 rounded border border-cyan-500/20"
                                animate={{ borderColor: ["rgba(6,182,212,0.2)", "rgba(6,182,212,0.6)", "rgba(6,182,212,0.2)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="h-12 bg-slate-800 rounded" />
                            <div className="h-12 bg-slate-800 rounded" />
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-600 rounded-full blur-xl opacity-40"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: [0, -10, 0], opacity: 1 }}
                        transition={{
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 0.5, delay: 1 }
                        }}
                        className="absolute -right-8 top-12 bg-black/60 backdrop-blur-md border border-green-500/50 px-3 py-1.5 rounded-full text-[10px] text-green-400 font-mono shadow-[0_0_15px_rgba(34,197,94,0.3)] z-20"
                    >
                        &lt;BuiltWithCode /&gt;
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
