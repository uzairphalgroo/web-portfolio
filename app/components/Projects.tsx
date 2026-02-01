"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { portfolioData } from "../data/portfolio";

import { CybersecurityTile } from "./project-tiles/CybersecurityTile";
import { WebDevTile } from "./project-tiles/WebDevTile";
import { AITile } from "./project-tiles/AITile";
import { FinanceTile } from "./project-tiles/FinanceTile";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const projects = portfolioData.projectCategories;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
    };

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setCanScrollPrev(scrollTop > 20);
            setCanScrollNext(scrollTop < scrollHeight - clientHeight - 20);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scrollToNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                top: containerRef.current.clientHeight,
                behavior: "smooth",
            });
        }
    };

    const scrollToPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                top: -containerRef.current.clientHeight,
                behavior: "smooth",
            });
        }
    };

    const renderTileContent = (title: string) => {
        if (title.includes("Cybersecurity")) return <CybersecurityTile />;
        if (title.includes("Web Development")) return <WebDevTile />;
        if (title.includes("Artificial Intelligence")) return <AITile />;
        if (title.includes("Finance")) return <FinanceTile />;
        return null;
    };

    return (
        <section className="relative z-30 bg-transparent min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-16 border-b border-gray-800 pb-8">
                    Selected Work
                </h2>

                {/* Vertical Scroll Container (Single Tile Carousel) */}
                <div className="relative group">
                    <div
                        ref={containerRef}
                        onScroll={checkScroll}
                        className="flex flex-col h-[65vh] min-h-[450px] overflow-y-auto snap-y snap-mandatory p-6 gap-6 scrollbar-hide rounded-[2rem]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <style jsx global>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {projects.map((p, i) => (
                            <a
                                key={i}
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full w-full snap-center shrink-0"
                            >
                                <div
                                    onMouseMove={handleMouseMove}
                                    className="group/card rgb-border relative h-full w-full bg-black/40 transition-all duration-500 rounded-[2rem] cursor-pointer overflow-hidden border border-white/10"
                                >
                                    <div className="rgb-border-inner absolute inset-0 overflow-hidden border-none backdrop-blur-md rounded-[2rem]">

                                        {/* Animated Background Content */}
                                        <div className="absolute inset-0 h-full w-full opacity-60 md:opacity-50 group-hover/card:opacity-80 transition-all duration-500">
                                            {renderTileContent(p.title)}
                                        </div>

                                        {/* Gradient Overlays */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-10 group-hover/card:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-gray-400 mb-3 tracking-wider uppercase">Highlight</p>
                                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover/card:translate-x-2 transition-transform duration-300 flex items-center gap-4">
                                                        {p.title}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-0 group-hover/card:opacity-100 transition-opacity -translate-x-4 group-hover/card:translate-x-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </h3>
                                                    <p className="text-gray-300 text-sm md:text-lg opacity-80 group-hover/card:opacity-100 transition-opacity duration-500 max-w-2xl">{p.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Top Scroll Indicator (Previous/Up) */}
                    {canScrollPrev && (
                        <div
                            onClick={(e) => { e.preventDefault(); scrollToPrev(); }}
                            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-bounce opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-300 p-2"
                            aria-label="Scroll to previous project"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white drop-shadow-md bg-black/50 rounded-full backdrop-blur-sm rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    )}

                    {/* Bottom Scroll Indicator (Next/Down) */}
                    {canScrollNext && (
                        <div
                            onClick={(e) => { e.preventDefault(); scrollToNext(); }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-bounce opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-300 p-2"
                            aria-label="Scroll to next project"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white drop-shadow-md bg-black/50 rounded-full backdrop-blur-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
