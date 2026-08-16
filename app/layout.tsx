import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "../app/context/BookContext";
import { TextSizeProvider } from "./context/TextSizeContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Summarist Project",
    description: "Advanced Virtual Internship",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
        >
            <body className="flex h-screen scrollbar-auto bg-gray-50">
                <AuthProvider>
                    <BookProvider>
                        <TextSizeProvider>
                            <main className="flex-1 p-6 overflow-y-auto">
                            {children}</main>
                        </TextSizeProvider>
                    </BookProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
