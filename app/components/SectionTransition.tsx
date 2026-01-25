"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
    children: React.ReactNode;
    className?: string; // Allow passing extra classes if needed
    id?: string;
}

export default function SectionTransition({ children, className = "", id }: SectionTransitionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.2 1"] // Trigger when top of element hits bottom of viewport -> 20% up
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

    return (
        <motion.div
            ref={ref}
            id={id}
            style={{ opacity, scale, y }}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
