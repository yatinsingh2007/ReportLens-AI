"use client"

import React, { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import MessagesLayout from "@/components/MessagesLayout"
import SidebarContent from "@/components/Sidebar"
import { AiThinkingSkeleton } from "@/components/AiThinkingSkeleton"
import { MobileSidebar } from "@/components/dashboard/MobileSidebar"
import { WelcomeScreen } from "@/components/dashboard/WelcomeScreen"
import { ChatInputArea } from "@/components/dashboard/ChatInputArea"
import { ChatHeader } from "@/components/dashboard/ChatHeader"
import { useChatLogic } from "@/hooks/useChatLogic"

export interface Message {
    id: string
    role: "user" | "ai"
    content: string
    timestamp?: number
    filePresent?: boolean
}

export interface ChatRoom {
    id: string,
    createdAt: Date
}

export default function DashboardPage() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const isDark = theme === "dark"


    const {
        messages, setMessages,
        chatRooms,
        showDashboard,
        isGenerating,
        inputValue,
        selectedFile,
        isMobileMenuOpen, setIsMobileMenuOpen,
        fileInputRef,
        handleCreateChat,
        handleFileSelect,
        handleRemoveStagedFile,
        triggerFileInput,
        handleInputChange,
        handleSubmit
    } = useChatLogic();

    const placeholders = [
        "What do my cholesterol levels indicate?",
        "Explain the anomalies in my blood test.",
        "Is my Vitamin D level within normal range?",
        "Summarize this medical report for me.",
        "What lifestyle changes should I consider?",
    ];

    return (
        <div
            className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${
                isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"
            }`}
        >
            <div
                className={`hidden md:flex w-72 flex-col h-full border-r p-5 transition-colors shrink-0 ${
                    isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"
                }`}
            >
                <SidebarContent
                    handleCreateChat={handleCreateChat}
                    chatRooms={chatRooms}
                    setMessages={setMessages}
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                />
            </div>

            <MobileSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isDark={isDark}
                toggleTheme={toggleTheme}
                handleCreateChat={handleCreateChat}
                chatRooms={chatRooms}
                setMessages={setMessages}
            />

            <div
                className={`flex-1 flex flex-col h-full transition-colors relative ${isDark ? "bg-zinc-950" : "bg-slate-50"}`}
            >
                <ChatHeader
                    isDark={isDark}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    toggleTheme={toggleTheme}
                />


                <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                    {!showDashboard || (messages.length === 0 && !isGenerating) ? (
                        <WelcomeScreen isDark={isDark} handleCreateChat={handleCreateChat} />
                    ) : (
                        <div className="max-w-3xl mx-auto w-full space-y-4">
                            <MessagesLayout messages={messages} isDark={isDark} />
                            {isGenerating && (
                                <div className="pt-2 pb-4">
                                    <AiThinkingSkeleton isDark={isDark} />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ChatInputArea
                    isDark={isDark}
                    selectedFile={selectedFile}
                    handleRemoveStagedFile={handleRemoveStagedFile}
                    triggerFileInput={triggerFileInput}
                    fileInputRef={fileInputRef}
                    handleFileSelect={handleFileSelect}
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    placeholders={placeholders}
                />
            </div>
        </div>
    )
}


