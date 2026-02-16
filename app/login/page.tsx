"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Layout, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Invalid credentials. Try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800">
                <div className="text-center">
                    <div className="inline-flex p-3 bg-indigo-600 rounded-xl mb-4">
                        <Layout className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                        Secure access to your Link-in-Bio CMS
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : (
                            <span className="flex items-center gap-2">
                                Continue to Admin <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 dark:text-zinc-600">
                    Username: John • Password: Admin@1234
                </p>
            </div>
        </div>
    );
}
