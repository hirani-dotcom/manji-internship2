"use client";

import { Roboto, Roboto_Condensed } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import clsx from "clsx";
import { AuthProvider } from "../context/AuthContext";

const robotoSans = Roboto({
    variable: "--font-robot-sans",
    subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto_condensed",
    subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isOpen } = useSidebar();

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content wrapper */}
            <div
                className={clsx(
                    "flex flex-col flex-1 transition-all duration-300",
                    // On desktop, shift when sidebar is open
                    // On mobile, no margin when sidebar is closed
                    isOpen ? "ml-56" : "ml-0"
                )}
            >
                <div>
                {/* Header */}
                <Header />
                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto p-4 lg:ml-56">{children}</main>
                </div>
            </div>
        </div>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
            </AuthProvider>
        </SidebarProvider>
    );
}
