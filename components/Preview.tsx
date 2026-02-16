"use client";

import { Link } from "@/types";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreviewProps {
    links: Link[];
}

export default function Preview({ links }: PreviewProps) {
    return (
        <div className="relative w-[320px] h-[640px] bg-white dark:bg-zinc-950 rounded-[48px] border-[12px] border-gray-800 dark:border-zinc-900 shadow-2xl overflow-hidden">
            {/* Phone Specific Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-zinc-900 rounded-b-2xl z-10" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 dark:bg-zinc-800 rounded-full z-10" />

            {/* Screen Content */}
            <div className="h-full overflow-y-auto px-6 py-12 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-zinc-950 custom-scrollbar">
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <div className="w-24 h-24 rounded-full bg-indigo-600 p-1 ring-4 ring-indigo-500/20">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-2xl font-bold text-indigo-600">JS</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">John Solomon</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">@johnsolomon • Tech Enthusiast</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform group"
                            >
                                <span className="text-sm font-medium">{link.title || "Untitled"}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>

                {links.length === 0 && (
                    <div className="text-center py-12 opacity-50">
                        <p className="text-xs text-gray-400 italic">No links to show</p>
                    </div>
                )}

                <div className="mt-12 text-center opacity-30">
                    <p className="text-[10px] font-bold tracking-widest uppercase">Link-in-Bio CMS</p>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
        </div>
    );
}
