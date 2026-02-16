"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "@/types";
import { Smartphone, Layout, User, LogOut } from "lucide-react";
import styles from "@/styles/admin.module.css";

export default function AdminPage() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    // Load from LocalStorage
    useEffect(() => {
        const savedLinks = localStorage.getItem("bio-links");
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        } else {
            // Default links
            setLinks([
                { id: "1", title: "GitHub", url: "https://github.com", icon: "github" },
                { id: "2", title: "Twitter", url: "https://twitter.com", icon: "twitter" },
            ]);
        }
        setIsLoaded(true);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/login");
        router.refresh();
    };

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("bio-links", JSON.stringify(links));
        }
    }, [links, isLoaded]);

    if (!isLoaded) return null;

    return (
        <main className={styles.main}>
            {/* Left Side: Editor */}
            <section className={styles.editorSection}>
                <div className={styles.editorContent}>
                    <header className={styles.header}>
                        <div className={styles.brand}>
                            <div className={styles.logoBox}>
                                <Layout className={styles.logoIcon} />
                            </div>
                            <h1 className={styles.title}>Admin <span className={styles.titleAccent}>Panel</span></h1>
                        </div>

                        <div className={styles.actions}>
                            <ThemeToggle />
                            <div className={styles.divider} />
                            <button
                                onClick={handleLogout}
                                className={styles.logoutButton}
                                title="Sign Out"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </header>

                    <div className={styles.section}>
                        <div className={styles.settingsCard}>
                            <div className={styles.sectionHeader}>
                                <User className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Profile Settings</h2>
                            </div>
                            <Editor links={links} onChange={setLinks} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Right Side: Preview */}
            <section className={styles.previewSection}>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: "-2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--zinc-400)", fontSize: "0.875rem", fontWeight: "600" }}>
                        <Smartphone size={16} />
                        Mobile Preview
                    </div>
                    <Preview links={links} />
                </div>
            </section>
        </main>
    );
}
