"use client";

import { useEffect, useState } from "react";
import "../globals.css";
import { useAuth } from "@/app/context/AuthContext";
import { useBooks } from "@/app/context/BookContext";
import { useSidebar } from "../context/SidebarContext";
import Suggested from "../for-you/Suggested";
import Recommended from "../for-you/Recommended";
import Selected from "../for-you/Selected";
import clsx from "clsx";
import { useRouter } from "next/navigation";

function SkeletonCard() {
  return (
    <div className="bg-gray-100 rounded-lg shadow p-4 animate-pulse w-full">
      <div className="flex justify-end"><div className="h-5 w-16 bg-gray-300 rounded-full"></div></div>
      <div className="mt-2 h-40 w-full bg-gray-300 rounded"></div>
      <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
      <div className="mt-2 h-3 w-5/6 bg-gray-300 rounded"></div>
      <div className="mt-3 flex space-x-4">
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function page() {
    const {user} = useAuth();
    const { loading, error } = useBooks();
    const { isOpen, open, close, toggle } = useSidebar();
    const router = useRouter();

    if (error) return <div>Error: {error}</div>;

      if (loading) {
    return (
      <div className={clsx("flex min-h-screen")}>
        <div className="flex flex-col flex-1">
          <main className="flex flex-col max-w-svw m-auto gap-12 p-4 w-full">
            
            {/* Selected Book Skeleton (Single Block Layout) */}
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
              <div className="w-150 h-32 bg-orange-100 rounded-lg"></div>
            </div>

            {/* Recommended Section Carousel Skeletons */}
            <div>
              <div className="h-8 w-56 bg-gray-300 rounded mb-1 animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>

            {/* Suggested Section Carousel Skeletons */}
            <div>
              <div className="h-8 w-44 bg-gray-300 rounded mb-1 animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>

          </main>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  
    return (
        <div className={clsx("flex min-h-screen")}>
            <div className="flex flex-col flex-1">
                {" "}
                {/* Container */}
                <main className="flex flex-col max-w-svw m-auto gap-4">
                    <div>
                        <Selected />
                    </div>
                    <div>
                        <Recommended />
                    </div>
                    <div>
                        <Suggested />
                    </div>
                </main>
            </div>
        </div>
    );
}
