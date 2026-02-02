"use client"

import React, { useState, useRef, useEffect, useContext } from "react"
import Link from "next/link"
import { ThemeContext } from "@/context/ThemeContext"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { api } from "@/lib/axios"
import { toast } from "react-hot-toast"
import { IconPlus, IconMenu2, IconX, IconUser } from "@tabler/icons-react"
import { Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"
import MessagesLayout from "@/components/MessagesLayout"
import SidebarContent from "@/components/Sidebar"
import { ChatRoomContext } from "@/context/ChatRoomContext"
import { AuthContext } from "@/context/AuthContext"
import { AiThinkingSkeleton } from "@/components/AiThinkingSkeleton"

export interface Message {
    id: string
    role: "user" | "ai" 
    content: string
    timestamp: number
}

export interface ChatRoom {
    id: string,
    createdAt: Date
}

export default function DashboardPage() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { isAuthenticated } = useContext(AuthContext)
    const { chatId, setRoomId } = useContext(ChatRoomContext)
    const isDark = theme === "dark"
    
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [showDashboard, setShowDashboard] = useState<boolean>(true);
    
    const [isGenerating, setIsGenerating] = useState<boolean>(false); 
    
    const [inputValue, setInputValue] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function callChatIds(): Promise<void> {
        try {
            const res = await api.get('/api/chat/getAllChatIds', { withCredentials: true });
            const chatData: ChatRoom[] = res.data;
            setChatRooms(chatData);
            
            if (chatData.length > 0) {
                setRoomId(chatData[0].id);
                setShowDashboard(true);
            } else {
                setShowDashboard(false);
            }
        } catch (err) {
            console.log(err);
            if (isAxiosError(err)) {
                if (err.response?.status === 401) {
                    router.push('/login');
                    toast.error("Unauthorized. Please Login.");
                }
                if (err.response?.status === 404) {
                    setShowDashboard(false);
                }
            }
        }
    }

    async function getAllMessagesOfChat(currentChatId: string): Promise<void> {
        try {
            const res = await api.get(`/api/chat/messages/${currentChatId}`, { withCredentials: true });
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
            toast.error("Could not load chat history");
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        callChatIds();
    }, []);

    useEffect(() => {
        if (!chatId) return;
        getAllMessagesOfChat(chatId);
    }, [chatId]);

    const handleFileUpload = async (files: File[]) => {
        if (!chatId) return toast.error("Please select a chat first");
        
        try {
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("chatId", chatId); 
            const resp = await api.post("/api/chat/fileUpload", formData);
            
            toast.success("File uploaded successfully");
            setMessages((prev) => [...prev, resp.data]);
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload file");
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(Array.from(e.target.files));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        
        try {
            setIsGenerating(true); 
            const newMsg = inputValue.trim();
            
            setInputValue(""); 

            const resp = await api.post("/api/chat/userQuery", {
                query: newMsg,
                chatId: chatId
            }, { withCredentials: true });
            const data = resp.data;
            setMessages(Array.isArray(data) ? data : (data?.messages ? data.messages : []));
        } catch (err) {
            toast.error("Failed to send message");
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    }

    const handleCreateChat = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try {
            const resp = await api.post("/api/chat/create", {}, { withCredentials: true });
            if (resp.data.message === "chat created successfully") {
                toast.success("New conversation created");
                await callChatIds();
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to create conversation");
        }
    }

    const placeholders = [
        "What do my cholesterol levels indicate?",
        "Explain the anomalies in my blood test.",
        "Is my Vitamin D level within normal range?",
        "Summarize this medical report for me.",
        "What lifestyle changes should I consider?",
    ];

    return (
        <div
            className={`flex min-h-screen font-sans overflow-hidden transition-colors duration-300 ${
                isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"
            }`}
        >
            <aside
                className={`hidden md:flex w-72 flex-col border-r p-5 transition-colors ${
                    isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"
                }`}
            >
                <SidebarContent
                    handleCreateChat={handleCreateChat}
                    chatRooms={chatRooms}
                    setMessages={setMessages}
                    handleFileUpload={handleFileUpload}
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                />
            </aside>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside
                        className={`fixed inset-y-0 left-0 w-[85%] max-w-sm flex flex-col gap-6 p-6 shadow-2xl animate-in slide-in-from-left duration-200 border-r ${
                            isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"
                        }`}
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                        >
                            <IconX className="w-6 h-6" />
                        </button>
                        <SidebarContent
                            handleCreateChat={handleCreateChat}
                            chatRooms={chatRooms}
                            setMessages={setMessages}
                            handleFileUpload={handleFileUpload}
                            isDark={isDark}
                            toggleTheme={toggleTheme}
                        />
                    </aside>
                </div>
            )}

            <div
                className={`flex-1 flex flex-col min-h-screen transition-colors ${isDark ? "bg-zinc-950" : "bg-slate-50"}`}
            >
                <header
                    className={`md:hidden flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                        isDark ? "border-zinc-800 bg-zinc-900/80" : "border-slate-200 bg-white"
                    }`}
                >
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`p-2 rounded-lg transition-colors ${isDark ? "text-zinc-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                        <IconMenu2 className="w-6 h-6" />
                    </button>
                    <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>ReportLens AI</span>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-colors ${isDark ? "text-amber-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link
                            href="/profile"
                            className={`p-2 rounded-lg transition-colors ${isDark ? "text-zinc-400 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-100"}`}
                            aria-label="Profile"
                        >
                            <IconUser className="w-6 h-6" />
                        </Link>
                    </div>
                </header>


                <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                    {!showDashboard || (messages.length === 0 && !isGenerating) ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                            <div
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 opacity-40 ${
                                    isDark ? "bg-teal-500/20" : "bg-teal-200/60"
                                }`}
                            />
                            <div
                                className={`relative z-10 w-full max-w-md rounded-2xl border p-8 shadow-xl transition-colors ${
                                    isDark ? "bg-zinc-900/80 border-zinc-700" : "bg-white border-slate-200"
                                }`}
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 font-bold text-2xl text-white shadow-lg shadow-teal-500/25">
                                    RL
                                </div>
                                <h2 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                                    Welcome to ReportLens
                                </h2>
                                <p className={`text-base leading-relaxed mb-8 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                                    Upload medical reports or ask health-related questions. Start a new conversation to begin.
                                </p>
                                <button
                                    onClick={handleCreateChat}
                                    className="inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-cyan-600 hover:shadow-teal-500/30 active:scale-[0.98]"
                                >
                                    <IconPlus className="w-5 h-5" />
                                    Start New Conversation
                                </button>
                            </div>
                        </div>
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

                <div
                    className={`shrink-0 p-4 md:p-6 border-t ${
                        isDark ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
                    }`}
                >
                    <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
                        <button
                            onClick={triggerFileInput}
                            className={`shrink-0 p-3 rounded-xl border transition-all md:hidden ${
                                isDark
                                    ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                            }`}
                            aria-label="Upload file"
                        >
                            <IconPlus className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".pdf,.png,.jpg,.jpeg"
                        />
                        <div className="flex-1 min-w-0">
                            <PlaceholdersAndVanishInput
                                placeholders={placeholders}
                                onChange={handleInputChange}
                                onSubmit={handleSubmit}
                                isDark={isDark}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}