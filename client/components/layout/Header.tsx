import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function Header({
    isDark,
    toggleTheme,
}: {
    isDark: boolean;
    toggleTheme: () => void;
}) {
    return (
        <header
            className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
                isDark
                    ? "border-zinc-800/80 bg-zinc-950/95"
                    : "border-slate-200/80 bg-white/95 shadow-sm"
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30">
                        <span className="text-xl font-bold text-white">R</span>
                    </div>
                    <span
                        className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                            }`}
                    >
                        ReportLens AI
                    </span>
                </div>

                <div className="flex items-center gap-5 sm:gap-7">
                    <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
                        <Link
                            href="/features"
                            className={`transition-colors hover:text-teal-500 ${isDark
                                    ? "text-zinc-300 hover:text-teal-400"
                                    : "text-slate-600 hover:text-teal-600"
                                }`}
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className={`transition-colors hover:text-teal-500 ${isDark
                                    ? "text-zinc-300 hover:text-teal-400"
                                    : "text-slate-600 hover:text-teal-600"
                                }`}
                        >
                            Pricing
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleTheme()}
                            className={`rounded-full p-2.5 transition-all active:scale-95 ${isDark
                                    ? "hover:bg-zinc-800 text-amber-400"
                                    : "hover:bg-slate-100 text-slate-600"
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className={`hidden sm:inline-flex ${isDark
                                    ? "text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                        >
                            <Link href="/login">Log in</Link>
                        </Button>

                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-md shadow-teal-500/25 text-white border-0"
                            asChild
                        >
                            <Link href="/signup">Sign up free</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
