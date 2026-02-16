"use client";

import { useState, useEffect } from "react";
import { Link } from "@/types";
import { ExternalLink, User, Lock, Layout } from "lucide-react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/page.module.css";

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
        <div className={styles.container}>
            {/* Header / Nav */}
            <nav className={styles.nav}>
                <NextLink href="/" className={styles.logoLink}>
                    <Layout className="w-5 h-5 text-white" />
                </NextLink>
                <NextLink
                    href="/admin"
                    className={styles.adminLink}
                >
                    <Lock size={12} />
                    Admin Login
                </NextLink>
            </nav>

            <main className={styles.main}>
                <div className={styles.profileHeader}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={styles.avatarWrapper}
                    >
                        <div className={styles.avatarInner}>
                            <User className="w-12 h-12 text-indigo-600" />
                        </div>
                    </motion.div>
                    <div>
                        <h1 className={styles.profileTitle}>John Solomon</h1>
                        <p className={styles.profileHandle}>@johnsolomon • Tech Enthusiast</p>
                    </div>
                </div>

                <div className={styles.linksList}>
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
                                className={styles.linkItem}
                            >
                                <div className={styles.linkContent}>
                                    <div className={styles.iconBox}>
                                        <ExternalLink size={20} />
                                    </div>
                                    <span className={styles.linkText}>{link.title || "Untitled Link"}</span>
                                </div>
                                <ArrowRightIcon className={styles.arrowIcon} />
                            </motion.a>
                        ))}
                    </AnimatePresence>

                    {links.length === 0 && (
                        <div className={styles.emptyState}>
                            <p style={{ color: "var(--zinc-400)", fontStyle: "italic" }}>This profile has no links yet.</p>
                        </div>
                    )}
                </div>

                <footer className={styles.footer}>
                    <p className={styles.footerText}>
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
