"use client";

import { useState } from "react";
import "../globals.css";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import Suggested from "../for-you/Suggested";
import Recommended from "../for-you/Recommended";
import Selected from "../for-you/Selected";
import Footer from "@/app/for-you/Footer";

export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAuth();
    const { books, recommendedBooks, loading, error, refreshBooks } =
        useBooks();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex h-screen fixed left-56 top-20">
            {/* Page content */}
            <div className="flex flex-col flex-1">
            <main className="flex-1 overflow-y-auto p-6 text-center space-y-6 bg-white scrollbar-none">
                <div>
                    <Selected />
                </div>
                <div>
                    <Recommended />
                </div>
                <div>
                    <Suggested />
                </div>
                <br />
                <br />
                <br />
                <Footer />
            </main>
            </div>
        </div>
    );
}
