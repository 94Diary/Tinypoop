import React from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex flex-1 overflow-hidden ">
        <SideBar />
        

        <main className="flex-1 overflow-y-auto bg-gray-900/95">
          {/* content */}
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;