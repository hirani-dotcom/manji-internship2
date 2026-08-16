"use client";

import { useParams } from "next/navigation";
import { useTextSize } from "../../context/TextSizeContext";
import { useBooks } from "@/app/context/BookContext";

export default function playerPage() {
    const { textSize } = useTextSize();
    const params = useParams();
    const { bookId } = params;
    const { selectedBook, recommendedBooks, suggestedBooks } = useBooks();
    const book =
        recommendedBooks.find((b) => b.id === bookId) ||
        suggestedBooks.find((b) => b.id === bookId) ||
        selectedBook.find((b) => b.id === bookId);

    if (!book) {
        return <p className="p-6 text-red-600">Book Not Found.</p>;
    }

    const paragraphs = book.summary
        .split(/(?<=[.?!])\s+(?=[A-Z])/g)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <div>
            <div className="max-w-3xl m-auto">
            <div className=" text-2xl font-bold">{book.title}</div>
            <div className="border-b border-gray-300 py-4 mb-4"></div>
            <div className={`${textSize} block p-2 rounded`}>
                {paragraphs.map((p, idx) => (
                    <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
                        {p}
                    </p>
                ))}
            </div>
            </div>
            <footer className="fixed z-10">
                <div className="text-2xl font-bold">
                    <p>Audio Player</p>
                </div>
            </footer>
        </div>
    );
}
