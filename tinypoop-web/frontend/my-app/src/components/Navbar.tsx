// components/NavBar.tsx
import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-100 p-4 rounded-md">
      <div className="space-x-4">
        <a href="#" className="text-blue-700 font-semibold">Dashboard</a>
        <a href="#" className="text-gray-700">Teams</a>
        <a href="#" className="text-gray-700">Templates</a>
        <a href="#" className="text-gray-700">Archive</a>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search boards..."
          className="border rounded px-2 py-1"
        />
        <span className="text-xl">👤</span>
      </div>
    </nav>
  );
};

export default NavBar;