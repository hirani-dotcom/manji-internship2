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
            router.push("/for-you");
        }
    }, [user, loading, router]);

    if (loading) return <h1 className="text-center text-green-500 pt-200">Logging You In . . . Hold Tight!</h1>;
    

    if (user) return null; 

    return (
        <div>
            <h1>Login Page</h1>            
                <AuthForm mode="signin" />
        </div>
    );
}
