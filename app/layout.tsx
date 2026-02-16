import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import styles from "@/styles/layout.module.css";

export const metadata: Metadata = {
    title: "Link-in-Bio CMS",
    description: "Manage your links with real-time preview",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={styles.body}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className={styles.selection}>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
