"use client";

import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Demo user data - replace with real API later
const DEMO_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: null,
  memberSince: "January 2025",
  conversationsCount: 12,
  reportsAnalyzed: 28,
  plan: "Free",
};

export default function ProfilePage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
          isDark ? "border-zinc-800 bg-zinc-950/90" : "border-slate-200 bg-white/90"
        }`}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isDark ? "text-zinc-300 hover:bg-zinc-800 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            className={`rounded-lg p-2 transition-colors ${
              isDark ? "text-amber-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-10 md:py-16">
        {/* Profile card */}
        <div
          className={`overflow-hidden rounded-2xl border shadow-xl transition-colors ${
            isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`h-24 md:h-32 ${
              isDark ? "bg-gradient-to-br from-teal-900/50 to-cyan-900/50" : "bg-gradient-to-br from-teal-100 to-cyan-100"
            }`}
          />
          <div className="relative px-6 pb-8 md:px-8">
            <div className="-mt-12 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-teal-500 to-cyan-500 text-2xl font-bold text-white shadow-lg border-zinc-900/50 dark:border-zinc-900">
                {initials}
              </div>
              <div className="flex-1 pb-1">
                <h1 className={`text-2xl font-bold tracking-tight md:text-3xl ${isDark ? "text-white" : "text-slate-900"}`}>
                  {DEMO_USER.name}
                </h1>
                <p className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                  {DEMO_USER.plan} plan
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div
                className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                  isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? "bg-zinc-700" : "bg-white"}`}>
                  <Mail className={`h-5 w-5 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                    Email
                  </p>
                  <p className={`font-medium ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                    {DEMO_USER.email}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                  isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? "bg-zinc-700" : "bg-white"}`}>
                  <Calendar className={`h-5 w-5 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                    Member since
                  </p>
                  <p className={`font-medium ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                    {DEMO_USER.memberSince}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div
                className={`rounded-xl border p-5 text-center transition-colors ${
                  isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-200 bg-slate-50"
                }`}
              >
                <MessageSquare className={`mx-auto h-8 w-8 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                <p className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {DEMO_USER.conversationsCount}
                </p>
                <p className={`text-sm ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                  Conversations
                </p>
              </div>
              <div
                className={`rounded-xl border p-5 text-center transition-colors ${
                  isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-200 bg-slate-50"
                }`}
              >
                <FileText className={`mx-auto h-8 w-8 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                <p className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {DEMO_USER.reportsAnalyzed}
                </p>
                <p className={`text-sm ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                  Reports analyzed
                </p>
              </div>
            </div>

            <div
              className={`mt-6 flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                isDark ? "border-emerald-800/50 bg-emerald-950/30" : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <Shield className={`h-5 w-5 shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              <p className={`text-sm ${isDark ? "text-emerald-200" : "text-emerald-800"}`}>
                Your health data is encrypted and never shared. We are committed to your privacy.
              </p>
            </div>
          </div>
        </div>

        <p className={`mt-8 text-center text-sm ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
          This is demo data. Connect your account to see real stats.
        </p>
      </main>
    </div>
  );
}
