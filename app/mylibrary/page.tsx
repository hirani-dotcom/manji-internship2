"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useBooks } from "@/app/context/BookContext";
import Link from "next/link";
import { MdBookmark, MdOutlineStarBorder } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import TimeDisplay from "@/components/TimeDisplay";

interface SavedBookFirestore {
    id: string;
    title: string;
    author: string;
    imageLink: string;
    averageRating: number;
    audioLink: string;
    addedAt: any;
}

export default function MyLibraryPage() {
    const [firestoreBooks, setFirestoreBooks] = useState<SavedBookFirestore[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser);

    const {
        selectedBook = [],
        recommendedBooks = [],
        suggestedBooks = [],
    } = useBooks();

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (!currentUser) setLoading(false);
        });
        return () => unsubscribeAuth();
    }, []);

    // Fetch simple library records from Firestore
    useEffect(() => {
        if (!user) return;

        const libraryRef = collection(db, "users", user.uid, "library");
        const q = query(libraryRef, orderBy("addedAt", "desc"));

        const unsubscribeLibrary = onSnapshot(
            q,
            (snapshot) => {
                const list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as SavedBookFirestore[];

                setFirestoreBooks(list);
                setLoading(false);
            },
            () => setLoading(false),
        );

        return () => unsubscribeLibrary();
    }, [user]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500 font-medium">
                    Loading your enriched library...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
                <MdBookmark className="text-5xl text-gray-300 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-gray-500">
                    Please log in to view your library.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Library
                    </h1>
                    <p className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
                        {firestoreBooks.length} Items
                    </p>
                </header>

                {firestoreBooks.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                        <p className="text-gray-500 text-lg mb-4">
                            Your library is completely empty.
                        </p>
                        <Link
                            href="/"
                            className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium"
                        >
                            Explore and Add Books
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {firestoreBooks.map((firestoreItem) => {
                            const contextMatch =
                                recommendedBooks.find(
                                    (b) => b.id === firestoreItem.id,
                                ) ||
                                suggestedBooks.find(
                                    (b) => b.id === firestoreItem.id,
                                ) ||
                                // (Array.isArray(selectedBook) ? 
                                selectedBook.find(
                                          (b) => b.id === firestoreItem.id,
                                      )
                                    // : selectedBook?.id === firestoreItem.id
                                    //   ? selectedBook
                                    //   : null);

                            const displayBook = {
                                id: firestoreItem.id,
                                title:
                                    contextMatch?.title || firestoreItem.title,
                                author:
                                    contextMatch?.author ||
                                    firestoreItem.author,
                                imageLink: contextMatch?.imageLink || null,
                                averageRating:
                                    contextMatch?.averageRating || null,
                                summary: contextMatch?.summary || "",
                                audioLink: contextMatch?.audioLink || [],
                            };

                            return (
                                <Link
                                    key={displayBook.id}
                                    href={`/for-you/book/${displayBook.id}`}
                                    className="group bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                                >
                                    <div className="flex flex-col gap-3">
                                        {/* Render cover image if it exists inside Context */}
                                        {displayBook.imageLink && (
                                            <div className="w-full aspect-ratio: 3/4 bg-gray-100 rounded-xl overflow-hidden mb-2 relative">
                                                <img
                                                    src={displayBook.imageLink}
                                                    alt={displayBook.title}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                                {displayBook.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs font-semibold mt-1">
                                                {displayBook.author}
                                            </p>
                                        </div>

                                        <div className="flex flex-row md:flex-col xs:items-center justify-between gap-1 mt-2 text-xs font-semibold text-gray-600">
                                            {displayBook.averageRating && (
                                                <div className="flex items-center gap-1 text-amber-600">
                                                    <MdOutlineStarBorder className="text-sm" />
                                                    <span>
                                                        {
                                                            displayBook.averageRating
                                                        }{" "}
                                                        Average Rating
                                                    </span>
                                                </div>
                                            )}
                                            {displayBook?.audioLink?.length && (
                                                <div className="flex items-center gap-1 text-amber-600">
                                                    <FiClock className="text-sm" />
                                                    <TimeDisplay
                                                        seconds={
                                                            displayBook
                                                                .audioLink
                                                                .length
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-gray-400 mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
                                        <span>Added To Library</span>
                                        <span>
                                            {firestoreItem.addedAt?.toDate
                                                ? firestoreItem.addedAt
                                                      .toDate()
                                                      .toLocaleDateString()
                                                : "Saved"}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
