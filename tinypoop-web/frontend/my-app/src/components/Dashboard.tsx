// components/Dashboard.tsx
import React from "react";
import NavBar from "./NavBar";
import BoardList from "./BoardList";
import CommunitySpotlight from "./CommunitySpotlight";
import UpgradeSection from "./UpgradeSection";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <NavBar />
      <h1 className="text-2xl font-bold mt-6">My Boards Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Manage your environmental cleanup initiatives.
      </p>
      <BoardList />
      <CommunitySpotlight />
      <UpgradeSection />
    </div>
  );
};

export default Dashboard;