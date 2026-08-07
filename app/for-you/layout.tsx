import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <div className="fixed left-0 top-0 text-left">
                <Sidebar />
                <div className="fixed max-w-230 right-20 top-5">
                    <Header />
                    <div className="fixed left-60 top-20">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
