"use client";

import { useState } from "react";
import "../globals.css";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import Recommended from "../for-you/Recommended";
import Selected from "../for-you/Selected";

export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAuth();
    const { books, recommendedBooks, loading, error, refreshBooks } =
        useBooks();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex max-h-screen max-w-screen">
            {/* Page content */}
            <main className="row p-6 text-center">
                <div>
                    <Selected />
                </div>
                <div>
                    <Recommended />
                </div>
            </main>
        </div>
    );
}
