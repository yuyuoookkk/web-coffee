"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import SequenceScroll from "./SequenceScroll";
import HeroOverlay from "./HeroOverlay";

export default function HeroSection({
    onLoad,
}: {
    onLoad?: (loading: boolean) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Optional: fade out the whole hero content when it's done? 
    // Text overlay handles its own fade out.
    // The canvas just sticks.

    return (
        <div ref={containerRef} className="h-[400vh] relative z-10">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020202]">
                <SequenceScroll progress={scrollYProgress} onLoad={onLoad} />
                <HeroOverlay progress={scrollYProgress} />
            </div>
        </div>
    );
}
