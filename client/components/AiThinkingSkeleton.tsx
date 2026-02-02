"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiThinkingSkeletonProps {
  className?: string;
  isDark?: boolean;
}

export function AiThinkingSkeleton({ className, isDark }: AiThinkingSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        className
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm",
          isDark
            ? "bg-zinc-700 border-zinc-600 text-teal-400"
            : "bg-teal-100 border-teal-200 text-teal-600"
        )}
      >
        <Bot className="w-4 h-4" />
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-2xl rounded-tl-none border shadow-sm overflow-hidden",
          isDark
            ? "bg-zinc-800/80 border-zinc-700"
            : "bg-slate-100 border-slate-200"
        )}
      >
        <div className="px-5 py-4 space-y-3">
          {/* Typing indicator dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-thinking-dot" />
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-thinking-dot" style={{ animationDelay: "0.2s" }} />
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-thinking-dot" style={{ animationDelay: "0.4s" }} />
          </div>

          {/* Shimmer skeleton lines - simulates AI "writing" */}
          <div className="space-y-2 pt-1">
            <div
              className={cn(
                "h-3 rounded-md max-w-[320px] animate-shimmer",
                isDark ? "bg-zinc-700" : "bg-slate-200"
              )}
            />
            <div
              className={cn(
                "h-3 rounded-md max-w-[280px] animate-shimmer",
                isDark ? "bg-zinc-700" : "bg-slate-200"
              )}
            />
            <div
              className={cn(
                "h-3 rounded-md max-w-[240px] animate-shimmer",
                isDark ? "bg-zinc-700" : "bg-slate-200"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
