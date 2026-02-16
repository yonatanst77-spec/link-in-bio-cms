"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse" />;
    }

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
            <button
                onClick={() => setTheme("light")}
                className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "light" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                )}
                title="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "dark" ? "bg-zinc-800 text-indigo-400 shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
                title="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "system" ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-zinc-500"
                )}
                title="System Theme"
            >
                <Monitor className="w-4 h-4" />
            </button>
        </div>
    );
}
