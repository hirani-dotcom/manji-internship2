"use client";

import React, { useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/for-you");
            setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
        }
    }, [user, router]);


    return (
        <div>
            <h1>Login Page</h1>            
                <AuthForm />
        </div>
    );
}
