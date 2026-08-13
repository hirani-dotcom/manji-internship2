"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useUserStore } from "@/app/store/useUserStore";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // your firebase config

export function useUserStatus() {
  const { user, loading } = useAuth();
  const { isPremium, hasLibraryAccess, setPremium, setLibraryAccess, reset } = useUserStore();

  // Listen to Firestore changes when signed in
  useEffect(() => {
    if (!loading && user) {
      const userRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setPremium(!!data.isPremium);
          setLibraryAccess(!!data.hasLibraryAccess);
        } else {
          // Create default doc if missing
          setDoc(userRef, { isPremium: false, hasLibraryAccess: false });
        }
      });

      return () => unsubscribe();
    } else if (!user) {
      reset();
    }
  }, [user, loading, setPremium, setLibraryAccess, reset]);

  // Update Firestore when toggles are clicked
  const updatePremium = async (value: boolean) => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), { isPremium: value }, { merge: true });
  };

  const updateLibraryAccess = async (value: boolean) => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), { hasLibraryAccess: value }, { merge: true });
  };

  return {
    loading,
    isSignedIn: !!user,
    user,
    isPremium,
    hasLibraryAccess,
    updatePremium,
    updateLibraryAccess,
  };
}
