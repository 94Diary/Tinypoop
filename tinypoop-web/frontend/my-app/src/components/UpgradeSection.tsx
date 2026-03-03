// components/UpgradeSection.tsx
import React from "react";

const UpgradeSection: React.FC = () => {
  return (
    <div className="bg-orange-100 rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold">Upgrade to Pro</h2>
      <p className="text-gray-700 mt-2">
        Get unlimited boards, advanced analytics, and custom team branding tools.
      </p>
      <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Upgrade Now
      </button>
    </div>
  );
};

export default UpgradeSection;