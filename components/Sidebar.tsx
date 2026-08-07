"use client";

import { useState } from "react";
import { MdOutlineHome, MdOutlineMenu, MdOutlineClose, MdBookmarkBorder, MdSearch, MdSettings, MdOutlineHelpOutline, } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { TfiMarkerAlt } from "react-icons/tfi";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top bar with burger icon (only on small screens) */}
      <div className="md:hidden flex items-center p-4 bg-gray-200 text-gray-800">
        <button
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="focus:outline-none"
        >
          <MdOutlineMenu className="h-8 w-8" />
        </button>
        <h1 className="ml-4 text-lg font-semibold"></h1>
      </div>

      {/* Sidebar for medium+ screens */}
      <aside className="hidden md:flex md:flex-col w-56 bg-gray-200 text-gray-800 h-screen p-4">
        <img src='/logo.png' alt='logo' className="mb-8"/>
        <nav className="font-bold space-y-2">
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><MdOutlineHome className="inline text-2xl" /> For You</a>
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><MdBookmarkBorder className="inline text-2xl" /> My Library</a>
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><TfiMarkerAlt className="inline text-2xl" /> Highlights</a>
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><MdSearch className="inline text-2xl" /> Search</a>
        </nav>
        <footer className="fixed bottom-20 font-bold space-y-2 ">
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><MdSettings className="inline text-2xl" /> Settings</a>
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><MdOutlineHelpOutline className="inline text-2xl" /> Help & Support</a>
          <a href="#" className="block hover:bg-gray-400 p-2 rounded"><IoExitOutline className="inline text-2xl" /> {user ? `Log Out, ${user.user?.displayName}` : "Log In"}</a>
        </footer>
      </aside>

      {/* Overlay sidebar for small screens */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar panel */}
          <div className="relative bg-gray-800 text-white w-64 h-screen p-4 z-50">
            <button
              onClick={toggleSidebar}
              aria-label="Close menu"
              className="absolute top-4 right-4 focus:outline-none"
            >
              <MdOutlineClose className="h-8 w-8" />
            </button>
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <nav className="space-y-2">
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">Home</a>
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">About</a>
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">Contact</a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
