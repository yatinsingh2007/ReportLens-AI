import React from "react";
import Link from "next/link";
import { IconMenu2, IconUser } from "@tabler/icons-react";
import { Sun, Moon } from "lucide-react";

export function ChatHeader({
    isDark,
    setIsMobileMenuOpen,
    toggleTheme,
}: {
    isDark: boolean;
    setIsMobileMenuOpen: (v: boolean) => void;
    toggleTheme: () => void;
}) {
    return (
        <header
            className={`md:hidden flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                isDark ? "border-zinc-800 bg-zinc-900/80" : "border-slate-200 bg-white"
            }`}
        >
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-lg transition-colors ${
                    isDark ? "text-zinc-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
                <IconMenu2 className="w-6 h-6" />
            </button>
            <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                ReportLens AI
            </span>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors ${
                        isDark ? "text-amber-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Link
                    href="/profile"
                    className={`p-2 rounded-lg transition-colors ${
                        isDark ? "text-zinc-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    aria-label="Profile"
                >
                    <IconUser className="w-6 h-6" />
                </Link>
            </div>
        </header>
    );
}
