"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Spotlight({
    className,
    fill = "white",
}: {
    className?: string
    fill?: string
}) {
    return (
        <motion.div
            className={cn(
                "pointer-events-none absolute -top-40 left-0 z-0 h-[169%] w-[138%] opacity-0 lg:w-[84%]",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
        >
            <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3787 2842"
                fill="none"
            >
                <g filter="url(#filter)">
                    <ellipse
                        cx="1924.71"
                        cy="273.501"
                        rx="1924.71"
                        ry="273.501"
                        transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                        fill={fill}
                        fillOpacity="0.21"
                    ></ellipse>
                </g>
                <defs>
                    <filter
                        id="filter"
                        x="0.860352"
                        y="0.838989"
                        width="3785.16"
                        height="2840.26"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        ></feBlend>
                        <feGaussianBlur
                            stdDeviation="151"
                            result="effect1_foregroundBlur_1065_8"
                        ></feGaussianBlur>
                    </filter>
                </defs>
            </svg>
        </motion.div>
    )
}
