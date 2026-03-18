import React from "react";
import { NavLink } from "react-router-dom";
import type { AuthUser } from "../types/auth";

interface SideBarProps {
  currentUser: AuthUser;
}

const SideBar: React.FC<SideBarProps> = ({ currentUser }) => {
  const baseStyle = "block p-2 rounded transition";
  const role = currentUser.role.toLowerCase();

  return (
    <aside className="relative z-10 w-60 h-screen bg-gray-900 p-6 flex flex-col shadow-2xl shadow-black/70">
      
      <div className="space-y-1 ml-2">

        <NavLink
          to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-gray-500/30 text-blue-400 font-semibold"
                : "text-white hover:bg-gray-500/20 rounded-2xl"
            }`
          }
        >
          {role === "admin" ? "My PlaceManagement" : "PlaceManagement"}
        </NavLink>

        {role === "manager" && (
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
        )}

      </div>
    </aside>
  );
};

export default SideBar;