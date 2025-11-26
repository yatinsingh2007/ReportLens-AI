"use client"

import React from "react"
import { motion } from "framer-motion"

export function FadeIn({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    )
}

export function SlideUp({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

export function TypewriterText({
    text,
    className,
}: {
    text: string
    className?: string
}) {
    const words = text.split(" ")

    return (
        <div className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                    }}
                    className="inline-block mr-1"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    )
}
