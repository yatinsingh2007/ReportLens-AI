"use client"
import { createContext, useState, useEffect } from "react";

interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { }
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme as "light" | "dark");
            }
        } catch {
            console.error("Failed to get theme");
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("theme", theme);
            // Apply dark class to HTML element
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } catch {
            console.error("Failed to save theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}