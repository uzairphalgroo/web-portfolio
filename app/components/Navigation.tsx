"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter(); // Import this from next/navigation!

    const handleNavigation = (item: { label: string, id: string, path?: string }) => {
        setIsOpen(false);
        if (item.path) {
            router.push(item.path);
        } else {
            // Check if we are on the home page first (optional, but good practice). 
            // For now, assuming single page scroll sections are only on home.
            // If on /about, need to go home first then scroll? 
            // Simpler: Just allow simple routing. If on /about, clicking "Projects" might fail if it relies on current page elements.
            // Better fix: if on another page, go to /#id.

            if (window.location.pathname !== "/") {
                router.push(`/#${item.id}`);
            } else {
                const element = document.getElementById(item.id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const menuItems = [
        { label: "Home", id: "home", path: "/" }, // Explicit path for Home
        { label: "About Me", id: "about", path: "/about" }, // New page
        { label: "Projects", id: "projects" },
        { label: "Certifications", id: "certifications" },
        { label: "Contact", id: "contact" }, // Usually footer or overlay
    ];

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 flex items-center justify-center bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </motion.button>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 md:right-8 z-50 flex flex-col gap-2 min-w-[200px]"
                    >
                        {menuItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleNavigation(item)}
                                className="bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white px-6 py-3 rounded-xl text-right transition-colors shadow-lg hover:bg-white/5"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
