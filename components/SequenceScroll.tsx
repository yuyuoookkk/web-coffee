"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "motion/react";

const FRAME_COUNT = 240;

export default function SequenceScroll({
    progress,
    onLoad,
}: {
    progress: MotionValue<number>;
    onLoad?: (loading: boolean) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                    if (onLoad) onLoad(false);
                }
            };
            imgs.push(img);
        }
        setImages(imgs);
    }, [onLoad]);

    // Draw logic
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img) return;

        // Cover logic
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;

        const ratio = Math.max(cw / iw, ch / ih);
        const nw = iw * ratio;
        const nh = ih * ratio;
        const cx = (cw - nw) / 2;
        const cy = (ch - nh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, cx, cy, nw, nh);
    };

    useMotionValueEvent(progress, "change", (latest) => {
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        requestAnimationFrame(() => render(frameIndex));
    });

    // Initial draw and resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (isLoaded) {
                    const frameIndex = Math.min(
                        FRAME_COUNT - 1,
                        Math.floor(progress.get() * FRAME_COUNT)
                    );
                    render(frameIndex);
                }
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        if (isLoaded) {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress.get() * FRAME_COUNT)
            );
            render(frameIndex);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images, progress]);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover block" />
    );
}
