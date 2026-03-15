"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Subtle background texture for depth in both modes */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none dark:bg-[radial-gradient(#27272a_0.8px,transparent_1px)] dark:opacity-20`}
      />

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <HeroSection />
        <FeaturesGrid />
        <CTASection isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}