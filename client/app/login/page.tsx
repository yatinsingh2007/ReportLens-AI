"use client"

import React, { useState, useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/axios"
import { Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { isAxiosError } from "axios"
import { ThemeContext } from "@/context/ThemeContext"

export default function LoginPage() {
    const router = useRouter()
    const { theme, toggleTheme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const resp: { data: { message: string } } = await api.post("/api/auth/login", {
                email,
                password
            });
            toast.success(resp.data.message)
            router.push("/dashboard")
            return
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                const status = err.response?.status;

                if (status === 404) {
                    toast.error("User not found");
                } else if (status === 401) {
                    toast.error("Invalid credentials");
                } else {
                    toast.error("Login failed");
                }

                console.error(err.response?.data);
            } else {
                toast.error("Something went wrong");
                console.error(err);
            }
            toast.error("Failed to login");
            console.log(err);
            setIsLoading(false)
        }
    }

    const inputBase = isDark
        ? "border-zinc-600 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-teal-500 focus-visible:border-teal-500"
        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus-visible:ring-teal-500 focus-visible:border-teal-500"

    return (
        <div
            className={`flex min-h-screen items-center justify-center px-4 py-12 transition-colors duration-300 ${
                isDark ? "bg-zinc-950" : "bg-slate-100"
            }`}
        >
            <Link
                href="/"
                className={`absolute left-4 top-4 text-sm md:left-8 md:top-8 transition-colors ${
                    isDark ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
            >
                ← Back to Home
            </Link>

            <button
                type="button"
                onClick={toggleTheme}
                className={`absolute right-4 top-4 rounded-full p-2.5 transition-all active:scale-95 md:right-8 md:top-8 ${
                    isDark ? "text-amber-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-200"
                }`}
                aria-label="Toggle theme"
            >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Card
                className={`w-full max-w-md shadow-xl transition-colors ${
                    isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"
                }`}
            >
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        Welcome Back
                    </CardTitle>
                    <CardDescription className={isDark ? "text-zinc-400" : "text-slate-500"}>
                        Sign in to your ReportLens AI account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className={isDark ? "text-zinc-200" : "text-slate-700"}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={inputBase}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className={isDark ? "text-zinc-200" : "text-slate-700"}>
                                    Password
                                </Label>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`pr-10 ${inputBase}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4 cursor-pointer" />
                                    ) : (
                                        <EyeOff className="h-4 w-4 cursor-pointer" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium border-0 shadow-lg shadow-teal-500/25"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className={isDark ? "text-zinc-400" : "text-slate-500"}>
                            Don&apos;t have an account?{" "}
                        </span>
                        <Link
                            href="/signup"
                            className="font-medium text-teal-500 hover:text-teal-400 hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
