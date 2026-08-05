"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/app/lib/firebase";

type AuthMode = "signin" | "signup" | "forgot";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required.");
    if (mode !== "forgot" && !password.trim()) return setError("Password is required.");

    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === "signup") {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        // Save user profile in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
          name: userCred.user.name || "",
          email: userCred.user.email,
          createdAt: new Date(),
        });
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userDoc);
      if (!docSnap.exists()) {
        await setDoc(userDoc, {
          email: result.user.email,
          createdAt: new Date(),
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {mode === "signin" && "Sign In"}
        {mode === "signup" && "Sign Up"}
        {mode === "forgot" && "Reset Password"}
      </h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        {mode !== "forgot" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        )}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "signin"
            ? "Sign In"
            : mode === "signup"
            ? "Sign Up"
            : "Send Reset Link"}
        </button>
      </form>

      {mode === "signin" && (
        <>
          <hr style={{ margin: "15px 0" }} />
          <button
            style={{ ...styles.button, background: "#db4437" }}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </button>
        </>
      )}

      <div style={styles.links}>
        {mode === "signin" && (
          <>
            <button style={styles.linkBtn} onClick={() => setMode("signup")}>
              Create an account
            </button>
            <button style={styles.linkBtn} onClick={() => setMode("forgot")}>
              Forgot password?
            </button>
          </>
        )}
        {mode === "signup" && (
          <button style={styles.linkBtn} onClick={() => setMode("signin")}>
            Already have an account? Sign In
          </button>
        )}
        {mode === "forgot" && (
          <button style={styles.linkBtn} onClick={() => setMode("signin")}>
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "350px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
  title: { textAlign: "center" },
  error: { color: "red", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  links: { marginTop: "10px", textAlign: "center" },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#0070f3",
    cursor: "pointer",
    display: "block",
    margin: "5px auto",
  },
};

export default AuthForm;