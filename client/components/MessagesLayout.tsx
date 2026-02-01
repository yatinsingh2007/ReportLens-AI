"use client"

import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

import { Message } from "@/app/dashboard/page";

export default function MessagesLayout({ messages }: { messages: Message[] }) {
    return (
    <div>
        {messages.map((message: Message) => (
        <div
        className={cn(
            "flex w-full mb-4",
            message.role === "user" ? "justify-end" : "justify-start"
        )}
    >
        <div
            className={cn(
                "max-w-[95%] md:max-w-[75%] rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-sm md:text-base leading-relaxed shadow-sm",
                message.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-neutral-800 text-neutral-200 rounded-bl-none border border-neutral-700"
            )}
        >
            <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
    </div>
        ))}
    </div>
    );
}