"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Brain, BarChart3, Shield, Zap, Clock } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        icon: FileUp,
        title: "Easy Upload",
        description: "Simply upload your lab reports in any format - PDF, images, or documents.",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: Brain,
        title: "AI Analysis",
        description: "Advanced AI algorithms analyze your reports and extract key health metrics.",
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: BarChart3,
        title: "Historical Comparison",
        description: "Track changes over time and compare your latest results with previous reports.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Zap,
        title: "Instant Summaries",
        description: "Get clear, concise summaries of your lab results in seconds.",
        color: "from-amber-500 to-orange-500",
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your health data is encrypted and stored securely with enterprise-grade protection.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Clock,
        title: "24/7 Access",
        description: "Access your health dashboard anytime, anywhere, from any device.",
        color: "from-indigo-500 to-purple-500",
    },
]

export function FeaturesGrid() {
    return (
        <section id="features" className="relative w-full py-20 md:py-32">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Powerful Features for{" "}
                        <span className="bg-linear-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Better Health Insights</span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-lg text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Everything you need to understand and track your health metrics in one place
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="group bg-white/3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] h-full border-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                                    <CardHeader>
                                        <div
                                            className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${feature.color}`}
                                        >
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
