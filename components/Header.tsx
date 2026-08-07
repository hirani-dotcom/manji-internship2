'use client';

import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import '../app/globals.css'

export default function Header() {
  const [query, setQuery] = useState('');

  return (
    <div className="bg-white max-w-230 shadow-sm p-4 flex justify-between items-center">
      <div className="relative flex items-center left-5">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaMagnifyingGlass className='absolute right-2' />
      </div>
    </div>
  );
}