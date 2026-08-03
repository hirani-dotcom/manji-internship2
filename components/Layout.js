"use client";

/**
 * Layout component with a left sidebar and top search bar.
 * Uses Tailwind CSS for styling.
 */
export default function Layout({ children }) {

  return (
    <div className="object-left flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className="object-left bg-gray-200 shadow-md transition-all duration-300 w-64"
      >
        <div className="object-left flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">
            My App
          </span>
        </div>
        <nav className="p-4 space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-200">
            Dashboard
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">
            Profile
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top search bar */}
        <header className="bg-white shadow p-4 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
