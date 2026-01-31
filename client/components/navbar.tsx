"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Menu, X, Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeContext } from "@/context/ThemeContext"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { theme, toggleTheme } = React.useContext(ThemeContext)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "border-b border-border/40 bg-background/95 shadow-lg backdrop-blur-xl"
                : "border-b border-transparent bg-background/50 backdrop-blur-md"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-blue-600 shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        ReportLens AI
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>
                    <Link
                        href="#features"
                        className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Features
                    </Link>
                    <Link
                        href="#about"
                        className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        About
                    </Link>
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-9 w-9"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 font-semibold"
                    >
                        <Link href="/login">Login</Link>
                    </Button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            asChild
                            className="bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg font-semibold"
                        >
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </motion.div>
                </div>

                <button
                    className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="bg-background border-b border-border/40 md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
                            <Link
                                href="/"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="#features"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#about"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <div className="flex flex-col gap-2 pt-4">
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild className="w-full bg-primary text-primary-foreground">
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
