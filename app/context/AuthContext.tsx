"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface AuthContextType {
  user: (User & { subscribed?: string }) | null;
  loading: boolean;
  logout: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);
  const [logout, setLogout] = useState(true);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Listen to Firestore user document for subscription updates
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({
              ...firebaseUser,
              ...docSnap.data(), // Merge Firestore fields like subscription
            });
          } else {
            setUser(firebaseUser); // No Firestore doc yet
          }
          setLoading(false);
          setLogout(false);
        });

        return () => unsubscribeFirestore();
      } else {
        setUser(null);
        setLoading(false);
        setLogout(true);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
