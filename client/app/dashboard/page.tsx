"use client"

import React, { useState, useRef, useEffect } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { IconPlus, IconMessage, IconMenu2, IconX } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { isAxiosError } from "axios";

interface Message {
    id: string
    role: "user" | "ai"
    content: string
    file?: File[] | null
    timestamp: number
}

interface ChatRoom {
    id: string,
    createdAt: Date
}

export default function DashboardPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [showDashboard, setShowDashboard] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [chatId, setChatId] = useState<string>("");
    const [showChat, setShowChat] = useState<boolean>(false);
    async function callChatIds(): Promise<void> {
        try {
            const res: { data: ChatRoom[] } = await api.get(
                '/api/chat/getAllChatIds',
                { withCredentials: true }
            );

            const chatData: ChatRoom[] = res.data;
            setChatRooms(chatData);

            if (chatData.length > 0) {
                setChatId(chatData[0].id);
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
            await api.post("/api/chat/fileUpload", formData);
            toast.success("File uploaded successfully");

            const uploadMsg: Message = {
                id: crypto.randomUUID(),
                role: 'user',
                content: `[Uploaded File: ${files[0].name}]`,
                timestamp: Date.now()
            };

            const newChatId = crypto.randomUUID();
            const updatedMessages = [...messages, uploadMsg];
            // saveChatToStorage(newChatId, updatedMessages);
            router.push(`/dashboard/${newChatId}`);

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

        const currentChatId = crypto.randomUUID();

        const newMsg: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: inputValue,
            timestamp: Date.now()
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        // saveChatToStorage(currentChatId, updatedMessages);
        setInputValue("");
        setLoading(true);

        try {
            const resp = await api.post("/api/chat/query?filePresent=false", {
                question: inputValue
            }, {
                withCredentials: true
            });

            const aiMsg: Message = {
                id: crypto.randomUUID(),
                role: 'ai',
                content: resp.data.message,
                timestamp: Date.now()
            };

            const finalMessages = [...updatedMessages, aiMsg];

            router.push(`/dashboard/${currentChatId}`);

        } catch (err) {
            toast.error("Failed to send message");
            console.log(err);
        } finally {
            setLoading(false);
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

    const SidebarContent = () => (
        <>
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">RL</div>
                <h1 className="text-xl font-bold tracking-tight text-white">ReportLens</h1>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    className="flex items-center gap-2 w-full p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all font-medium text-sm"
                    onClick={handleCreateChat}
                >
                    <IconPlus className="w-4 h-4" />
                    New Conversation
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                <h2 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Recent Chats</h2>
                {chatRooms.length === 0 && <p className="text-xs text-neutral-600">No history yet.</p>}
                {chatRooms.map((chat: ChatRoom) => (
                    <div
                        key={chat.id}
                        onClick={async (e : React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            try {
                                  const resp : { data : Message[] } = await api.get(`/api/chat/messages/${chat.id}`);
                                  setMessages([...resp.data]);
                            }catch(e : unknown) {
                                console.log(e)
                            }
                        }}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer text-sm truncate",
                            "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                        )}
                    >
                        <IconMessage className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                            {new Date(chat.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-neutral-800">
                <h2 className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">Upload Reports</h2>
                <div className="w-full border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50 min-h-[100px] flex flex-col items-center justify-center p-2 mb-4">
                    <FileUpload onChange={handleFileUpload} />
                </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs">U</div>
                    <div className="text-sm">
                        <p className="font-medium text-neutral-200">User Account</p>
                        <p className="text-xs text-neutral-500">View Profile</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-neutral-900 text-white font-sans overflow-hidden">

            <div className="w-80 border-r border-neutral-800 bg-black/20 p-6 flex-col gap-6 hidden md:flex">
                <SidebarContent />
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
                        <SidebarContent />
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col relative bg-neutral-950 h-screen">

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-neutral-400 hover:text-white"
                    >
                        <IconMenu2 className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-white">ReportLens</span>
                    <div className="w-8" /> {/* Spacer for balance */}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
                    {!showDashboard || messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 relative overflow-hidden">
                            {/* Background Effects */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] -z-10" />

                            <div className="relative z-10 flex flex-col items-center backdrop-blur-md bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800/50 shadow-2xl max-w-lg w-full mx-4">
                                <div className="h-20 w-20 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-3xl text-white mb-6 shadow-lg shadow-emerald-500/20">
                                    RL
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Welcome to ReportLens</h2>
                                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                                    Upload your medical reports to analyze them with AI, or start a new conversation to ask health-related questions.
                                </p>

                                <button
                                    onClick={handleCreateChat}
                                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950 w-full max-w-xs hover:shadow-emerald-500/20 hover:shadow-lg transition-all"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#06b6d4_50%,#10b981_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-neutral-900 gap-2">
                                        <IconPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                        Start New Conversation
                                    </span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.length !== 0 && messages.map((msg: Message) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full mb-4",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[95%] md:max-w-[75%] rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-sm md:text-base leading-relaxed shadow-sm",
                                            msg.role === "user"
                                                ? "bg-emerald-600 text-white rounded-br-none"
                                                : "bg-neutral-800 text-neutral-200 rounded-bl-none border border-neutral-700"
                                        )}
                                    >
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
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
