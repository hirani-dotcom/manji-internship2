"use client";

import { useBooks } from "@/app/context/BookContext";
import { useAuth } from "@/app/context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FaRegStar, FaRegClock } from "react-icons/fa";
import TimeDisplay from "../../components/TimeDisplay";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

export default function Recommended() {
    const { user } = useAuth();
    const { suggestedBooks, loading, error } = useBooks();
    const router = useRouter();

    if (loading) return <p className="text-center py-4">Loading books...</p>;
    if (error)
        return <p className="text-center py-4 text-red-500">Error: {error}</p>;
    if (!suggestedBooks || suggestedBooks.length === 0)
        return <p className="text-center py-4">No books found.</p>;

    const handleBookClick = (bookId) => {
        router.push(`/for-you/book/${bookId}`);
    };

    const isPremiumUser = user?.subscribed === "Premium Plus";

    return (
        <div className="mt-8">
            <div className="max-w-250">
                <div className="mt-10 text-left text-2xl font-bold mb-1">
                    Suggested For You
                    <p className="text-left text-sm font-normal mb-8">
                        Browse these books
                    </p>
                    <div className="relative w-full">
                        <button
                            className="sug-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 hidden md:flex"
                            aria-label="Previous"
                        >
                            ◀
                        </button>
                        <button
                            className="sug-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 hidden md:flex"
                            aria-label="Next"
                        >
                            ▶
                        </button>

                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={16}
                            loop={true}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: ".sug-button-next",
                                prevEl: ".sug-button-prev",
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            className="mb-16"
                        >
                            {suggestedBooks.map((book, index) => {
                                const isPremiumBook = book.subscriptionRequired;
                                const isLocked =
                                    isPremiumBook && !isPremiumUser;

                                if (isLocked) {
                                    return (
                                        <SwiperSlide
                                            key={book.id || index}
                                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-pulse select-none flex flex-col justify-between"
                                        >
                                            <Link href={"/choose-plan"}>
                                                <div>
                                                    {/* Premium Content Badge */}
                                                    <div className="flex justify-end">
                                                        <span className="bg-gray-300 text-gray-600 text-[10px] uppercase tracking-wider font-bold rounded-full px-2 py-0.5">
                                                            Premium Content
                                                        </span>
                                                    </div>

                                                    {/* Image Placeholder */}
                                                    <div className="mt-2 h-36 w-full bg-gray-300 rounded flex items-center justify-center">
                                                        <span className="text-xl text-gray-400">
                                                            🔒
                                                        </span>
                                                    </div>

                                                    {/* Text Placeholders */}
                                                    <div className="mt-4 h-4 w-3/4 bg-gray-300 rounded text-xs"></div>
                                                    <div className="mt-2 p-1 w-3/4 bg-green-300 rounded text-sm">
                                                        Click to buy plan
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                }

                                return (
                                    <SwiperSlide
                                        key={book.id || index}
                                        onClick={() => handleBookClick(book.id)}
                                        className="bg-gray-50 rounded-lg shadow p-4 transition-transform ease-in-out duration-300 hover:scale-[1.02] min-w-50 "
                                    >
                                        <div className="text-right">
                                            {book.subscriptionRequired ? (
                                                <button className="bg-black text-white right-0 text-sm rounded-full pr-1 pl-1 font-medium">
                                                    Premium
                                                </button>
                                            ) : (
                                                <button className="text-white text-sm rounded-full p-1 "></button>
                                            )}
                                        </div>
                                        <div className="mt-2 text-left">
                                            <img
                                                src={book.imageLink}
                                                alt={book.title}
                                                className="w-full h-40 object-contain rounded"
                                            />
                                            <p className="text-lg mt-1">
                                                {book.title}
                                            </p>
                                            <p className="mt-0.5 text-base font-normal">
                                                {book.author}
                                            </p>
                                            <p className="mt-0.5 text-sm font-normal italic">
                                                {book.subTitle}
                                            </p>
                                            <div className="flex space-x-4 font-normal text-sm mt-0.5">
                                                <div>
                                                    <FaRegClock className="inline" />{" "}
                                                    <TimeDisplay
                                                        seconds={
                                                            book.audioLink
                                                                .length
                                                        }
                                                    />
                                                </div>
                                                <div className="">
                                                    {" "}
                                                    <FaRegStar className="inline" />{" "}
                                                    {book.averageRating}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
