"use client"

import React, { useState, useRef, useEffect } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { IconPlus, IconMessage, IconMenu2, IconX } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string
    role: "user" | "ai"
    content: string
    file?: File[] | null
    timestamp: number
}

interface ChatSession {
    id: string
    title: string
    messages: Message[]
    updatedAt: number
}

export default function DashboardPage() {
    const params = useParams();
    const router = useRouter();
    const chatId = params?.chatId as string;

    const [messages, setMessages] = useState<Message[]>([])
    const [chats, setChats] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedChats = localStorage.getItem('reportlens_chats');
        let parsedChats: ChatSession[] = [];
        if (savedChats) {
            try {
                parsedChats = JSON.parse(savedChats)
                parsedChats.sort((a, b) => b.updatedAt - a.updatedAt)
                setChats(parsedChats)
            } catch (e) {
                console.error("Failed to parse chats", e)
            }
        }

        if (chatId) {
            const currentChat = parsedChats.find(c => c.id === chatId);
            if (currentChat) {
                setMessages(currentChat.messages);
            } else {
                const initialMsg: Message = {
                    id: "1",
                    role: "ai",
                    content: "Hello! I'm ReportLens AI. Upload your health reports (PDF) and ask me anything about them.",
                    file: null,
                    timestamp: Date.now()
                };
                setMessages([initialMsg]);
            }
        }
    }, [chatId]);

    const saveChatToStorage = (id: string, msgs: Message[]) => {
        const savedChats = localStorage.getItem('reportlens_chats');
        let parsedChats: ChatSession[] = savedChats ? JSON.parse(savedChats) : [];

        const existingIndex = parsedChats.findIndex(c => c.id === id);
        const firstUserMsg = msgs.find(m => m.role === 'user');
        const titleContent = firstUserMsg ? firstUserMsg.content : `Conversation ${id.slice(0, 4)}`;
        const title = titleContent.length > 30 ? titleContent.slice(0, 30) + "..." : titleContent;

        const updatedSession: ChatSession = {
            id,
            title: existingIndex !== -1 ? parsedChats[existingIndex].title : title,
            messages: msgs,
            updatedAt: Date.now()
        };

        if (existingIndex !== -1) {
            parsedChats[existingIndex] = updatedSession;
        } else {
            parsedChats.push(updatedSession);
        }
        parsedChats.sort((a, b) => b.updatedAt - a.updatedAt);

        localStorage.setItem('reportlens_chats', JSON.stringify(parsedChats));
        setChats(parsedChats);
    };

    const handleNewChat = () => {
        const newId = crypto.randomUUID();
        setIsMobileMenuOpen(false); // Close menu on mobile
        router.push(`/dashboard/${newId}`);
    };

    const handleFileUpload = async (files: File[]) => {
        try {
            const formData = new FormData();
            formData.append("file", files[0]);
            const res = await api.post("/api/chat/fileUpload", formData);
            toast.success("File uploaded successfully");

            const uploadMsg: Message = {
                id: crypto.randomUUID(),
                role: 'user',
                content: `[Uploaded File: ${files[0].name}]`,
                timestamp: Date.now()
            };

            const updatedMessages = [...messages, uploadMsg];
            setMessages(updatedMessages);
            saveChatToStorage(chatId, updatedMessages);

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
        let currentChatId = chatId;
        if (!currentChatId) {
            currentChatId = crypto.randomUUID();
            router.push(`/dashboard/${currentChatId}`);
        }

        const newMsg: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: inputValue,
            timestamp: Date.now()
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        saveChatToStorage(currentChatId, updatedMessages);
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
            setMessages(finalMessages);
            saveChatToStorage(currentChatId, finalMessages);

        } catch (err) {
            toast.error("Failed to send message");
            console.log(err);
        } finally {
            setLoading(false);
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
                    onClick={handleNewChat}
                    className="flex items-center gap-2 w-full p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all font-medium text-sm"
                >
                    <IconPlus className="w-4 h-4" />
                    New Conversation
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                <h2 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Recent Chats</h2>
                {chats.length === 0 && <p className="text-xs text-neutral-600">No history yet.</p>}
                {chats.map(chat => (
                    <Link
                        key={chat.id}
                        href={`/dashboard/${chat.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer text-sm truncate",
                            chatId === chat.id ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                        )}
                    >
                        <IconMessage className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                            {chat.title || "Untitled Conversation"}
                        </span>
                    </Link>
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
            {/* Desktop Sidebar */}
            <div className="w-80 border-r border-neutral-800 bg-black/20 p-6 flex-col gap-6 hidden md:flex">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
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
                            <div className="bg-neutral-800 rounded-2xl rounded-bl-none px-5 py-4 border border-neutral-700 flex items-center gap-2">
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
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
