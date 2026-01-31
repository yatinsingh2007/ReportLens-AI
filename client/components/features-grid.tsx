"use client"

import { motion } from "framer-motion"
import { FileUp, Sparkles, Lock, Shield, Zap, TrendingUp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const features = [
    {
        icon: FileUp,
        title: "Upload in Seconds",
        description: "Simply drag and drop your lab reports. Support for all major formats including PDF, images, and scanned documents.",
        color: "blue",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Insights",
        description: "Advanced machine learning analyzes your reports and provides clear explanations in simple language you can understand.",
        color: "sky",
    },
    {
        icon: TrendingUp,
        title: "Track Your Progress",
        description: "Visualize health trends over time with beautiful charts and get personalized recommendations for improvement.",
        color: "indigo",
    },
]

export function FeaturesGrid() {
    return (
        <section id="features" className="relative w-full bg-white dark:bg-slate-900 py-32">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-200"
                    >
                        <Shield className="h-4 w-4" />
                        Features
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl"
                    >
                        Everything You Need to
                        <br />
                        <span className="text-blue-600 dark:text-blue-400">Understand Your Health</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl"
                    >
                        Powerful AI technology combined with an intuitive interface makes
                        health monitoring effortless and accessible.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        const colorClasses = {
                            blue: {
                                bg: "bg-blue-600",
                                text: "text-blue-600",
                                bgLight: "bg-blue-50",
                                border: "border-blue-200",
                            },
                            sky: {
                                bg: "bg-sky-600",
                                text: "text-sky-600",
                                bgLight: "bg-sky-50",
                                border: "border-sky-200",
                            },
                            indigo: {
                                bg: "bg-indigo-600",
                                text: "text-indigo-600",
                                bgLight: "bg-indigo-50",
                                border: "border-indigo-200",
                            },
                        }[feature.color as "blue" | "sky" | "indigo"]

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                <Card className="group h-full border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl">
                                    <CardHeader className="pb-6">
                                        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colorClasses.bg} shadow-lg`}>
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className={`text-2xl font-bold ${colorClasses.text}`}>
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base leading-relaxed text-slate-600">
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
                    <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200">
                        <Lock className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Bank-Level Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200">
                        <Zap className="h-5 w-5 text-sky-600" />
                        <span className="text-sm font-semibold text-slate-700">Lightning Fast</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200">
                        <Shield className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-semibold text-slate-700">HIPAA Compliant</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
