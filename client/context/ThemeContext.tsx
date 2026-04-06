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
        const currTheme = localStorage.getItem("theme");
        if (currTheme === "light" || currTheme === "dark") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(currTheme as "light" | "dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        void setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}