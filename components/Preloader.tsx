"use client";

import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ loading }: { loading: boolean }) {
    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-white"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 h-full bg-white"
                            />
                        </div>
                        <p className="text-sm tracking-widest uppercase opacity-50">Loading Experience</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
