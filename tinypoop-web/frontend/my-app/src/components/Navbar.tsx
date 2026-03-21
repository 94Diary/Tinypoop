import React, { useMemo, useState } from "react";
import type { AuthUser } from "../types/auth";

interface NavBarProps {
  currentUser: AuthUser;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roleLabel = useMemo(() => currentUser.role.toLowerCase(), [currentUser.role]);

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
      <div className="relative flex items-center gap-3">
        <div className="text-right text-xs">
          <p className="font-semibold text-white">{currentUser.username}</p>
          <p className="uppercase tracking-[0.2em] text-cyan-300">{roleLabel}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-full border border-white/20 px-3 py-1 text-xl text-white transition hover:bg-white/10"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-label="Account menu"
        >
          👤
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </nav>
  );
};

export default NavBar;