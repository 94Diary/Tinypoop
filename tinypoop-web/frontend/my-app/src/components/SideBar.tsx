// components/SideBar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const baseStyle = "block p-2 rounded transition";

  return (
    <aside className="relative z-10 w-60 h-screen bg-gray-900 p-6 flex flex-col shadow-2xl shadow-black/70">
      
      <div className="space-y-1 ml-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-gray-500/30 text-blue-400 font-semibold"
                : "text-white hover:bg-gray-500/20 rounded-2xl"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/TestUI"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-gray-500/30 text-blue-400 font-semibold"
                : "text-white hover:bg-gray-500/20"
            }`
          }
        >
          UserManagement
        </NavLink>

      </div>
    </aside>
  );
};

export default SideBar;