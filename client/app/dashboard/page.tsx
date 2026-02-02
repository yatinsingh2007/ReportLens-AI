"use client"

import DashboardPage from "@/components/DashboardPage"
import { AuthProvider } from "@/context/AuthContext"

export default function Dashboard(){
    return (
        <AuthProvider>
            <DashboardPage />
        </AuthProvider>
    )
}