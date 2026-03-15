import React from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function ChatInputArea({
    isDark,
    selectedFile,
    handleRemoveStagedFile,
    triggerFileInput,
    fileInputRef,
    handleFileSelect,
    inputValue,
    handleInputChange,
    handleSubmit,
    placeholders,
}: {
    isDark: boolean;
    selectedFile: File | null;
    handleRemoveStagedFile: () => void;
    triggerFileInput: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    placeholders: string[];
}) {
    return (
        <div
            className={`shrink-0 p-4 md:p-6 border-t flex flex-col gap-2 ${
                isDark ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
            }`}
        >
            {selectedFile && (
                <div className={`mx-auto w-full max-w-3xl flex items-center justify-between p-3 rounded-xl border ${isDark ? "bg-zinc-900 border-zinc-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`p-2 rounded-lg ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}>
                            <IconPlus className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-medium truncate ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                            {selectedFile.name}
                        </span>
                    </div>
                    <button
                        onClick={handleRemoveStagedFile}
                        className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"}`}
                    >
                        <IconX className="w-4 h-4" />
                    </button>
                </div>
            )}
            <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
                <button
                    onClick={triggerFileInput}
                    className={`shrink-0 p-3 rounded-xl border transition-all md:hidden ${
                        isDark
                            ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                            : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                    }`}
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
                <div className="flex-1 min-w-0 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className={`hidden md:flex shrink-0 p-3 rounded-full border transition-all ${
                            isDark
                                ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                        aria-label="Upload file"
                    >
                        <IconPlus className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            isDark={isDark}
                            disableSubmit={!inputValue.trim() && !selectedFile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
