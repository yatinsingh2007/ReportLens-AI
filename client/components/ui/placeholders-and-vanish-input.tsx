"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCanvasAnimation } from "@/hooks/useCanvasAnimation";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  isDark = true,
  disableSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isDark?: boolean;
  disableSubmit?: boolean;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  
  const { canvasRef, draw, triggerAnimation, animating } = useCanvasAnimation(inputRef);

  useEffect(() => {
    draw(value);
  }, [value, draw]);

  const vanishAndSubmit = () => {
    triggerAnimation(value, () => {
      setValue("");
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>     {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
      onSubmit && onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };
  const formBg = isDark
    ? "bg-zinc-800 border border-zinc-600 shadow-lg shadow-black/20"
    : "bg-white border border-slate-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]"
  const formBgFilled = value && (isDark ? "bg-zinc-700" : "bg-slate-50")
  const inputText = isDark ? "text-zinc-100 placeholder:text-zinc-500" : "text-slate-900 placeholder:text-slate-500"
  const submitBtn = isDark
    ? "disabled:bg-zinc-700 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white"
    : "disabled:bg-slate-100 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white"
  const placeholderText = isDark ? "text-zinc-500" : "text-slate-500"

  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto h-12 rounded-full overflow-hidden transition duration-200",
        formBg,
        formBgFilled
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter pr-20",
          isDark ? "invert-0" : "invert",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          inputText,
          animating && "text-transparent"
        )}
      />

      <button
        disabled={disableSubmit !== undefined ? disableSubmit : !value}
        type="submit"
        className={cn(
          "absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full transition duration-200 flex items-center justify-center",
          submitBtn
        )}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className={cn("text-sm sm:text-base font-normal pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate", placeholderText)}
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
