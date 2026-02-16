"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "@/types";
import { Smartphone, Layout, User, LogOut } from "lucide-react";

export default function Home() {
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
        <main className="flex h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
            {/* Left Side: Editor */}
            <section className="flex-1 h-full overflow-y-auto border-r border-gray-200 dark:border-zinc-800 p-8 pt-6">
                <div className="max-w-2xl mx-auto space-y-8">
                    <header className="flex items-center justify-between sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 z-20">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
                                <Layout className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">Admin <span className="text-indigo-600">Panel</span></h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <div className="h-6 w-[1px] bg-gray-200 dark:bg-zinc-800 mx-1" />
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                                title="Sign Out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </header>

                    <div className="space-y-6">
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-lg font-semibold">Profile Settings</h2>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-500 italic">Profile customization coming soon...</p>
                            </div>
                        </div>

                        <Editor links={links} setLinks={setLinks} />
                    </div>
                </div>
            </section>

            {/* Right Side: Preview */}
            <section className="hidden lg:flex flex-1 h-full items-center justify-center bg-gray-100 dark:bg-[#111] border-l border-gray-200 dark:border-gray-800">
                <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm font-medium text-gray-400">
                        <Smartphone className="w-4 h-4" />
                        Live Preview
                    </div>
                    <Preview links={links} />
                </div>
            </section>
        </main>
    );
}
