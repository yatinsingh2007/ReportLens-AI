import React from "react";
import { IconX } from "@tabler/icons-react";
import SidebarContent from "@/components/Sidebar";
import { ChatRoom, Message } from "@/components/DashboardPage";

export function MobileSidebar({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isDark,
    toggleTheme,
    handleCreateChat,
    chatRooms,
    setMessages,
    handleFileUpload,
}: {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (v: boolean) => void;
    isDark: boolean;
    toggleTheme: () => void;
    handleCreateChat: (e?: React.MouseEvent) => Promise<void>;
    chatRooms: ChatRoom[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    handleFileUpload: (files: File[], query?: string) => Promise<void | string>;
}) {
    if (!isMobileMenuOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside
                className={`fixed inset-y-0 left-0 w-[85%] max-w-sm flex flex-col gap-6 p-6 shadow-2xl animate-in slide-in-from-left duration-200 border-r ${
                    isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"
                } justify-between`}
            >
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                        isDark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
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
    );
}
