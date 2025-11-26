"use client"

import React from "react"
import { motion } from "framer-motion"

export function GridBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
            </div>
            {children}
        </div>
    )
}

export function AnimatedGridPattern() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <motion.div
                className="absolute -left-1/2 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/30 blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -right-1/2 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/30 blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}
