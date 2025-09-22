import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPaintBrush,
  FaUsers,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
                <aside
            className={`bg-gray-800 ${
                isSidebarOpen ? "w-100" : "w-20" // increased from w-64 to w-80
            } transition-all duration-300 ease-in-out flex flex-col`}
            >

        <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <h1
                className={`font-bangers text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider transition-all duration-300 ${
                !isSidebarOpen ? "text-lg" : "text-4xl"
                }`}
            >
                {isSidebarOpen ? "ArtoG Admin" : "A"}
            </h1>
            </div>


        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-orange-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt className="h-6 w-6" />
            {isSidebarOpen && (
              <span className="ml-4 font-semibold text-3xl">Dashboard</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/sketches"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-orange-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaPaintBrush className="h-6 w-6" />
            {isSidebarOpen && (
              <span className="ml-4 font-semibold text-3xl">Sketches</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/sketches/add"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-orange-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaPlus className="h-6 w-6" />
            {isSidebarOpen && (
              <span className="ml-4 font-semibold text-3xl">Upload Sketch</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-orange-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaUsers className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 font-semibold text-3xl">Users</span>}
          </NavLink>
        </nav>

        <div className="px-4 py-6 border-t border-gray-700 space-y-2">
          <a
            href="/#/"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700"
          >
            <FaSignOutAlt className="h-6 w-6" />
            {isSidebarOpen && (
              <span className="ml-4 font-semibold text-3xl">Logout</span>
            )}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-20 px-8 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* <div className="flex items-center space-x-4">
            <span className="font-semibold">Admin</span>
            <img
              src="https://storage.googleapis.com/pai-images/40f66b5773194a2886ce902773c2b295.jpeg"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
            />
          </div> */}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
