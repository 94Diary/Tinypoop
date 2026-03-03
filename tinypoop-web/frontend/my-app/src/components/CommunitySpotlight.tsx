// components/CommunitySpotlight.tsx
import React from "react";

const CommunitySpotlight: React.FC = () => {
  return (
    <div className="bg-green-100 rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold">Community Spotlight</h2>
      <p className="text-gray-700 mt-2">
        Join the "Mountain Peak Cleanup" event starting next Monday. Over 50 volunteers have already signed up.
      </p>
      <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        View event details →
      </button>
    </div>
  );
};

export default CommunitySpotlight;