"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Bot, User, FileText } from "lucide-react";

type MessageRole = "user" | "ai" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  filePresent?: boolean;
}

interface MessagesLayoutProps {
  messages: Message[];
  isDark?: boolean;
}

export default function MessagesLayout({ messages, isDark = true }: MessagesLayoutProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const list = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  return (
    <div className="flex flex-col space-y-6 pb-8 px-4 md:px-0 max-w-3xl mx-auto">
      {list.map((message, index) => {
        const role = message.role.toLowerCase();
        const isUser = role === "user";
        const isFile = !!message.filePresent;

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
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm",
                isUser
                  ? "bg-teal-100 border-teal-200 text-teal-600 dark:bg-teal-900/50 dark:border-teal-700 dark:text-teal-400"
                  : isDark
                    ? "bg-zinc-700 border-zinc-600 text-teal-400"
                    : "bg-slate-100 border-slate-200 text-teal-600"
              )}
            >
              {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {isUser && isFile ? (
              <div
                className={cn(
                  "relative max-w-[85%] px-4 py-3 shadow-sm rounded-2xl rounded-tr-none flex items-center gap-3 border",
                  isDark
                    ? "bg-zinc-800/80 border-zinc-700 text-zinc-100"
                    : "bg-white border-slate-200 text-slate-900"
                )}
              >
                <div
                  className={cn(
                    "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                    isDark ? "bg-teal-500/20 text-teal-400" : "bg-teal-100 text-teal-600"
                  )}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium opacity-80">Uploaded file</p>
                  <p className="text-sm font-medium truncate" title={message.content}>
                    {message.content}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "relative max-w-[85%] px-5 py-3.5 text-sm md:text-base shadow-sm rounded-2xl",
                  isUser
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-tr-none"
                    : isDark
                      ? "bg-zinc-800/80 text-zinc-100 rounded-tl-none border border-zinc-700"
                      : "bg-white text-slate-900 rounded-tl-none border border-slate-200"
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
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}