"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { MdOutlineStarBorder } from "react-icons/md";
import TimeDisplay from "@/components/TimeDisplay";
import AudioDuration from "./AudioDuration";

// Define the interface for the book data structures
interface Book {
    id: string;
    title: string;
    author?: string;
    subTitle?: string;
    imageLink?: string | null;
    averageRating?: number | string | null;
    audioLink?: string | undefined;
}

interface BookCarouselProps {
    title: string;
    subtitle: string;
    books: Book[];
}

export default function BookCarousel({
    title,
    subtitle,
    books,
}: BookCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

    // Fallback check to prevent rendering empty sections
    if (!books || books.length === 0) return null;

    const updateButtonVisibility = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            setShowLeftBtn(scrollLeft > 5);
            setShowRightBtn(scrollLeft < maxScroll - 5);
        }
    };

    useEffect(() => {
        updateButtonVisibility();
        window.addEventListener("resize", updateButtonVisibility);
        return () =>
            window.removeEventListener("resize", updateButtonVisibility);
    }, [books]); // Re-calculate boundaries if books array updates

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const scrollAmount = container.clientWidth;

            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 relative">
            {/* Header Controls Area */}
            <div className="flex justify-between items-center mb-4">
                <div><h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <h3>{subtitle}</h3>
                    </div>

                <div className="flex gap-2 min-h-10.5">
                    {showLeftBtn && (
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 rounded-xl bg-black border border-black hover:bg-gray-50 text-white hover:text-black transition-all shadow-sm cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <FiChevronLeft className="text-xl" />
                        </button>
                    )}

                    {showRightBtn && (
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 rounded-xl bg-black border border-black hover:bg-gray-50 text-white hover:text-black transition-all shadow-sm cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <FiChevronRight className="text-xl" />
                        </button>
                    )}
                </div>
            </div>

            {/* Scrolling Grid */}
            <div
                ref={carouselRef}
                onScroll={updateButtonVisibility}
                /* 
    The Exact Breakdown:
    - Mobile: auto-cols-[calc(100%)]       -> Exactly 1 card visible
    - sm:     auto-cols-[calc(50%-12px)]   -> Exactly 2 cards visible (halves minus partial gap)
    - md:     auto-cols-[calc(33.33%-16px)] -> Exactly 3 cards visible (thirds minus partial gap)
    - lg:     auto-cols-[calc(25%-18px)]    -> Exactly 4 cards visible (quarters minus partial gap)
  */
                className="grid grid-flow-col auto-cols-[calc(100%)] sm:auto-cols-[calc(50%-12px)] md:auto-cols-[calc(33.33%-16px)] lg:auto-cols-[calc(25%-18px)] gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
            >
                {books.map((book) => (
                    <Link
                        key={book.id}
                        href={`/for-you/book/${book.id}`}
                        className="group bg-gray-100 border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden snap-start shrink-0"
                    >
                        <div className="flex flex-col gap-3">
                            {book.imageLink && (
                                <div className="w-full aspect-3/4 bg-gray-300 rounded-xl overflow-hidden mb-2 relative">
                                    <img
                                        src={book.imageLink}
                                        alt={book.title}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            <div>
                                <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                    {book.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-semibold mt-1">
                                    {book.author}
                                </p>
                                <p className="text-black text-xs font-semibold mt-1">
                                    {book.subTitle}
                                </p>
                            </div>

                            {/* Meta metrics mapping */}
                            <div className="flex flex-row md:flex-col  gap-1 mt-2  text-xs font-semibold text-gray-600">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <span>
                                        <MdOutlineStarBorder className="text-sm inline mr-2" />
                                        {book.averageRating}
                                    </span>
                                    <span>
                                        <FiClock className="text-sm inline ml-4 mr-2" />
                                        <AudioDuration
                                            audioUrl={book.audioLink as string}
                                        />
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600"></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
