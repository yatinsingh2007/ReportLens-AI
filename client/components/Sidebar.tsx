"use client";

import Link from "next/link";
import { ChatRoom, Message } from "@/components/DashboardPage";
import { cn } from "@/lib/utils";
import { IconMessage, IconPlus, IconUser } from "@tabler/icons-react";
import { Sun, Moon } from "lucide-react";
import { FileUpload } from "./ui/file-upload";
import { api } from "@/lib/axios";
import { ChatRoomContext } from "@/context/ChatRoomContext";
import { useContext } from "react";

interface SidebarContentProps {
  handleCreateChat: () => void;
  chatRooms: ChatRoom[];
  setMessages: (messages: Message[]) => void;
  handleFileUpload: (files: File[]) => void;
  isDark?: boolean;
  toggleTheme?: () => void;
}

const SidebarContent = ({
  handleCreateChat,
  chatRooms,
  setMessages,
  handleFileUpload,
  isDark = true,
  toggleTheme,
}: SidebarContentProps) => {
  const { chatId, setRoomId } = useContext(ChatRoomContext);

  const handleChatClick = async (roomId: string) => {
    try {
      setRoomId(roomId);

      const resp = await api.get<Message[]>(
        `/api/chat/messages/${roomId}`
      );
      setMessages(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <div className="flex items-center gap-2 mb-6">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
          RL
        </div>
        <h1 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          ReportLens AI
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleCreateChat}
          className="flex items-center gap-2 w-full p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white transition-all font-medium text-sm shadow-lg shadow-teal-500/20"
        >
          <IconPlus className="w-4 h-4" />
          New Conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2 min-h-0 mt-6">
        <h2 className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
          Recent Chats
        </h2>
        {chatRooms.length === 0 && (
          <p className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>No history yet.</p>
        )}
        {chatRooms.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => handleChatClick(chat.id)}
            className={cn(
              "flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-left text-sm truncate",
              chatId === chat.id
                ? isDark
                  ? "bg-zinc-700 text-white"
                  : "bg-teal-50 text-teal-800 border border-teal-200"
                : isDark
                  ? "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <IconMessage className="w-4 h-4 shrink-0" />
            <span className="truncate">{new Date(chat.createdAt).toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className={`pt-4 border-t mt-4 ${isDark ? "border-zinc-800" : "border-slate-200"}`}>
        <h2 className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
          Upload Reports
        </h2>
        <div
          className={cn(
            "w-full border border-dashed rounded-xl min-h-[100px] flex flex-col items-center justify-center p-3",
            isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-300 bg-slate-50"
          )}
        >
          <FileUpload
            onChange={(files) => {
              if (!chatId) return;
              handleFileUpload(files);
            }}
          />
        </div>
      </div>

      <div className={`pt-4 border-t mt-4 space-y-2 ${isDark ? "border-zinc-800" : "border-slate-200"}`}>
        {toggleTheme && (
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 p-3 rounded-xl transition-colors text-left",
              isDark ? "hover:bg-zinc-800 text-zinc-200" : "hover:bg-slate-100 text-slate-700"
            )}
            aria-label="Toggle theme"
          >
            <div className={`h-9 w-9 rounded-full flex items-center justify-center ${isDark ? "bg-zinc-700 text-amber-400" : "bg-slate-100 text-slate-600"}`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <div className="text-sm min-w-0">
              <p className={`font-medium truncate ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                {isDark ? "Light mode" : "Dark mode"}
              </p>
              <p className={`text-xs truncate ${isDark ? "text-zinc-500" : "text-slate-500"}`}>Switch theme</p>
            </div>
          </button>
        )}
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-colors",
            isDark ? "hover:bg-zinc-800 text-zinc-200" : "hover:bg-slate-100 text-slate-700"
          )}
        >
          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${isDark ? "bg-zinc-700 text-teal-400" : "bg-teal-100 text-teal-600"}`}>
            <IconUser className="w-4 h-4" />
          </div>
          <div className="text-sm min-w-0">
            <p className={`font-medium truncate ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Account</p>
            <p className={`text-xs truncate ${isDark ? "text-zinc-500" : "text-slate-500"}`}>View profile</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SidebarContent;