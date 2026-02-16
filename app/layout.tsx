import type { Metadata } from "next";
import "./globals.css";

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
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
