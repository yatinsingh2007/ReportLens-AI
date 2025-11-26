"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientBackground } from "@/components/ui/gradient-background"
import { SlideUp } from "@/components/ui/animated-text"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login attempt:", { email, password })
    }

    return (
        <GradientBackground>
            <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
                <Link
                    href="/"
                    className="absolute left-4 top-4 text-sm text-muted-foreground hover:text-foreground md:left-8 md:top-8"
                >
                    ← Back to Home
                </Link>

                <SlideUp>
                    <Card className="bg-white/3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 w-full max-w-md">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                            <CardDescription className="text-base">
                                Sign in to your ReportLens AI account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-background/50 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                                    className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 cursor-pointer"
                                >
                                    Sign In
                                </Button>
                            </form>

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Don&apos;t have an account? </span>
                                <Link href="/signup" className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </SlideUp>
            </div>
        </GradientBackground>
    )
}
