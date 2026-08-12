"use client";

import { MdOutlineMenu } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "../app/globals.css";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState, useRef, useEffect } from "react";
import { useBooks } from "@/app/context/BookContext";
import TimeDisplay from "./TimeDisplay";
import { useRouter } from "next/navigation";

// debounce function
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export default function Header() {
    const { selectedBook, suggestedBooks, recommendedBooks, loading, error } =
        useBooks();
    const [query, setQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef(null);
    const { open, close } = useSidebar();
    const router = useRouter();

    // Debounced filtering
    const debouncedFilter = debounce((searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredBooks([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = searchTerm.toLowerCase();

        const allBooks = [
            ...(selectedBook || {}),
            ...(suggestedBooks || []),
            ...(recommendedBooks || {}),
        ];

        const matches = allBooks.filter((book) => {
            const searchableText = [
                book.title,
                book.subTitle,
                book.summary,
                book.authorDescription,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(lowerQuery);
        });
        setFilteredBooks(matches);
        setIsOpen(true);
    }, 300);

    // Trigger filtering when query changes
    useEffect(() => {
        debouncedFilter(query);
    }, [query, selectedBook || recommendedBooks || suggestedBooks]);

    // Close dropdown & clear search bar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setQuery("");
                setFilteredBooks({});
                setIsOpen(false); 
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBookClick = (bookId) => {
        router.push(`/for-you/book/${bookId}`);
    };

    if (loading) return <p className="text-center mt-6">Loading books...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-xl mx-auto p-2 relative" ref={containerRef}>
            <div className="flex relative">
                {/* Search Input */}
                <button className="lg:hidden ml-2" onClick={open}>
                    <MdOutlineMenu className="h-6 w-6" />
                </button>
                <input
                    type="text"
                    placeholder="Search for a book..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
                {query.length > 0 ? (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setFilteredBooks([]);
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-600"
                    >
                        ✕
                    </button>
                ) : (
                    <HiMagnifyingGlass className="inline absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-600" />
                )}
            </div>

            {/* Dropdown Overlay */}
            {isOpen && filteredBooks.length > 0 && (
                <div className="absolute w-100 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {filteredBooks.map((book, idx) => (
                        <div
                            key={book.id}
                            className={`flex px-4 py-2 items-center cursor-pointer ${
                                idx === activeIndex
                                    ? "bg-blue-100"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleBookClick(book.id)}
                        >
                            <div>
                                <img
                                    src={book.imageLink}
                                    className="max-w-25 p-2"
                                />
                            </div>
                            <div className="flex-1 items-center">
                                <div className="font-semibold">
                                    {book.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                    By: {book.author}
                                </div>
                                <div className="text-sm">
                                    <FiClock className="inline" />{" "}
                                    <TimeDisplay
                                        seconds={book.audioLink.length}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No results */}
            {isOpen && filteredBooks.length === 0 && query.trim() && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-gray-500 z-50">
                    No books found.
                </div>
            )}
        </div>
    );
}
