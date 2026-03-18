import React from "react";

interface BoardProps {
  id: string;
  title: string;
  address: string;
  managerName?: string;
  notes: number;
  members: number;
  onDelete?: (id: string) => void;
}

const BoardCard: React.FC<BoardProps> = ({ id, title, address, managerName, notes, members, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition relative group border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        {onDelete && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this place?")) {
                onDelete(id);
              }
            }}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            title="Delete Place"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1 truncate">{address}</p>
      
      <div className="mt-4 pt-3 border-t border-gray-50 flex flex-col gap-1">
        <p className="text-xs text-blue-600 font-medium">
          👤 Manager: {managerName || "Unassigned"}
        </p>
        <p className="text-xs text-gray-400">
          📝 {notes} notes | 👥 {members} members
        </p>
      </div>
    </div>
  );
};

export default BoardCard;