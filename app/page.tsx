"use client";

import { useState, useEffect } from "react";
import { Link } from "@/types";
import { ExternalLink, User, Lock, Layout } from "lucide-react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PublicProfile() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedLinks = localStorage.getItem("bio-links");
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        } else {
            setLinks([]);
        }
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
            {/* Header / Nav */}
            <nav className="fixed top-0 w-full p-4 flex justify-between items-center z-50">
                <NextLink href="/" className="inline-flex p-2 bg-indigo-600 rounded-lg shadow-lg">
                    <Layout className="w-5 h-5 text-white" />
                </NextLink>
                <NextLink
                    href="/admin"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-all border border-gray-200 dark:border-zinc-800 shadow-sm"
                >
                    <Lock className="w-3 h-3" />
                    Admin Login
                </NextLink>
            </nav>

            <main className="max-w-xl mx-auto pt-24 pb-12 px-6">
                <div className="flex flex-col items-center text-center space-y-6 mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 p-1.5 shadow-2xl shadow-indigo-500/20"
                    >
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                            <User className="w-12 h-12 text-indigo-600" />
                        </div>
                    </motion.div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">John Solomon</h1>
                        <p className="mt-2 text-gray-500 dark:text-zinc-400 font-medium">@johnsolomon • Tech Enthusiast</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-lg">{link.title || "Untitled Link"}</span>
                                </div>
                                <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </motion.a>
                        ))}
                    </AnimatePresence>

                    {links.length === 0 && (
                        <div className="text-center py-20 opacity-40">
                            <p className="text-gray-400 italic">This profile has no links yet.</p>
                        </div>
                    )}
                </div>

                <footer className="mt-20 text-center">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-zinc-600">
                        Powered by Link-in-Bio CMS
                    </p>
                </footer>
            </main>
        </div>
    );
}

function ArrowRightIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}
