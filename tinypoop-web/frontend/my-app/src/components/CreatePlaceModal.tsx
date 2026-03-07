import axios from "axios";
import React, { useState, useEffect } from "react";

interface User {
  user_id: string;
  username: string;
  role: string;
}

interface CreatePlaceModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePlaceModal: React.FC<CreatePlaceModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    place_id: "PLACE_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    name: "",
    address: "",
    description: "",
    create_by: "Web User",
    manager_id: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/places", formData);
      onSuccess();
      onClose();
    }catch (err) {
      console.error("Failed to create place", err);
      alert("Error creating place. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create New Place</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Place ID (Unique)</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.place_id}
              onChange={(e) => setFormData({ ...formData, place_id: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              required
              placeholder="E.g. Main Office"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
            <input
              type="text"
              required
              placeholder="E.g. 123 Street, City"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Assign Manager (User)</label>
            <select
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={formData.manager_id}
              onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
            >
              <option value="">-- Select a user to manage this place --</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.username} ({user.role})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              placeholder="Description of the place..."
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium shadow-sm"
            >
              Create Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaceModal;