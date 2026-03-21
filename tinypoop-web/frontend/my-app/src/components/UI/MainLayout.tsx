import React from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import type { AuthUser } from "../../types/auth";

interface MainLayoutProps {
  currentUser: AuthUser;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ currentUser, onLogout }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar currentUser={currentUser} onLogout={onLogout} />

      <div className="flex flex-1 overflow-hidden ">
        <SideBar currentUser={currentUser} />
        

        <main className="flex-1 overflow-y-auto bg-gray-900/95">
          {/* content */}
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;