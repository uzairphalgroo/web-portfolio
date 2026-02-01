import React, { useMemo } from "react";
import { motion } from "framer-motion";

export function AITile() {
    // Generate static nodes coordinates
    const nodes = useMemo(() => {
        return [...Array(12)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 3,
            delay: Math.random() * 2
        }));
    }, []);

    // Generate connections
    const connections = useMemo(() => {
        const lines: { start: number, end: number }[] = [];
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach((otherNode, j) => {
                const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                if (distance < 40) { // Connect nearby nodes
                    lines.push({ start: i, end: i + 1 + j });
                }
            });
        });
        return lines.slice(0, 15); // Limit connections for performance
    }, [nodes]);

    return (
        <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />

            <div className="absolute inset-0">
                <svg className="w-full h-full">
                    {/* Connections */}
                    {connections.map((line, i) => {
                        const start = nodes[line.start];
                        const end = nodes[line.end];
                        return (
                            <React.Fragment key={`line-${i}`}>
                                <motion.line
                                    x1={`${start.x}%`}
                                    y1={`${start.y}%`}
                                    x2={`${end.x}%`}
                                    y2={`${end.y}%`}
                                    stroke="rgba(165, 180, 252, 0.2)"
                                    strokeWidth="1"
                                />
                                {/* Traveling Pulse */}
                                <circle r="1.5" fill="#a5b4fc">
                                    <animate
                                        attributeName="cx"
                                        from={`${start.x}%`}
                                        to={`${end.x}%`}
                                        dur={`${2 + Math.random()}s`}
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="cy"
                                        from={`${start.y}%`}
                                        to={`${end.y}%`}
                                        dur={`${2 + Math.random()}s`}
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="opacity"
                                        values="0;1;0"
                                        dur={`${2 + Math.random()}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </React.Fragment>
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node, i) => (
                        <motion.circle
                            key={`node-${i}`}
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={node.size}
                            fill="#6366f1"
                            initial={{ opacity: 0.3, scale: 0.8 }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: node.delay,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* Central Brain/Chip Metaphor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-32 h-32 backdrop-blur-sm bg-indigo-500/10 rounded-2xl border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                >
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-indigo-400 rounded-full animate-pulse" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-75" />

                    <svg className="w-16 h-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>

                    {/* Scanning Effect inside container */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent h-[30%]"
                        animate={{ top: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
