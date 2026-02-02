"use client"
import { createContext, useState, useEffect } from "react";

export interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const currTheme  = localStorage.getItem("theme");
        if (currTheme == "light" || currTheme == "dark"){
            setTheme(currTheme)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme" , theme)
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