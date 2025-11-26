"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <motion.nav
            className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-cyan-500">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent">ReportLens AI</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        href="#features"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>
                    <Link
                        href="#about"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                </div>

                {/* Desktop CTA Buttons */}
                <div className="hidden items-center gap-4 md:flex">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border-t md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
                            <Link
                                href="/"
                                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="#features"
                                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#about"
                                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <div className="flex flex-col gap-2 pt-4">
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild className="w-full bg-linear-to-r from-emerald-500 to-cyan-500">
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
