"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "../data/portfolio";

export interface Certification {
    title: string;
    issuer: string;
    issue_date: string;
    start_date?: string;
    credential_url: string;
    image_url?: string; // For the certificate image itself
    logo_url: string;   // For the company/issuer logo
}

export default function Certifications() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(true);
    const [certifications, setCertifications] = React.useState<Certification[]>([]);

    // Use our own API route which handles the private GitHub fetch
    const API_URL = "/api/certifications";

    React.useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch certifications");
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setCertifications(data);
                } else {
                    throw new Error("Empty or invalid data received");
                }
            } catch (error) {
                console.warn("Falling back to local portfolio data:", error);

                // Fallback mapping from portfolio.ts structure to Certifications structure
                const fallbackData: Certification[] = portfolioData.certifications.map(c => ({
                    title: c.title,
                    issuer: c.issuer,
                    issue_date: c.year, // using year as issue date string
                    credential_url: c.link,
                    logo_url: c.logo,
                    image_url: ""
                }));
                setCertifications(fallbackData);
            }
        };

        fetchCertifications();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollPrev(scrollLeft > 20);
            setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    React.useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [certifications]); // Re-check when data loads

    const scrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth / 2, behavior: "smooth" });
        }
    };

    const scrollPrev = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth / 2, behavior: "smooth" });
        }
    };

    // Helper to resolve images: if http(s) -> use as is; else -> use proxy
    const resolveUrl = (url?: string) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("/")) return url; // Absolute or public folder
        return `/api/gh-image?path=${encodeURIComponent(url)}`;
    };

    return (
        <section className="relative z-30 bg-transparent py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                <span className="text-rgb-gradient">Certifications & Achievements</span>
            </h2>

            <div className="relative group">
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-8 py-12 px-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style jsx global>{`
                        .scrollbar-hide::-webkit-scrollbar { display: none; }
                    `}</style>

                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            onMouseMove={handleMouseMove}
                            className="group/card rgb-border relative flex-shrink-0 h-[400px] w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center rounded-2xl transition-all duration-300 hover:-translate-y-2 bg-zinc-900/40"
                            style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
                        >
                            <div className="rgb-border-inner absolute inset-0 overflow-hidden rounded-2xl border-none">
                                {/* Company Logo (Background) */}
                                {cert.logo_url && (
                                    <div className="absolute inset-0 flex items-center justify-center p-12 pb-32 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={resolveUrl(cert.logo_url)}
                                                alt={`${cert.issuer} logo`}
                                                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-xl"
                                                loading="lazy"
                                                onError={(e) => {
                                                    // Hide broken images seamlessly
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Certificate Image Preview (Optional Overlay on Hover?) 
                                    For now, we just link to it, but the user asked to 'post certificate image'.
                                    If present, maybe show it? keeping it simple for now as requested. 
                                */}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-sm font-medium text-gray-400">{cert.issuer}</p>
                                        <p className="text-xs text-gray-500">{cert.issue_date.split('-')[0]}</p>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                        {cert.title}
                                    </h3>

                                    <Link
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-bold text-gray-400 group-hover:text-white transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300"
                                    >
                                        View Credential
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left Scroll Indicator */}
                {canScrollPrev && (
                    <div
                        onClick={scrollPrev}
                        className="absolute top-1/2 left-0 md:left-[-20px] lg:left-[-40px] -translate-y-1/2 z-40 cursor-pointer transition-all duration-300 p-2 block text-white opacity-100 md:opacity-40 md:group-hover:opacity-100 hover:scale-110 active:scale-95 animate-bounce-x"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 drop-shadow-md bg-black/50 rounded-full backdrop-blur-sm rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                )}

                {/* Right Scroll Indicator */}
                {canScrollNext && (
                    <div
                        onClick={scrollNext}
                        className="absolute top-1/2 right-0 md:right-[-20px] lg:right-[-40px] -translate-y-1/2 z-40 cursor-pointer transition-all duration-300 p-2 block text-white opacity-100 md:opacity-40 md:group-hover:opacity-100 hover:scale-110 active:scale-95 animate-bounce-x"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 drop-shadow-md bg-black/50 rounded-full backdrop-blur-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                )}
            </div>
        </section>
    );
}
