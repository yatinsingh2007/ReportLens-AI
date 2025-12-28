"use client"

import React, { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";

interface Message {
    id: string
    role: "user" | "ai"
    content: string
    file: File[] | null
}

export default function DashboardPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hello! I'm ReportLens AI. Upload your health reports (PDF) and ask me anything about them.",
            file: null
        },
    ])
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleFileUpload = async (files: File[]) => {
        try {
            const formData = new FormData();
            formData.append("file", files[0]);
            const res = await api.post("/api/file/upload", formData);
            toast.success("File uploaded successfully");
        } catch (err: unknown) {
            console.log(err);
            toast.error("Failed to upload file");
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            file: null
        }

        setMessages(prev => [...prev, userMessage])
        setLoading(true)

        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "I've received your query. As an AI health assistant, I'm analyzing your request. Once connected to the backend, I'll provide detailed insights from your medical reports.",
                file: null
            }
            setMessages(prev => [...prev, aiMessage])
            setLoading(false)
        }, 2000)

        setInputValue("")
    }

    const placeholders = [
        "What do my cholesterol levels indicate?",
        "Explain the anomalies in my blood test.",
        "Is my Vitamin D level within normal range?",
        "Summarize this medical report for me.",
        "What lifestyle changes should I consider?",
    ];

    return (
        <div className="flex min-h-screen bg-neutral-900 text-white font-sans overflow-hidden">
            <div className="w-80 border-r border-neutral-800 bg-black/20 p-6 flex flex-col gap-6 hidden md:flex">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">RL</div>
                    <h1 className="text-xl font-bold tracking-tight text-white">ReportLens</h1>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    <h2 className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">Upload Reports</h2>
                    <div className="w-full border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50 min-h-[150px]">
                        <FileUpload onChange={handleFileUpload} />
                    </div>
                    <p className="text-xs text-neutral-500 mt-4 text-center">
                        Supported formats: PDF, PNG, JPG
                    </p>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs">U</div>
                        <div className="text-sm">
                            <p className="font-medium text-neutral-200">User Account</p>
                            <p className="text-xs text-neutral-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col relative bg-neutral-950 h-screen">

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full mb-4",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm md:text-base leading-relaxed shadow-sm",
                                    msg.role === "user"
                                        ? "bg-emerald-600 text-white rounded-br-none"
                                        : "bg-neutral-800 text-neutral-200 rounded-bl-none border border-neutral-700"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start w-full mb-4">
                            <div className="bg-neutral-800 rounded-2xl rounded-bl-none px-5 py-4 border border-neutral-700 flex items-center gap-2">
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 md:p-6 pb-8 w-full max-w-4xl mx-auto z-10">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}
