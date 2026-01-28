"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";

const reviews = [
    { text: "Absolutely divine. The best coffee I've ever had.", author: "Jane Doe, Sommelier" },
    { text: "A transcendent experience. Fore captures the soul of the bean.", author: "John Smith, Roaster" },
    { text: "Design and taste in perfect harmony.", author: "Alice Chen, Designer" },
    { text: "My morning ritual has been elevated forever.", author: "Bob Brown, Chef" },
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // Calculate total scrolling width: (card width + gap) * count
            // For simplicity, let's just use scrollWidth - offsetWidth
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="bg-[#020202] text-white py-24 overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="px-6 mb-12">
                <h2 className="text-4xl font-bold">Voices</h2>
            </div>

            <motion.div
                ref={containerRef}
                className="flex gap-8 px-6 w-full"
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8"
                >
                    {reviews.map((review, i) => (
                        <div key={i} className="min-w-[80vw] md:min-w-[40vw] bg-[#0a0a0a] p-12 rounded-3xl border border-white/5 select-none">
                            <p className="text-3xl md:text-5xl font-light mb-8 leading-tight">"{review.text}"</p>
                            <p className="text-sm uppercase tracking-widest opacity-50">— {review.author}</p>
                        </div>
                    ))}
                    {/* Duplicate for infinite feel or just leave as drag slider */}
                    {reviews.map((review, i) => (
                        <div key={`dup-${i}`} className="min-w-[80vw] md:min-w-[40vw] bg-[#0a0a0a] p-12 rounded-3xl border border-white/5 select-none">
                            <p className="text-3xl md:text-5xl font-light mb-8 leading-tight">"{review.text}"</p>
                            <p className="text-sm uppercase tracking-widest opacity-50">— {review.author}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
