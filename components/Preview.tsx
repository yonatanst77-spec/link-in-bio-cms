"use client";

import { Link } from "@/types";
import { ExternalLink, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/preview.module.css";

interface PreviewProps {
    links: Link[];
}

export default function Preview({ links }: PreviewProps) {
    return (
        <div className={styles.previewContainer}>
            {/* Phone Specific Elements */}
            <div className={styles.notch} />
            <div className={styles.homeIndicator} />

            {/* Screen Content */}
            <div className={`${styles.screenContent} custom-scrollbar`}>
                <div className={styles.profileInfo}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarInner}>
                            <User className="w-12 h-12 text-indigo-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.username}>John Solomon</h2>
                        <p className={styles.bio}>@johnsolomon</p>
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
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={styles.linkItem}
                            >
                                <div className={styles.linkIcon}>
                                    <ExternalLink size={16} />
                                </div>
                                <span className={styles.linkTitle}>{link.title || "Untitled Link"}</span>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
