"use client";

import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc, deleteDoc, onSnapshot, writeBatch } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function AddToLibrary({ book }) {
  const [loading, setLoading] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [checking, setChecking] = useState(true);

  // Listen to real-time library status for the authenticated user
  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !book?.id) {
      setChecking(false);
      return;
    }

    const docRef = doc(db, "users", user.uid, "library", book.id);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      setIsInLibrary(docSnap.exists());
      setChecking(false);
    });

    return () => unsubscribe();
  }, [book?.id]);

  if (!book || !book.id || checking) return null;

  const handleToggleLibrary = async (e) => {
    e.stopPropagation();
    
    const user = auth.currentUser;
    if (!user) return alert("You must be signed in.");

    setLoading(true);

    // References for both documents
    const userRef = doc(db, "users", user.uid);
    const bookRef = doc(db, "users", user.uid, "library", book.id);

    try {
      if (isInLibrary) {
        // Remove item from library sub-collection
        await deleteDoc(bookRef);
        alert("Removed from your library.");
      } else {
        // Use an atomic batch to ensure BOTH user document and book document succeed together
        const batch = writeBatch(db);

        // 1. Create or update the root user record if missing (does not overwrite existing fields)
        batch.set(userRef, {
          email: user.email || "",
          createdAt: new Date(), // This will only merge or update if not set, or you can use serverTimestamp()
          lastActive: new Date()
        }, { merge: true });

        // 2. Create the book sub-collection record
        batch.set(bookRef, {
          title: book.title || "Untitled Book",
          author: book.author || "Unknown Author",
          addedAt: new Date(),
        }, { merge: true });

        // Commit both operations together
        await batch.commit();
        alert("Added to your library!");
      }
    } catch (err) {
      console.error("Firestore Transaction Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLibrary}
      disabled={loading}
      className="text-white hover:underline cursor-pointer disabled:opacity-50 font-bold ml-2"
    >
      {loading ? "Processing..." : isInLibrary ? "Remove From My Library" : "Add To My Library"}
    </button>
  );
}