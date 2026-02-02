"use client";

import { useEffect, useRef } from "react"; // 1. Import hooks
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type MessageRole = "user" | "ai" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface MessagesLayoutProps {
  messages: Message[];
}

export default function MessagesLayout({ messages }: MessagesLayoutProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-6 pb-8 px-4 md:px-0 max-w-3xl mx-auto">
      {messages.map((message, index) => {
        const role = message.role.toLowerCase();
        const isUser = role === "user";

        return (
          <div
            key={message.id ?? index}
            className={cn(
              "flex w-full gap-4",
              isUser ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm",
                isUser 
                  ? "bg-blue-100 border-blue-200 text-blue-600" 
                  : "bg-neutral-100 border-neutral-200 text-neutral-600"
              )}
            >
              {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div
              className={cn(
                "relative max-w-[85%] px-5 py-3.5 text-sm md:text-base shadow-sm rounded-2xl",
                isUser
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted text-foreground rounded-tl-none border border-border"
              )}
            >
              <ReactMarkdown 
                components={{
                  code({ className, children, ...props }: any) {
                     const match = /language-(\w+)/.exec(className || "");
                     const isInline = !match && !String(children).includes("\n");
                     return isInline 
                       ? <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-[0.9em]" {...props}>{children}</code>
                       : <div className="overflow-x-auto my-3 rounded-md bg-neutral-900 p-3 text-white text-xs md:text-sm"><code className={className} {...props}>{children}</code></div>;
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}