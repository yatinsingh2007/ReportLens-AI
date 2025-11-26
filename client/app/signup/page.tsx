"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientBackground } from "@/components/ui/gradient-background"
import { SlideUp } from "@/components/ui/animated-text"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const getPasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z\d]/.test(password)) strength++
        return strength
    }

    const passwordStrength = getPasswordStrength(formData.password)
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!agreedToTerms) {
            alert("Please agree to the terms and conditions")
            return
        }
        console.log("Signup attempt:", formData)
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
                            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
                            <CardDescription className="text-base">
                                Start your journey to better health insights
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                                    {formData.password && (
                                        <div className="space-y-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-colors ${level <= passwordStrength
                                                            ? strengthColors[passwordStrength - 1]
                                                            : "bg-muted"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Password strength: {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Too weak"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 cursor-pointer"
                                >
                                    Create Account
                                </Button>
                            </form>

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Link href="/login" className="text-primary hover:underline">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </SlideUp>
            </div>
        </GradientBackground>
    )
}
