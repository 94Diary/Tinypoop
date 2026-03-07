//Component/UserManager.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import TestPage from "./UI/TestPage";

interface User {
  id: string;
  user_id: string;
  username: string;
  role: string;
}

interface UsersResponse {
  users: User[];
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<UsersResponse>(
          "http://localhost:8080/users/page?page=1"
        );

        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/users/${id}`
      );

      if (res.status === 200) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">กำลังโหลดผู้ใช้...</p>
      </div>
    );

  return <TestPage users={users} onDelete={handleDelete} />;
};

export default UserManager;