// components/BoardCard.tsx
import React from "react";

interface BoardProps {
  title: string;
  notes: number;
  members: number;
}

const BoardCard: React.FC<BoardProps> = ({ title, notes, members }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">
        📝 {notes} notes | 👥 {members} members
      </p>
    </div>
  );
};

export default BoardCard;