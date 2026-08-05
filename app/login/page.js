"use client";

import React, { useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "../../app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user !== undefined) {
            console.log(`User is logged in, redirecting ${user.email} to /for-you`);
            router.push("/for-you");
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading Login Page. . .</p>;
    

    if (user) return null; 

    return (
        <div>
            <h1>Login Page</h1>            
                <AuthForm mode="signin" />
        </div>
    );
}
