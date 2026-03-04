import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="relative z-10 flex items-center bg-gray-900 px-6 py-3 border-b border-white/20 shadow-lg shadow-black/20">
      
      {/* Left*/}
      <div className="flex items-center">
        <a href="#" className="text-white font-semibold text-lg">
          TinyPoop
        </a>
      </div>

      {/* Center*/}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search boards..."
          className="w-1/2 border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right*/}
      <div className="flex items-center">
        <span className="text-xl cursor-pointer">👤</span>
      </div>

    </nav>
  );
};

export default NavBar;