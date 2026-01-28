"use client";

import { motion, MotionValue, useTransform } from "motion/react";
import { GoArrowRight } from "react-icons/go";

interface HeroOverlayProps {
    progress: MotionValue<number>;
}

export default function HeroOverlay({ progress }: HeroOverlayProps) {
    // 0% - 20%: Title
    const titleOpacity = useTransform(progress, [0, 0.15], [1, 0]);
    const titleY = useTransform(progress, [0, 0.15], [0, -50]);

    // 25% - 45%: Slogan Left
    const slogan1Opacity = useTransform(progress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
    const slogan1X = useTransform(progress, [0.2, 0.25], [-50, 0]);

    // 50% - 70%: Slogan Right
    const slogan2Opacity = useTransform(progress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
    const slogan2X = useTransform(progress, [0.5, 0.55], [50, 0]);

    // 80% - 100%: CTA
    const ctaOpacity = useTransform(progress, [0.8, 0.85], [0, 1]);
    const ctaScale = useTransform(progress, [0.8, 0.85], [0.8, 1]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* Title */}
            <motion.div
                style={{ opacity: titleOpacity, y: titleY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 text-white">FORE</h1>
                <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide uppercase">
                    The Essence of Pure Coffee
                </p>
            </motion.div>

            {/* Slogan Left */}
            <motion.div
                style={{ opacity: slogan1Opacity, x: slogan1X }}
                className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
            >
                <p className="text-4xl md:text-7xl font-bold leading-tight max-w-2xl text-white">
                    Sourced from<br />
                    <span className="text-white/60">High Altitudes.</span>
                </p>
            </motion.div>

            {/* Slogan Right */}
            <motion.div
                style={{ opacity: slogan2Opacity, x: slogan2X }}
                className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
            >
                <p className="text-4xl md:text-7xl font-bold leading-tight max-w-2xl text-white">
                    Roasted to<br />
                    <span className="text-white/60">Perfection.</span>
                </p>
            </motion.div>

            {/* CTA */}
            <motion.div
                style={{ opacity: ctaOpacity, scale: ctaScale }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
            >
                <h2 className="text-5xl md:text-8xl font-bold mb-8 text-center text-white">
                    Taste the <br /> Difference
                </h2>
                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    <span className="relative z-10 flex items-center gap-2">
                        Shop Collection <GoArrowRight />
                    </span>
                    <div className="absolute inset-0 bg-neutral-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
                </button>
            </motion.div>
        </div>
    );
}
