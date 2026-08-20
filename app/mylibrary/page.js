"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    getDocs,
    where,
} from "firebase/firestore";
import { useBooks } from "@/app/context/BookContext";
import Link from "next/link";
import { MdOutlineStarBorder } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import TimeDisplay from "@/components/TimeDisplay";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function MyLibraryPage() {
    const [firestoreBooks, setFirestoreBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Destructure the custom synchronized user data object from context
    const { user } = useAuth();
    const router = useRouter();
    const {
        selectedBook = [],
        recommendedBooks = [],
        suggestedBooks = [],
    } = useBooks();

    // 2. Fetch the library collection based on email query records instead of strict auth UIDs
    useEffect(() => {
        // If the AuthContext hasn't fully loaded the user profile or email yet, wait.
        if (!user || !user.email) return;

        let unsubscribeLibrary = null;

        // Async setup function to locate the correct document ID via email matching
        const setupLibraryListener = async () => {
            try {
                const usersRef = collection(db, "users");
                const qUser = query(usersRef, where("email", "==", user.email));
                const userSnapshot = await getDocs(qUser);

                if (!userSnapshot.empty) {
                    // Grab the active Firestore Document ID (this works regardless of shifting UIDs)
                    const actualDocId = userSnapshot.docs[0].id;

                    const libraryRef = collection(
                        db,
                        "users",
                        actualDocId,
                        "library",
                    );
                    const qLibrary = query(
                        libraryRef,
                        orderBy("addedAt", "desc"),
                    );

                    unsubscribeLibrary = onSnapshot(
                        qLibrary,
                        (snapshot) => {
                            const list = snapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));
                            setFirestoreBooks(list);
                            setLoading(false);
                        },
                        (error) => {
                            console.error("Library snapshot failed:", error);
                            setLoading(false);
                        },
                    );
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error setting up library query:", err);
                setLoading(false);
            }
        };

        setupLibraryListener();

        // Clean up real-time listener when unmounting
        return () => {
            if (unsubscribeLibrary) unsubscribeLibrary();
        };
    }, [user]);

    const hasAccess =
        user &&
        user.subscribed &&
        ["Premium", "Premium Plus"].includes(user.subscribed);

    useEffect(() => {
        // Stop loading state if there's no user to prevent infinite loading screens
        if (user === null) {
            setLoading(false);
        }

        if (!loading && !hasAccess) {
            router.replace("/plan-required");
        }
    }, [hasAccess, loading, router, user]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500 font-medium">
                    Loading your enriched library...
                </p>
            </div>
        );
    }

    if (!hasAccess) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {user?.displayName
                            ? `${user.displayName}'s Library`
                            : "Your Library"}
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
                                (selectedBook?.id === firestoreItem.id
                                    ? selectedBook
                                    : null);

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
                                        {displayBook.imageLink && (
                                            <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-2 relative">
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
                                        <div className="flex flex-row md:flex-col justify-between gap-1 mt-2 text-xs font-semibold text-gray-600">
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
                                            {displayBook?.audioLink?.length >
                                                0 && (
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
