"use client";

import { useBooks } from "@/app/context/BookContext";
import { useAuth } from "@/app/context/AuthContext";
import { MdBookmarkBorder, MdOutlineStarBorder } from "react-icons/md";
import { FiClock, FiMic } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useParams } from "next/navigation";
import TimeDisplay from "@/components/TimeDisplay";
import { useSidebar } from "../../../context/SidebarContext";
import clsx from "clsx";
import AddToLibrary from "@/components/AddToLibrary";

export default function BookPage() {
const { isOpen } = useSidebar();
const params = useParams();
const { bookId } = params;
const { user, isSubscribed } = useAuth();
const { selectedBook, recommendedBooks, suggestedBooks } = useBooks();
const book =
    recommendedBooks.find((b) => b.id === bookId) ||
    suggestedBooks.find((b) => b.id === bookId) ||
    selectedBook.find((b) => b.id === bookId);

    if (!book) {
        return <p className="p-6 text-red-600">Book Not Found.</p>;
    }

    return (
        <div className={clsx("flex min-h-screen", )}>
            <div className="flex flex-col flex-1">
                {" "}
                {/* Container */}
                <main className="flex-col max-w-svw m-auto flex gap-4 text-center">
                    <div className="flex flex-row justify-between gap-6">
                        <div className="basis-3/4 text-left">
                            <h1 className="mb-4 font-bold text-3xl">
                                {book.title}
                            </h1>
                            <h2 className="mb-4 font-bold text">
                                {book.author}
                            </h2>
                            <h3 className="mb-4 font-medium text-2xl">
                                {book.subTitle}
                            </h3>
                            <div className="border-t-2 border-gray-200 h-1">
                                <br />
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 text-left mt-4 mb-4 font-bold text-sm">
                                <div>
                                    <MdOutlineStarBorder className="inline" />{" "}
                                    {book.averageRating} ({book.totalRating}{" "}
                                    ratings)
                                </div>
                                <div>
                                    <FiClock className="inline" />{" "}
                                    <TimeDisplay
                                        seconds={book.audioLink.length}
                                    />
                                </div>
                                <div>
                                    <FiMic className="inline" />{" "}
                                    {book.audioLink ? "Audio" : "No Audio"}{" "}
                                    {book.summary ? "& Text" : "No Text"}
                                </div>
                                <div>
                                    <HiOutlineLightBulb className="inline" />{" "}
                                    {book.keyIdeas} Key Ideas
                                </div>
                            </div>
                            <div className="border-t-2 border-gray-200 h-1 mb-4">
                                <br />
                            </div>
                            <div>
                                <button className="bg-black text-white p-4 m-auto rounded-2xl w-30 mr-4">
                                    {" "}
                                    Read{" "}
                                </button>{" "}
                                <button className="bg-black text-white p-4 m-auto rounded-2xl w-30 ml-4">
                                    {" "}
                                    Listen{" "}
                                </button>
                            </div>
                            <div className="pt-4 pb-4 font-bold text-blue-500">
                                <div
                                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                                    <MdBookmarkBorder className="inline"/>
                                    <AddToLibrary book={book}/>
                                </div>
                            </div>
                            <h4 className="font-bold mb-4">What's it about?</h4>
                            <div className="flex gap-4 mb-4">
                                {book.tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-300 rounded-lg p-3 font-semibold text-sm bg-gray-200"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <p>{book.summary}</p>

                            <h4 className="pt-5 pb-2 font-semibold ">
                                {" "}
                                About the author
                            </h4>

                            <p>{book.authorDescription}</p>
                        </div>
                        <div className="basis-1/4">
                            <img
                                className="w-200 mt-1"
                                src={book.imageLink}
                            ></img>
                        </div>
                    </div>
                </main>
                <br />
                <br />
            </div>
        </div>
    );
}
