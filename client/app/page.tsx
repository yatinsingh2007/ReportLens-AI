"use client";

import { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, Sun, Moon } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"}`}
    >
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          isDark ? "border-zinc-800/80 bg-zinc-950/90" : "border-slate-200/80 bg-white/90 shadow-sm"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
              <span className="text-xl font-bold text-white">R</span>
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>ReportLens AI</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-7">
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              <Link
                href="/features"
                className={`transition-colors hover:text-teal-500 ${isDark ? "text-zinc-300 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"}`}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`transition-colors hover:text-teal-500 ${isDark ? "text-zinc-300 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"}`}
              >
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTheme()}
                className={`rounded-full p-2.5 transition-all active:scale-95 ${isDark ? "hover:bg-zinc-800 text-amber-400" : "hover:bg-slate-100 text-slate-600"}`}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Button variant="ghost" size="sm" asChild className={`hidden sm:inline-flex ${isDark ? "text-zinc-200 hover:bg-zinc-800 hover:text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}>
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

      <main>
        <HeroSection />
        <FeaturesGrid />

        <section className={`relative py-28 md:py-40 overflow-hidden ${isDark ? "bg-zinc-900/50" : "bg-gradient-to-b from-slate-100 to-slate-50"}`}>
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isDark ? "bg-gradient-to-br from-teal-950/30 via-cyan-950/20 to-transparent" : "bg-gradient-to-br from-teal-50/80 via-cyan-50/50 to-transparent"
            }`}
          />

          <div className="container relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className={`mb-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Start Your Health Journey{" "}
                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Today — Free
                </span>
              </h2>

              <p className={`mb-10 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
                Get clear, AI-powered insights from your lab reports in seconds.<br className="hidden sm:inline" />
                <span className={isDark ? "font-semibold text-teal-400" : "font-semibold text-teal-600"}>
                  No credit card • No pressure • Cancel anytime
                </span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button
                  size="lg"
                  asChild
                  className="group relative h-14 min-w-[260px] px-10 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-300 hover:scale-[1.02] border-0"
                >
                  <Link href="/signup" className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 group-hover:animate-pulse" />
                    Create Free Account
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={`h-14 min-w-[220px] px-10 text-lg font-semibold border-2 backdrop-blur-sm transition-all duration-300 hover:shadow-md ${
                    isDark
                      ? "border-zinc-600 bg-zinc-800/50 text-zinc-200 hover:border-teal-500 hover:text-teal-400 hover:bg-zinc-800/80"
                      : "border-slate-300 bg-white/80 text-slate-700 hover:border-teal-500 hover:text-teal-600 hover:bg-slate-50"
                  }`}
                  asChild
                >
                  <Link href="/demo">See Example Analysis</Link>
                </Button>
              </div>

              <div className={`mt-12 flex flex-wrap justify-center gap-x-10 gap-y-6 text-sm font-medium ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                <div className="flex items-center gap-2.5">
                  <Users className={`h-5 w-5 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                  No credit card required
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp className={`h-5 w-5 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className={`h-5 w-5 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                  Free plan forever
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer
        className={`border-t py-12 backdrop-blur-sm transition-colors duration-300 ${
          isDark ? "border-zinc-800/80 bg-zinc-950/80" : "border-slate-200 bg-white/80"
        }`}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>ReportLens AI</span>
            </div>

            <div className="flex gap-8 text-sm font-medium">
              <Link href="#" className={`transition-colors hover:text-teal-500 ${isDark ? "text-zinc-400 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"}`}>
                Privacy Policy
              </Link>
              <Link href="#" className={`transition-colors hover:text-teal-500 ${isDark ? "text-zinc-400 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"}`}>
                Terms of Service
              </Link>
              <Link href="#" className={`transition-colors hover:text-teal-500 ${isDark ? "text-zinc-400 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"}`}>
                Contact
              </Link>
            </div>

            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
              © {new Date().getFullYear()} ReportLens AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}