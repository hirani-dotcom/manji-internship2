"use client";

import { FaPlayCircle } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import { useRouter } from "next/navigation";
import TimeDisplay from "../../components/TimeDisplay";

export default function Selected() {
    const { selectedBook, loading, error } = useBooks();
    const user = useAuth();
    const router = useRouter();

    const handleBookClick = (bookId) => {
        router.push(`/for-you/book/${bookId}`);
    }

    return (
        <div>            
            <h1 className="text-left text-2xl font-bold mb-4">
                Selected Just For You
            </h1>
            <ul className="w-full">
                {selectedBook.map((book) => (
                    <li key={book.id} className="p-4 cursor-pointer" onClick={() => handleBookClick(book.id)}>
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
                                    <FaPlayCircle className="inline" /> <TimeDisplay seconds = {book.audioLink.length} />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
