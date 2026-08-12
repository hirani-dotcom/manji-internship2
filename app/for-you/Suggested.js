"use client";

import { useBooks } from "@/app/context/BookContext";
import {
    FaArrowCircleLeft,
    FaArrowCircleRight,
    FaRegStar,
    FaRegClock,
} from "react-icons/fa";
import TimeDisplay from "../../components/TimeDisplay";
import { useRouter } from "next/navigation";
import Carousel from "@/components/Carousel";

export default function Recommended() {
    const { suggestedBooks, loading, error } = useBooks();
    const router = useRouter();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleBookClick = (bookId) => {
        router.push(`/for-you/book/${bookId}`);
    };
    
    const slides = suggestedBooks.map((book) => (
        <div
            key={book.id}
            onClick={() => handleBookClick(book.id)}
            className="p-4 cursor-pointer h-90"
        >
            <div className="gap-4">
                <div className="justify-items-start w-50 h-50 text-right">
                    {book.subscriptionRequired ? (
                        <button className="bg-black text-white text-sm rounded-full pr-1 pl-1 font-medium">
                            Premium
                        </button>
                    ) : (
                        <button className="text-white text-sm rounded-full p-1 ">
                            
                        </button>
                    )}
                    <div className="mt-4 text-left">
                        <img src={book.imageLink} className="w-30 m-auto" />
                        <p className="text-lg ">{book.title}</p>
                        <p className="mt-1 text-base font-normal">{book.author}</p>
                        <p className="mt-1 text-sm font-normal italic">
                            {book.subTitle}
                        </p>
                        <div className="flex space-x-4 font-normal text-sm mt-1">
                            <div>
                                <FaRegClock className="inline" />{" "}
                                <TimeDisplay seconds={book.audioLink.length} />
                            </div>
                            <div className="">
                                {" "}
                                <FaRegStar className="inline" />{" "}
                                {book.averageRating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="mt-8">
            <div className="max-w-250">
                <div className="mt-10 text-left text-2xl font-bold mb-1">
                    Suggested Books
                    <p className="text-left text-sm font-normal mb-8">
                        Browse these books
                    </p>
                    <Carousel slides={slides} />
                </div>
            </div>
        </div>
    );
}
