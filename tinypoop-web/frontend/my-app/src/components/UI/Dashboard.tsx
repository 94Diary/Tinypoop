// Dashboard.tsx
import React from "react";
import BoardList from "../BoardList";

const Dashboard: React.FC = () => {
  return (
        <div className="flex-1 p-8 ml-16 overflow-y-auto ">
          {/* content */}
          <h1 className="text-2xl font-bold text-white">
            DashBoard
          </h1>
          <p className="text-gray-600 mb-4">
            Manager
          </p>
        
          <BoardList />
        </div>

  );
};

export default Dashboard;