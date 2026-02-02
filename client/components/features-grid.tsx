"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { FileUp, Sparkles, Lock, Shield, Zap, TrendingUp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ThemeContext } from "@/context/ThemeContext"

const features = [
    {
        icon: FileUp,
        title: "Upload in Seconds",
        description: "Simply drag and drop your lab reports. Support for all major formats including PDF, images, and scanned documents.",
        color: "teal",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Insights",
        description: "Advanced machine learning analyzes your reports and provides clear explanations in simple language you can understand.",
        color: "cyan",
    },
    {
        icon: TrendingUp,
        title: "Track Your Progress",
        description: "Visualize health trends over time with beautiful charts and get personalized recommendations for improvement.",
        color: "emerald",
    },
]

export function FeaturesGrid() {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    const colorMap = {
        teal: { bg: "bg-teal-500", text: isDark ? "text-teal-400" : "text-teal-600" },
        cyan: { bg: "bg-cyan-500", text: isDark ? "text-cyan-400" : "text-cyan-600" },
        emerald: { bg: "bg-emerald-500", text: isDark ? "text-emerald-400" : "text-emerald-600" },
    }

    return (
        <section
            id="features"
            className={`relative w-full py-32 transition-colors duration-300 ${isDark ? "bg-zinc-900/50" : "bg-white"}`}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors ${
                            isDark ? "bg-teal-500/20 text-teal-300 ring-teal-500/30" : "bg-teal-100 text-teal-700 ring-teal-200"
                        }`}
                    >
                        <Shield className="h-4 w-4" />
                        Features
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`mb-6 text-5xl font-extrabold tracking-tight md:text-6xl ${isDark ? "text-zinc-100" : "text-slate-900"}`}
                    >
                        Everything You Need to
                        <br />
                        <span className={isDark ? "text-teal-400" : "text-teal-600"}>Understand Your Health</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`mx-auto max-w-2xl text-lg md:text-xl ${isDark ? "text-zinc-400" : "text-slate-600"}`}
                    >
                        Powerful AI technology combined with an intuitive interface makes
                        health monitoring effortless and accessible.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        const colors = colorMap[feature.color as keyof typeof colorMap]

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                <Card
                                    className={`group h-full border-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                        isDark
                                            ? "border-zinc-700 bg-zinc-800/50 hover:border-teal-500/50"
                                            : "border-slate-200 bg-white hover:border-teal-200 hover:shadow-teal-100"
                                    }`}
                                >
                                    <CardHeader className="pb-6">
                                        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} shadow-lg`}>
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className={`text-2xl font-bold ${colors.text}`}>
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className={`text-base leading-relaxed ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Additional features badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-4"
                >
                    <div
                        className={`flex items-center gap-2 rounded-full px-5 py-3 shadow-sm ring-1 transition-colors ${
                            isDark ? "bg-zinc-800 ring-zinc-600" : "bg-white ring-slate-200"
                        }`}
                    >
                        <Lock className="h-5 w-5 text-teal-500" />
                        <span className={`text-sm font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>Bank-Level Encryption</span>
                    </div>
                    <div
                        className={`flex items-center gap-2 rounded-full px-5 py-3 shadow-sm ring-1 transition-colors ${
                            isDark ? "bg-zinc-800 ring-zinc-600" : "bg-white ring-slate-200"
                        }`}
                    >
                        <Zap className="h-5 w-5 text-cyan-500" />
                        <span className={`text-sm font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>Lightning Fast</span>
                    </div>
                    <div
                        className={`flex items-center gap-2 rounded-full px-5 py-3 shadow-sm ring-1 transition-colors ${
                            isDark ? "bg-zinc-800 ring-zinc-600" : "bg-white ring-slate-200"
                        }`}
                    >
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <span className={`text-sm font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>HIPAA Compliant</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
