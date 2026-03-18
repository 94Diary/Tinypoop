import React from "react";
import BoardList from "../BoardList";
import type { AuthUser } from "../../types/auth";

interface DashboardProps {
  currentUser: AuthUser;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const isAdmin = currentUser.role.toLowerCase() === "admin";

  return (
        <div className="flex-1 p-8 ml-16 overflow-y-auto ">
          {/* content */}
          <h1 className="text-2xl font-bold text-white">
            {isAdmin ? "My PlaceManagement" : "PlaceManagement"}
          </h1>
          <p className="text-gray-600 mb-4">
            {isAdmin ? `Admin: ${currentUser.username}` : "Manager"}
          </p>
        
          <BoardList currentUser={currentUser} />
        </div>

  );
};

export default Dashboard;