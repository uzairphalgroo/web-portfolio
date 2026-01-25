"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const loadImages = async () => {
            try {
                const response = await fetch("/sequence/manifest.json");
                const fileNames = await response.json();

                // Filter and sort if necessary (assuming manifest is sorted)
                const validNames = fileNames.filter((n: string) => n !== "manifest.json");

                if (validNames.length === 0) {
                    setIsLoaded(true);
                    return;
                }

                let loadedCount = 0;
                const updateProgress = () => {
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / validNames.length) * 100));
                };

                // Parallel loading
                const imagePromises = validNames.map((fileName: string) => {
                    return new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image();
                        img.src = `/sequence/${fileName}`;
                        img.onload = () => {
                            updateProgress();
                            resolve(img);
                        };
                        img.onerror = () => {
                            console.error(`Failed to load ${fileName}`);
                            updateProgress();
                            resolve(img); // Resolve anyway to avoid hanging
                        };
                    });
                });

                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);
                setIsLoaded(true);
            } catch (e) {
                console.error("Failed to load manifest", e);
                // Ensure we remove loading state even on failure
                setIsLoaded(true);
            }
        };
        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Prevent rendering if canvas has no size (common on initial load/resize)
        if (canvas.width === 0 || canvas.height === 0) return;

        const context = canvas.getContext("2d");
        const img = images[index];

        if (!context || !img) return;

        // object-fit: cover logic
        // Use default values if dimensions are missing to prevent division by zero (unlikely but safe)
        const cvsWidth = canvas.width || window.innerWidth;
        const cvsHeight = canvas.height || window.innerHeight;
        const imgWidth = img.width || 1;
        const imgHeight = img.height || 1;

        const bgRatio = cvsWidth / cvsHeight;
        const imgRatio = imgWidth / imgHeight;
        let drawWidth, drawHeight, startOp, startLeft;

        if (bgRatio > imgRatio) {
            drawWidth = cvsWidth;
            drawHeight = (cvsWidth / imgWidth) * imgHeight;
            startLeft = 0;
            startOp = (cvsHeight - drawHeight) / 2;
        } else {
            drawHeight = cvsHeight;
            drawWidth = (cvsHeight / imgHeight) * imgWidth;
            startOp = 0;
            startLeft = (cvsWidth - drawWidth) / 2;
        }

        try {
            context.clearRect(0, 0, cvsWidth, cvsHeight);
            context.drawImage(img, startLeft, startOp, drawWidth, drawHeight);
        } catch (error) {
            // Suppress errors that might happen during rapid resize/orientation change on iOS
            // e.g. "IndexSizeError" or "Source height is 0"
            console.warn("Canvas draw error ignored:", error);
        }
    };

    // Track current frame index to redraw on resize
    const currentIndexRef = useRef(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!images.length) return;
        const frameIndex = Math.min(
            images.length - 1,
            Math.floor(latest * images.length)
        );
        currentIndexRef.current = frameIndex;
        window.requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
            if (images.length > 0) {
                renderFrame(currentIndexRef.current);
            }
        };

        // Initial set
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    return (
        <div className="h-[500vh] relative bg-black">
            <div className="sticky top-0 h-[100vh] h-[100dvh] w-full overflow-hidden opacity-30 pointer-events-none">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-black z-10">
                        <div className="text-center">
                            <p className="text-xl font-bold mb-2">Loading Sequence...</p>
                            <p className="text-sm text-gray-400">{loadProgress}%</p>
                            <div className="w-48 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-200 ease-out"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
