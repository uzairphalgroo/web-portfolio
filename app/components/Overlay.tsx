"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export default function Overlay({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Section 1
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

    // Section 2
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.45], [0, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.15, 0.45], [-50, 0]);

    // Section 3 (Let's Connect) - Restored and timed to finish before scroll ends
    const opacity3 = useTransform(scrollYProgress, [0.50, 0.60, 0.85], [0, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.50, 0.85], [50, 0]);

    // Moving spotlight effect for text
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-20 flex flex-col justify-center">

            <motion.div style={{ opacity: opacity1, scale: scale1 }} className="absolute inset-0 flex items-center justify-center">
                <div className="text-center w-full px-4">
                    <h1
                        onMouseMove={handleMouseMove}
                        data-text={portfolioData.personal.name}
                        className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 pb-2 hover-stroke-gradient cursor-default pointer-events-auto transition-transform duration-300 hover:scale-105"
                    >
                        {portfolioData.personal.name}
                    </h1>
                    <p
                        onMouseMove={handleMouseMove}
                        data-text={portfolioData.personal.role}
                        className="text-xs sm:text-sm md:text-xl uppercase tracking-normal md:tracking-widest font-semibold hover-stroke-gradient cursor-default pointer-events-auto transition-transform duration-300 hover:scale-105 hover-text-gray md:whitespace-nowrap"
                    >
                        {portfolioData.personal.role}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: opacity1 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 pointer-events-none flex flex-col items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <p className="text-xs uppercase tracking-widest mt-2 text-center">Scroll</p>
                </motion.div>
            </motion.div>

            <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute inset-0 flex items-center justify-start px-8 md:px-32">
                <div className="max-w-xl text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-rgb-gradient mb-6 pb-1">About Me</h2>
                    <p className="text-base md:text-xl text-gray-300">
                        {portfolioData.personal.about}
                    </p>
                </div>
            </motion.div>

            <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute inset-0 flex items-center justify-end px-8 md:px-32">
                <div className="max-w-xl text-right">
                    <h2 className="text-3xl md:text-5xl font-bold text-rgb-gradient mb-6 pb-1">Let's Connect</h2>
                    <p className="text-base md:text-xl text-gray-300 mb-8">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-end">
                        <a
                            href={`https://www.linkedin.com/in/${portfolioData.githubUsername}`} // Assuming same handle or using manual link if stored
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rgb-border always-active pointer-events-auto inline-block bg-[#121212] text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors text-center"
                        >
                            Connect on LinkedIn
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="rgb-border pointer-events-auto inline-block bg-transparent text-white px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-colors text-center"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </motion.div>
        </div >
    );
}

