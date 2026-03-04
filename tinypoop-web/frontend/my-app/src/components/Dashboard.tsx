// components/Dashboard.tsx
import React from "react";
import NavBar from "./NavBar";
import BoardList from "./BoardList";
import CommunitySpotlight from "./CommunitySpotlight";
import UpgradeSection from "./UpgradeSection";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar user={user} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your environmental cleanup initiatives and locations.
          </p>
        </div>
        
        <BoardList />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CommunitySpotlight />
          <UpgradeSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
