"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "@/styles/theme-toggle.module.css";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.skeleton} />;
    }

    return (
        <div className={styles.container}>
            <button
                onClick={() => setTheme("light")}
                className={`${styles.button} ${theme === "light" ? styles.activeLight : ""}`}
                title="Light Mode"
            >
                <Sun className={styles.icon} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`${styles.button} ${theme === "dark" ? styles.activeDark : ""}`}
                title="Dark Mode"
            >
                <Moon className={styles.icon} />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`${styles.button} ${theme === "system" ? styles.activeSystem : ""}`}
                title="System Theme"
            >
                <Monitor className={styles.icon} />
            </button>
        </div>
    );
}
