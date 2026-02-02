"use client"

import { useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeContext } from "@/context/ThemeContext"

export function HeroSection() {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    return (
        <section
            className={`relative w-full overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48 transition-colors duration-300 ${
                isDark ? "bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" : "bg-gradient-to-br from-slate-50 via-teal-50/50 to-cyan-50/50"
            }`}
        >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className={`absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full blur-3xl ${isDark ? "bg-teal-500/20" : "bg-teal-200/50"}`}
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className={`absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full blur-3xl ${isDark ? "bg-cyan-500/15" : "bg-cyan-200/40"}`}
                    animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ring-1 transition-colors ${
                            isDark ? "bg-teal-500/20 text-teal-300 ring-teal-500/30" : "bg-teal-100 text-teal-700 ring-teal-200"
                        }`}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered Lab Report Analysis</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 max-w-5xl text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
                    >
                        <span className={isDark ? "text-zinc-100" : "text-slate-900"}>Transform Your </span>
                        <span className={isDark ? "text-teal-400" : "text-teal-600"}>Lab Reports</span>
                        <br />
                        <span className={isDark ? "text-zinc-100" : "text-slate-900"}>Into </span>
                        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>Actionable Insights</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl ${isDark ? "text-zinc-400" : "text-slate-600"}`}
                    >
                        Upload your clinical test reports and get{" "}
                        <span className={isDark ? "font-semibold text-teal-400" : "font-semibold text-teal-600"}>instant AI-powered summaries</span>.
                        <br />
                        Compare historical data and track your health journey with ease.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
                    >
                        <Button
                            size="lg"
                            asChild
                            className="h-14 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-10 text-lg font-bold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-600 hover:to-cyan-600 hover:shadow-xl hover:shadow-teal-500/40 border-0"
                        >
                            <Link href="/signup" className="flex items-center gap-2">
                                Get Started Free
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className={`h-14 rounded-xl border-2 px-10 text-lg font-semibold transition-all ${
                                isDark
                                    ? "border-zinc-600 bg-zinc-800/50 text-zinc-200 hover:border-teal-500 hover:bg-teal-500/10 hover:text-teal-400"
                                    : "border-slate-300 bg-white text-slate-700 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
                            }`}
                        >
                            <Link href="#features">Learn More</Link>
                        </Button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-medium md:gap-8"
                    >
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isDark ? "bg-teal-500/20" : "bg-teal-100"}`}>
                                <Zap className={`h-4 w-4 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                            </div>
                            <span className={isDark ? "text-teal-300" : "text-teal-700"}>Instant AI Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isDark ? "bg-cyan-500/20" : "bg-cyan-100"}`}>
                                <Shield className={`h-4 w-4 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                            </div>
                            <span className={isDark ? "text-cyan-300" : "text-cyan-700"}>100% Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isDark ? "bg-zinc-700" : "bg-slate-100"}`}>
                                <CheckCircle2 className={`h-4 w-4 ${isDark ? "text-zinc-300" : "text-slate-600"}`} />
                            </div>
                            <span className={isDark ? "text-zinc-400" : "text-slate-700"}>No Credit Card Required</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
