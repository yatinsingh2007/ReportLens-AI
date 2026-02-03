"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiThinkingSkeletonProps {
  className?: string;
  isDark?: boolean;
}

export function AiThinkingSkeleton({ className, isDark }: AiThinkingSkeletonProps) {
  const barBg = isDark ? "bg-zinc-600" : "bg-slate-300";

  return (
    <div
      className={cn(
        "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        className
      )}
    >
      <div
        className={cn(
          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm",
          isDark
            ? "bg-zinc-700 border-zinc-600 text-teal-400"
            : "bg-slate-100 border-slate-200 text-teal-600"
        )}
      >
        <Bot className="w-4 h-4" />
      </div>

      <div
        className={cn(
          "max-w-[85%] min-w-[240px] rounded-2xl rounded-tl-none border shadow-sm overflow-hidden",
          isDark
            ? "bg-zinc-800/80 border-zinc-700"
            : "bg-slate-50 border-slate-200"
        )}
      >
        <div className="px-5 py-4 space-y-3">
          {/* Gemini-style: skeleton lines only, varying widths, smooth pulse */}
          <div className="space-y-2.5">
            <div className={cn("h-3 rounded-full w-[92%] animate-gemini-pulse", barBg)} />
            <div className={cn("h-3 rounded-full w-[88%] animate-gemini-pulse", barBg)} style={{ animationDelay: "0.1s" }} />
            <div className={cn("h-3 rounded-full w-[72%] animate-gemini-pulse", barBg)} style={{ animationDelay: "0.2s" }} />
            <div className={cn("h-3 rounded-full w-[56%] animate-gemini-pulse", barBg)} style={{ animationDelay: "0.3s" }} />
            <div className={cn("h-3 rounded-full w-[40%] animate-gemini-pulse", barBg)} style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
