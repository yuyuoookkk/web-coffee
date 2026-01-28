"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const phrase = "Coffee is more than a drink. It is a ritual, a moment of pause, and a connection to the earth. We source the finest beans to bring you an experience that transcends the ordinary.";

export default function About() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    });

    const words = phrase.split(" ");

    return (
        <section ref={container} className="min-h-screen flex items-center justify-center bg-[#020202] text-white py-24 md:py-48 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] flex flex-wrap gap-x-4 gap-y-2">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
                    })}
                </p>
            </div>
        </section>
    );
}

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className="relative transition-opacity">
            {children}
        </motion.span>
    )
}
