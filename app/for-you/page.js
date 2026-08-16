"use client";

import { useState } from "react";
import "../globals.css";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import { useSidebar } from "../context/SidebarContext";
import Suggested from "../for-you/Suggested";
import Recommended from "../for-you/Recommended";
import Selected from "../for-you/Selected";
import clsx from "clsx";

export default function page() {
    const user = useAuth();
    const { loading, error } = useBooks();
    const { isOpen, open, close, toggle } = useSidebar();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={clsx("flex min-h-screen")}>
            <div className="flex flex-col flex-1">
                {" "}
                {/* Container */}
                <main className="flex flex-col max-w-svw m-auto gap-4">
                    <div>
                        <Selected />
                    </div>
                    <div>
                        <Recommended />
                    </div>
                    <div>
                        <Suggested />
                    </div>
                </main>
            </div>
        </div>
    );
}
