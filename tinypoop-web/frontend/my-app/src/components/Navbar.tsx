// components/NavBar.tsx
import React from "react";
import { Button } from "./UI";

interface NavBarProps {
  user: any;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black text-blue-600 tracking-tight">TinyPoop</span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="text-blue-600">Dashboard</a>
              <a href="#" className="hover:text-gray-900 transition">Locations</a>
              <a href="#" className="hover:text-gray-900 transition">Reports</a>
              <a href="#" className="hover:text-gray-900 transition">Team</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-gray-900">{user.username}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold bg-gray-100 px-1.5 rounded">
                {user.role}
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
