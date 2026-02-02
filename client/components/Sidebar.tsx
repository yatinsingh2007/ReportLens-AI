"use client";

import { ChatRoom, Message } from "@/components/DashboardPage";
import { cn } from "@/lib/utils";
import { IconMessage, IconPlus } from "@tabler/icons-react";
import { FileUpload } from "./ui/file-upload";
import { api } from "@/lib/axios";
import { ChatRoomContext } from "@/context/ChatRoomContext";
import { useContext } from "react";

interface SidebarContentProps {
  handleCreateChat: () => void;
  chatRooms: ChatRoom[];
  setMessages: (messages: Message[]) => void;
  handleFileUpload: (files: File[]) => void;
}

const SidebarContent = ({
  handleCreateChat,
  chatRooms,
  setMessages,
  handleFileUpload,
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

      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-white">
          RL
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          ReportLens
        </h1>
      </div>


      <div className="flex flex-col gap-2">
        <button
          className="flex items-center gap-2 w-full p-3 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all font-medium text-sm"
          onClick={handleCreateChat}
        >
          <IconPlus className="w-4 h-4" />
          New Conversation
        </button>
      </div>


      <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
        <h2 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
          Recent Chats
        </h2>

        {chatRooms.length === 0 && (
          <p className="text-xs text-neutral-600">No history yet.</p>
        )}

        {chatRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer text-sm truncate",
              chatId === chat.id
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
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
        <h2 className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">
          Upload Reports
        </h2>

        <div className="w-full border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50 min-h-[100px] flex flex-col items-center justify-center p-2 mb-4">
          <FileUpload
            onChange={(files) => {
              if (!chatId) return;
              handleFileUpload(files);
            }}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs">
            U
          </div>
          <div className="text-sm">
            <p className="font-medium text-neutral-200">User Account</p>
            <p className="text-xs text-neutral-500">View Profile</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;