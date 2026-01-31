"use client"

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-slate-950">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesGrid />

        {/* CTA Section */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-32">
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl">
                Start Your Health Journey{" "}
                <span className="text-blue-600 dark:text-blue-400">Today, For Free</span>
              </h2>
              <p className="mb-12 text-lg text-slate-600 dark:text-slate-300 md:text-xl">
                Take control of your health with AI-powered insights from your lab reports.
                <br />
                <span className="font-semibold text-blue-600 dark:text-blue-400">No credit card required.</span> Start analyzing in seconds.
              </p>

              {/* CTA Button */}
              <Button
                size="lg"
                asChild
                className="h-16 rounded-xl bg-blue-600 px-12 text-xl font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
              >
                <Link href="/signup" className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  Create Free Account
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <span className="text-slate-700 dark:text-slate-300">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-slate-700 dark:text-slate-300">Free forever plan</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold text-white">R</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">ReportLens AI</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </Link>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 ReportLens AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
