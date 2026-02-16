"use client";

import { Link } from "@/types";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { GripVertical, Trash2, Plus, ExternalLink, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorProps {
    links: Link[];
    setLinks: (links: Link[]) => void;
}

export default function Editor({ links, setLinks }: EditorProps) {
    const addLink = () => {
        const newLink: Link = {
            id: Date.now().toString(),
            title: "New Link",
            url: "https://",
            icon: "link",
        };
        setLinks([...links, newLink]);
    };

    const updateLink = (id: string, field: keyof Link, value: string) => {
        setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
    };

    const deleteLink = (id: string) => {
        setLinks(links.filter((link) => link.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Manage Links</h2>
                </div>
                <button
                    onClick={addLink}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Link
                </button>
            </div>

            <Reorder.Group
                axis="y"
                values={links}
                onReorder={setLinks}
                className="space-y-3"
            >
                <AnimatePresence mode="popLayout">
                    {links.map((link) => (
                        <Reorder.Item
                            key={link.id}
                            value={link}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-[#111] p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4 transition-shadow hover:shadow-md"
                        >
                            <div className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mt-1">
                                <GripVertical className="w-5 h-5" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                    placeholder="Link Title"
                                    className="w-full text-sm font-semibold bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-2 group/input">
                                    <LinkIcon className="w-3.5 h-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                        placeholder="URL"
                                        className="w-full text-xs text-indigo-600 dark:text-indigo-400 bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400"
                                    />
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover/input:opacity-100 transition-opacity">
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 hover:text-indigo-600" />
                                    </a>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteLink(link.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete Link"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            {links.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    <p className="text-gray-500 text-sm">No links added yet. Click "Add Link" to get started.</p>
                </div>
            )}
        </div>
    );
}
