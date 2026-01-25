"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchGitHubProjects, GitHubRepo } from "../lib/github";
import { portfolioData } from "../data/portfolio";

interface ProjectsProps {
    initialProjects?: any[]; // Optional for future SSG usage
}

export default function Projects({ initialProjects = [] }: ProjectsProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(true);
    const [projects, setProjects] = useState<any[]>(initialProjects); // Using any to mix GitHubRepo + config
    const [loading, setLoading] = useState(true);

    // Fetch from GitHub on client side for "sync on push" feeling
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const repos = await fetchGitHubProjects();

                // Merge with local config
                const mergedProjects = repos.map(repo => {
                    const config = portfolioData.projectConfig[repo.name as keyof typeof portfolioData.projectConfig];

                    // If no config found, skip or provide defaults? 
                    // Let's only show projects that have a config entry OR are significant.
                    // For a polished portfolio, usually you only want curated projects.
                    // BUT user asked to "sync all". Let's default to a generic look if no config.

                    // Determine Category from Topics
                    let category = "Open Source";
                    const topics = repo.topics || [];

                    if (topics.some(t => ['ai', 'artificial-intelligence', 'machine-learning', 'rag', 'llm'].includes(t))) {
                        category = "Artificial Intelligence";
                    } else if (topics.some(t => ['security', 'cybersecurity', 'hacking', 'network'].includes(t))) {
                        category = "Cybersecurity";
                    } else if (topics.some(t => ['web', 'react', 'nextjs', 'typescript', 'frontend'].includes(t))) {
                        category = "Web Development";
                    }

                    const defaultConfig = {
                        image: `/projects/${repo.name}.png`,
                        color: "from-gray-700 to-black",
                        category: category
                    };

                    const finalConfig = config || defaultConfig;

                    return {
                        ...repo,
                        title: repo.name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                        category: finalConfig.category,
                        color: finalConfig.color,
                        image: finalConfig.image,
                        description: repo.description || "No description provided.",
                        link: repo.html_url
                    };
                });

                // Sort: Prioritize configured projects, then by updated date (already sorted by fetch)
                // Actually, let's filter to only show ones that HAVE a config first, then others?
                // Text request: "syncs with the projects" -> likely wants ALL public ones or the ones they care about.
                // Let's show all but sort configured ones first.

                // For now, let's stick to the ones in config to match the high-quality look, 
                // OR just use the config keys to filter the repos?
                // "syncs with the projects" implies if they add a new repo, it should show up.
                // So we show ALL.

                setProjects(mergedProjects);
            } catch (error) {
                console.error("Failed to load projects", error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

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

    React.useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [projects]); // Re-check when projects load

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

    return (
        <section className="relative z-30 bg-transparent min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-16 border-b border-gray-800 pb-8">
                    Selected Work
                    {loading && <span className="text-sm font-normal text-gray-500 ml-4 animate-pulse">Syncing with GitHub...</span>}
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

                        {!loading && projects.length === 0 && (
                            <div className="text-center text-gray-500 py-20">Unable to load projects from GitHub.</div>
                        )}

                        {projects.map((p, i) => (
                            <a
                                key={p.id || i}
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full w-full snap-center"
                            >
                                <div
                                    onMouseMove={handleMouseMove}
                                    className="group/card rgb-border relative h-full w-full bg-black/40 transition-all duration-500 rounded-[2rem] cursor-pointer"
                                >
                                    <div className="rgb-border-inner absolute inset-0 overflow-hidden border-none backdrop-blur-md rounded-[2rem]">
                                        {/* Project Image Background */}
                                        <div className="absolute inset-0 h-full w-full">
                                            <Image
                                                src={p.image || "/projects/network-security.png"}
                                                alt={p.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/card:scale-105 opacity-60 md:opacity-50 md:group-hover/card:opacity-60 md:group-hover/card:grayscale-0 md:grayscale grayscale-0 transition-all"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    // Prevent infinite loop if fallback also fails
                                                    if (target.src.indexOf("default-code.png") === -1) {
                                                        target.srcset = "";
                                                        target.src = "/projects/default-code.png";
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Gradient Overlays */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-20 group-hover/card:opacity-80 transition-opacity duration-500 mix-blend-overlay`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-gray-400 mb-3 tracking-wider uppercase">{p.category}</p>
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
