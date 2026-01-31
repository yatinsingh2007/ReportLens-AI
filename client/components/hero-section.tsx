"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-32 md:pt-32 md:pb-48">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-blue-200/40 blur-3xl"
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
                    className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-3xl"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-200"
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
                        <span className="text-slate-900 dark:text-slate-100">Transform Your </span>
                        <span className="text-blue-600 dark:text-blue-400">Lab Reports</span>
                        <br />
                        <span className="text-slate-900 dark:text-slate-100">Into </span>
                        <span className="text-sky-600 dark:text-sky-400">Actionable Insights</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl"
                    >
                        Upload your clinical test reports and get{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">instant AI-powered summaries</span>.
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
                        {/* Primary CTA */}
                        <Button
                            size="lg"
                            asChild
                            className="h-14 rounded-xl bg-blue-600 px-10 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                        >
                            <Link href="/signup" className="flex items-center gap-2">
                                Get Started Free
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>

                        {/* Secondary CTA */}
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="h-14 rounded-xl border-2 border-slate-300 bg-white px-10 text-lg font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50"
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
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <Zap className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-blue-700">Instant AI Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                                <Shield className="h-4 w-4 text-sky-600" />
                            </div>
                            <span className="text-sky-700">100% Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                                <CheckCircle2 className="h-4 w-4 text-slate-600" />
                            </div>
                            <span className="text-slate-700">No Credit Card Required</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
