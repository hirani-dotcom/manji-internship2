"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/app/lib/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthForm() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailAuth = async () => {
        try {
            setError("");
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setIsOpen(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setIsOpen(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm mb-2">{error}</p>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleEmailAuth}
                        className="w-full bg-blue-700 text-white py-2 rounded mb-2"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>

                    <div className="flex">
                        <button
                        onClick={handleGoogleAuth}
                        className="w-full bg-blue-400 text-white py-2 rounded mb-4"
                    >
                        Continue with Google
                    </button>
                        </div>

                    <p
                        className="text-sm text-center cursor-pointer text-blue-600"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </p>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full bg-gray-300 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}
