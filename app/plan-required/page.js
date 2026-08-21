"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/choose-plan");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
            <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Premium Content Access
                </h1>
                <p className="text-gray-600">
                    You are requesting access to premium content, which requires
                    an active subscription. You will now be directed to our
                    subscription page.
                </p>
                <div className="mt-6">
                    <div className="animate-pulse text-sm text-gray-500">
                        Redirecting...
                    </div>
                </div>
            </div>
        </div>
    );
}
