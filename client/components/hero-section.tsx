"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { AnimatedGridPattern } from "@/components/ui/grid-background"
import { SlideUp } from "@/components/ui/animated-text"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden pt-16">

            <AnimatedGridPattern />
            <Spotlight className="left-0 top-40 md:left-60 md:top-20" fill="#10b981" />

            <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
                <SlideUp delay={0.1}>
                    <motion.div
                        className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-4 py-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium">AI-Powered Lab Report Analysis</span>
                    </motion.div>
                </SlideUp>


                <SlideUp delay={0.2}>
                    <h1 className="mb-6 max-w-4xl text-center text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                        Transform Your{" "}
                        <span className="bg-linear-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Lab Reports</span>
                        <br />
                        Into Actionable Insights
                    </h1>
                </SlideUp>


                <SlideUp delay={0.3}>
                    <p className="mb-10 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
                        Upload your clinical test reports and get instant AI-powered summaries.
                        Compare historical data and track your health journey with ease.
                    </p>
                </SlideUp>


                <SlideUp delay={0.4}>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            asChild
                            className="group bg-linear-to-r from-emerald-500 to-cyan-500 px-8 text-base hover:from-emerald-600 hover:to-cyan-600"
                        >
                            <Link href="/signup">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="px-8 text-base">
                            <Link href="#features">Learn More</Link>
                        </Button>
                    </div>
                </SlideUp>


                <SlideUp delay={0.5}>
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
                        {["Instant AI Summaries", "Historical Comparison", "Secure Dashboard"].map(
                            (feature, index) => (
                                <motion.div
                                    key={feature}
                                    className="rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-medium"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                    {feature}
                                </motion.div>
                            )
                        )}
                    </div>
                </SlideUp>
            </div>
        </section>
    )
}
