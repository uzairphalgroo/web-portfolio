"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-24 md:py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center md:text-left"
                >
                    <Link href="/" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-rgb-gradient">About Me</h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        A dedicated Engineer and Cybersecurity Analyst passionate about building secure, intelligent, and scalable digital solutions.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Bio Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-indigo-500 pl-4">Who I Am</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                I am Shah Uzair Phalgroo, an engineering student with a robust background in Network Engineering, Network Administration, Cybersecurity, and Web Development. My journey involves a constant pursuit of knowledge in protecting digital infrastructures while creating engaging web experiences.
                            </p>
                            <p>
                                I specialize in securing networks, identifying vulnerabilities, and developing full-stack web applications. My work bridges the gap between functional design and rigorous security protocols.
                            </p>
                        </div>
                    </motion.section>

                    {/* Skills/Focus Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-emerald-500 pl-4">What I Do</h2>
                        <ul className="space-y-4">
                            <li className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                <h3 className="font-bold text-white text-lg mb-1">Cybersecurity Analysis</h3>
                                <p className="text-sm text-gray-400">Vulnerability assessment, network scanning, and secure systems architecture.</p>
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                <h3 className="font-bold text-white text-lg mb-1">Network Engineering</h3>
                                <p className="text-sm text-gray-400">Router configuration (Cisco), protocol management, and infrastructure optimization.</p>
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                <h3 className="font-bold text-white text-lg mb-1">Web Development</h3>
                                <p className="text-sm text-gray-400">Building modern, responsive web applications with Next.js, React, and Tailwind CSS.</p>
                            </li>
                        </ul>
                    </motion.section>
                </div>

                {/* Connect Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-white/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Let's Work Together</h2>
                        <p className="text-gray-400">Interested in collaboration or have a project in mind?</p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="https://www.linkedin.com/in/shahuzairphalgroo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            Connect on LinkedIn
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
                        >
                            Download CV
                        </a>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
