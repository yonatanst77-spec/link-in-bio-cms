"use client";

import { Reorder } from "framer-motion";
import { Trash2, GripVertical, Plus } from "lucide-react";
import { Link } from "@/types";
import styles from "@/styles/editor.module.css";

interface EditorProps {
    links: Link[];
    onChange: (links: Link[]) => void;
}

export default function Editor({ links, onChange }: EditorProps) {
    const addLink = () => {
        const newLink: Link = {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            url: "",
            icon: "link",
        };
        onChange([...links, newLink]);
    };

    const updateLink = (id: string, field: keyof Link, value: string) => {
        const updatedLinks = links.map((link) =>
            link.id === id ? { ...link, [field]: value } : link
        );
        onChange(updatedLinks);
    };

    const removeLink = (id: string) => {
        onChange(links.filter((link) => link.id !== id));
    };

    return (
        <div className={styles.container}>
            <Reorder.Group axis="y" values={links} onReorder={onChange} className={styles.container}>
                {links.map((link) => (
                    <Reorder.Item
                        key={link.id}
                        value={link}
                        className={styles.card}
                    >
                        <button className={styles.grip}>
                            <GripVertical size={20} />
                        </button>

                        <div className={styles.linkInfo}>
                            <div className={styles.inputField}>
                                <label className={styles.label}>Title</label>
                                <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                    placeholder="e.g. GitHub"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputField}>
                                <label className={styles.label}>URL</label>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                    placeholder="https://"
                                    className={styles.urlInput}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => removeLink(link.id)}
                            className={styles.deleteButton}
                        >
                            <Trash2 size={18} />
                        </button>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <button
                onClick={addLink}
                className={styles.addButton}
            >
                <Plus size={20} />
                Add Link
            </button>

            {links.length === 0 && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>No links added yet. Click "Add Link" to get started.</p>
                </div>
            )}
        </div>
    );
}
