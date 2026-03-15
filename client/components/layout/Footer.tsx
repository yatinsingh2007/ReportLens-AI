import React from "react";
import Link from "next/link";

export function Footer({ isDark }: { isDark: boolean }) {
    return (
        <footer
            className={`border-t py-12 backdrop-blur-sm transition-colors duration-300 ${
                isDark
                    ? "border-zinc-800/80 bg-zinc-950/90"
                    : "border-slate-200 bg-white/90"
            }`}
        >
            <div className="container mx-auto px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30">
                            <span className="text-xl font-bold text-white">R</span>
                        </div>
                        <span
                            className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                                }`}
                        >
                            ReportLens AI
                        </span>
                    </div>

                    <div className="flex gap-8 text-sm font-medium">
                        <Link
                            href="#"
                            className={`transition-colors hover:text-teal-500 ${isDark
                                    ? "text-zinc-400 hover:text-teal-400"
                                    : "text-slate-600 hover:text-teal-600"
                                }`}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className={`transition-colors hover:text-teal-500 ${isDark
                                    ? "text-zinc-400 hover:text-teal-400"
                                    : "text-slate-600 hover:text-teal-600"
                                }`}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className={`transition-colors hover:text-teal-500 ${isDark
                                    ? "text-zinc-400 hover:text-teal-400"
                                    : "text-slate-600 hover:text-teal-600"
                                }`}
                        >
                            Contact
                        </Link>
                    </div>

                    <p
                        className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-500"
                            }`}
                    >
                        © {new Date().getFullYear()} ReportLens AI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
