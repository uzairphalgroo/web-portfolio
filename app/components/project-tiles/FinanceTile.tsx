import React from "react";
import { motion } from "framer-motion";

export function FinanceTile() {
    return (
        <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596691a_1px,transparent_1px),linear-gradient(to_bottom,#0596691a_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-sm max-h-60">

                    {/* Live Chart Lines */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gradientChart" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <motion.path
                            d="M0,150 C50,140 100,160 150,100 S250,50 300,80 S350,20 400,40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M0,150 C50,140 100,160 150,100 S250,50 300,80 S350,20 400,40 L400,200 L0,200 Z"
                            fill="url(#gradientChart)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                    </svg>

                    {/* Floating Currency Symbols */}
                    <motion.div
                        className="absolute top-10 right-10 text-emerald-400 font-bold text-2xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        $
                    </motion.div>
                    <motion.div
                        className="absolute bottom-20 left-10 text-emerald-600 font-bold text-xl opacity-50"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        €
                    </motion.div>

                    {/* Candlesticks (Simulated) */}
                    <div className="absolute inset-0 flex items-end justify-around pb-12 px-12 opacity-80">
                        {[60, 80, 40, 90, 120, 70, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-4 bg-emerald-500/20 border border-emerald-500 rounded-sm relative"
                                style={{ height: `${h}px` }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                {/* Wick */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0.5 h-full bg-emerald-500/50 -z-10" style={{ height: `${h + 20}px` }} />

                                {/* Pulse Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-emerald-400/30"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Ticker Tape simulation */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-emerald-950/50 backdrop-blur border-t border-emerald-900 overflow-hidden flex items-center">
                        <motion.div
                            className="whitespace-nowrap flex gap-4 text-xs font-mono text-emerald-400"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <span>BTC +2.4%</span>
                            <span>ETH +1.2%</span>
                            <span>SPX +0.5%</span>
                            <span>NDX +0.8%</span>
                            <span>BTC +2.4%</span>
                            <span>ETH +1.2%</span>
                            <span>SPX +0.5%</span>
                            <span>NDX +0.8%</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
