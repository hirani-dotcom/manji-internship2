"use client";

import { FaPlayCircle } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import { useRouter } from "next/navigation";
import TimeDisplay from "../../components/TimeDisplay";
import Link from "next/link";

export default function Selected() {
    const { selectedBook, error } = useBooks();
    const { user, loading } = useAuth();
    const router = useRouter();

    const isPremiumUser = user?.subscribed === "Premium Plus";

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium text-sm animate-pulse">
                    Loading books...
                </p>
            </div>
        );
    }
    if (error)
        return <p className="text-center py-4 text-red-500">Error: {error}</p>;
    if (!selectedBook || selectedBook.length === 0)
        return <p className="text-center py-4">No books found.</p>;

    const handleBookClick = (bookId) => {
        router.push(`/for-you/book/${bookId}`);
    };

    return (
        <div>
            <h1 className="text-left text-2xl font-bold mb-4">
                Selected Just For You
            </h1>
            <ul className="relative w-full">
                {selectedBook.map((book) => {
                    const isPremiumUser = user?.subscribed === "Premium Plus";
                    return book.subscriptionRequired && !isPremiumUser ? (
                        <div
                            key={book.id}
                            className="w-150 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-600 text-2xl"
                        >
                            <Link href={"choose-plan"}>
                                <div className="flex items-center w-150 h-auto bg-orange-200 gap-4 p-4">
                                    <div className="w-70 text-center animate-pulse">
                                        <div className="mt-4 h-4 bg-gray-300 text-gray-600 text-sm">
                                            Premium Content
                                        </div>
                                        <div className="mt-4 h-4 bg-gray-300 text-gray-600 text-sm">
                                            Requires Premium / Premium Plus
                                        </div>
                                        <div className="mt-4 p-1 bg-green-300 text-gray-600 text-sm">
                                            Click to buy a plan
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-3/4 animate-pulse">
                                        <div className="mt-2 h-36 w-full bg-gray-300 rounded flex items-center justify-center">
                                            <span className="text-xl text-gray-400">
                                                🔒
                                            </span>
                                        </div>
                                        <div>
                                            <p className="mt-4 h-4 w-3/4 bg-gray-300 rounded"></p>
                                            <p className="mt-4 h-4 w-3/4 bg-gray-300 rounded"></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <li
                            key={book.id}
                            className="p-4 cursor-pointer"
                            onClick={() => handleBookClick(book.id)}
                        >
                            <div className="flex justify-between  text-left w-150 h-auto bg-orange-200 gap-4 p-4">
                                <div className="w-70">
                                    <strong>{book.subTitle}</strong>
                                </div>
                                <div className="w-0.5 bg-gray-400"></div>
                                <div className="flex gap-4">
                                    <img
                                        src={book.imageLink}
                                        className="w-40 h-30 object-cover"
                                    />
                                    <div>
                                        <p className="font-black">
                                            <strong>{book.title}</strong>
                                        </p>
                                        <p className="text-sm">{book.author}</p>
                                        <FaPlayCircle className="inline" />{" "}
                                        <TimeDisplay
                                            seconds={book.audioLink.length}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
