import React from "react";
import { IconPlus } from "@tabler/icons-react";

export function WelcomeScreen({
    isDark,
    handleCreateChat,
}: {
    isDark: boolean;
    handleCreateChat: (e?: React.MouseEvent) => Promise<void>;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 opacity-40 ${
                    isDark ? "bg-teal-500/20" : "bg-teal-200/60"
                }`}
            />
            <div
                className={`relative z-10 w-full max-w-md rounded-2xl border p-8 shadow-xl transition-colors ${
                    isDark ? "bg-zinc-900/80 border-zinc-700" : "bg-white border-slate-200"
                }`}
            >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 font-bold text-2xl text-white shadow-lg shadow-teal-500/25">
                    RL
                </div>
                <h2 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    Welcome to ReportLens
                </h2>
                <p className={`text-base leading-relaxed mb-8 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                    Upload medical reports or ask health-related questions. Start a new conversation to begin.
                </p>
                <button
                    onClick={handleCreateChat}
                    className="inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-cyan-600 hover:shadow-teal-500/30 active:scale-[0.98]"
                >
                    <IconPlus className="w-5 h-5" />
                    Start New Conversation
                </button>
            </div>
        </div>
    );
}
