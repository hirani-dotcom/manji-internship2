'use client';

import React, { useState } from 'react';
import {
    MdOutlineHome,
    MdOutlineMenu,
    MdOutlineClose,
    MdBookmarkBorder,
    MdSearch,
    MdSettings,
    MdOutlineHelpOutline,
} from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import '../app/globals.css'
import { useSidebar } from '@/app/for-you/SidebarContext';

export default function Header() {

  
  const { open } = useSidebar();

  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-white shadow z-30 flex items-center px-4">
      {/* Burger menu for mobile */}
      <button
        className="lg:hidden mr-4"
        onClick={open}
        aria-label="Open menu"
      >
        <MdOutlineMenu className="h-6 w-6" />
      </button>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 border rounded px-3 py-1"
      />
    </header>
  );


  // const [query, setQuery] = useState('');

  // return (
  //   <div className="bg-white max-w-230 p-4 flex justify-between items-center">
  //     <div className="relative flex items-center left-5">
  //       <input
  //         type="text"
  //         placeholder="Search..."
  //         value={query}
  //         onChange={(e) => setQuery(e.target.value)}
  //         className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //       />
  //       <FaMagnifyingGlass className='absolute right-2' />
  //     </div>
  //   </div>
  // );
}