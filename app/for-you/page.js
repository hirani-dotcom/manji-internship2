"use client";

import { useState } from "react";
import { FaMagnifyingGlass, FaRegBookmark, FaPencil } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { Signout } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAuth();
console.log(user);

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar (desktop) */}
            <aside className="hidden md:fixed md:top-0 md:left-0 md:h-full md:w-56 md:bg-gray-100 md:text-gray-900 md:p-4 md:block">
                <img src="/logo.png" alt="Logo" className="mb-8" />
                <ul className="space-y-8">
                    <li>
                        <a href="#" className="hover:underline">
                            <IoHomeOutline className="inline mr-2" /> For You
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">
                            <FaRegBookmark className="inline mr-2" /> My Library
                        </a>
                    </li>
                    <li>
                        <a href="#" className="cursor-not-allowed">
                            <FaPencil className="inline mr-2" /> Highlights
                        </a>
                    </li>
                    <li>
                        <a href="#" className="cursor-not-allowed">
                            <FaMagnifyingGlass className="inline mr-2" /> Search
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={() => SignOut(auth)}>Logout</a>
                    </li>
                </ul>
            </aside>

            {/* Sidebar (mobile overlay) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay background */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Sidebar panel */}
                    <div className="relative z-50 w-56 bg-gray-100 text-gray-700 p-4">
                        <button
                            className="mb-4 text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ✕ Close
                        </button>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="hover:underline">
                                    For You
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    My Library
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-not-allowed">
                                    Highlights
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-not-allowed">
                                    Search
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div className="flex-1 md:ml-56">
                {/* Top bar */}
                <header className="sticky top-0 h-20 bg-white shadow p-4 flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 bg-gray-300 text-gray-900 rounded"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <GiHamburgerMenu />
                    </button>

                    {/* Search input */}
                    <div className="fixed right-20">
                        <FaMagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 text-black-100" />
                        <input
                            type="text"
                            placeholder="Search for books"
                            className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {user ? `Hello, ${user.user.displayName}! 
                        ` : "Hello, Guest!"}
                        {user && user.user.photoURL && (
                            <img src={user.user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                        )}
                        <p>Selected Just For You</p>
                        
                    </h1>
                    <p>
                        On desktop, the sidebar is fixed on the left. On mobile,
                        use the menu button to open it as an overlay.
                    </p>
                </main>
            </div>
        </div>
    );
}
