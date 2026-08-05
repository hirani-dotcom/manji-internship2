"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../../app/context/AuthContext";
import Link from "next/link";
import ForYou from "../ForYou/page";

export default function Login() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Login Page</h1>
            {user ? <ForYou /> : <AuthForm mode="signin" />}
        </div>
    );
}
