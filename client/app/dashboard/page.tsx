"use client"

import React, { useState, useRef, useEffect , useContext } from "react"
import { ThemeContext , ThemeContextType } from "@/context/ThemeContext";
import { FileUpload } from "@/components/ui/file-upload"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { IconPlus, IconMessage, IconMenu2, IconX } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import MessagesLayout from "@/components/MessagesLayout";
import SidebarContent from "@/components/Sidebar";
import { ChatRoomContext } from "@/context/ChatRoomContext";

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
    const { theme , toggleTheme } = useContext(ThemeContext);
    const { chatId , setRoomId } = useContext(ChatRoomContext);
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [showDashboard, setShowDashboard] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [messageLoader, setMessageLoader] = useState<boolean>(false);
    async function callChatIds(): Promise<void> {
        try {
            const res: { data: ChatRoom[] } = await api.get(
                '/api/chat/getAllChatIds',
                { withCredentials: true }
            );

            const chatData: ChatRoom[] = res.data;
            setChatRooms(chatData);
            setRoomId(chatData[0].id);

            if (chatData.length > 0) {
                setShowDashboard(true);
            }
        } catch (err) {
            console.log(err);
            if (isAxiosError(err)) {
                if (err.response?.status === 401) {
                    router.push('/login');
                    toast.error("Unauthorized Please Login to Access");
                }
                if (err.response?.status === 404) {
                    setShowDashboard(false);
                    return;
                }
            }
        }
    }

    async function getAllMessagesOfChat(chatId: string): Promise<void> {
        try {
            const res: { data: Message[] } = await api.get(
                `/api/chat/messages/${chatId}`,
                { withCredentials: true }
            );
            setMessages(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect((): void => {
        callChatIds();
        return
    }, []);

    useEffect((): void => {
        if (!chatId) return;
        getAllMessagesOfChat(chatId);
        return
    }, [chatId]);


    const handleFileUpload = async (files: File[]) => {
        try {
            const formData = new FormData();
            formData.append("file", files[0]);
            const resp: { data: Message } = await api.post("/api/chat/fileUpload", formData);
            toast.success("File uploaded successfully");
            setMessages((prev) => [...prev, resp.data]);
        } catch (err: unknown) {
            console.log(err);
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
            setMessageLoader(true)
            const newMsg = inputValue.trim();
            const resp: { data: Message[] } = await api.post("/api/chat/userQuery", {
                body: {
                    query: newMsg,
                    chatId: chatId
                }
            });
            setMessages(resp.data);
            setInputValue("");
        } catch (err) {
            toast.error("Failed to send message");
            console.log(err);
        } finally {
            setMessageLoader(false)
        }
    }

    const handleCreateChat = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try {
            const resp: { data: { message: string } } = await api.post("/api/chat/create", {
                withCredentials: true
            });
            if (resp.data.message === "chat created successfully") {
                toast.success("New conversation created");
                setTimeout(() => {
                    callChatIds();
                }, 1000)
            }
        } catch (e: unknown) {
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
        <div className="flex min-h-screen bg-neutral-900 text-white font-sans overflow-hidden">

            <div className="w-80 border-r border-neutral-800 bg-black/20 p-6 flex-col gap-6 hidden md:flex">
                <SidebarContent handleCreateChat={handleCreateChat} chatRooms={chatRooms} setMessages={setMessages} handleFileUpload={handleFileUpload}/>
            </div>


            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-left duration-200">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
                        >
                            <IconX className="w-6 h-6" />
                        </button>
                        <SidebarContent handleCreateChat={handleCreateChat} chatRooms={chatRooms} setMessages={setMessages} handleFileUpload={handleFileUpload}/>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col relative bg-neutral-950 h-screen">

                <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-neutral-400 hover:text-white"
                    >
                        <IconMenu2 className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-white">ReportLens</span>
                    <div className="w-8" />
                </div>

                <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth`}>
                    {!showDashboard || messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-50 animate-pulse opacity-50" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[80px] z-10" />

                            <div className="relative z-10 flex flex-col items-center backdrop-blur-md bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800/50 shadow-2xl max-w-lg w-full mx-4">
                                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center font-bold text-3xl text-white mb-6 shadow-lg shadow-primary/20">
                                    RL
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Welcome to ReportLens</h2>
                                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                                    Upload your medical reports to analyze them with AI, or start a new conversation to ask health-related questions.
                                </p>

                                <button
                                    onClick={handleCreateChat}
                                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-950 w-full max-w-xs hover:shadow-primary/20 hover:shadow-lg transition-all"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#0ea5e9_50%,#3b82f6_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-neutral-900 gap-2">
                                        <IconPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                        Start New Conversation
                                    </span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.length !== 0 && <MessagesLayout messages={messages} />}
                            {loading && (
                                <div className="flex justify-start w-full mb-4">
                                    <div className="flex flex-col space-y-2 p-4 bg-neutral-800/50 rounded-2xl rounded-bl-none border border-neutral-700/50 max-w-[75%]">
                                        <Skeleton className="h-4 w-[200px] bg-neutral-700" />
                                        <Skeleton className="h-4 w-[150px] bg-neutral-700" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="p-4 md:p-6 pb-8 w-full max-w-4xl mx-auto z-10 flex items-center gap-2">
                    <button
                        onClick={triggerFileInput}
                        className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors border border-neutral-700 md:hidden"
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
