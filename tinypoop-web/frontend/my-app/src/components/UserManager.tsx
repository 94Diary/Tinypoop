//Component/UserManager.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import TestPage from "./UI/TestPage";

interface User {
  id: string;
  user_id: string;
  username: string;
  email?: string;
  role: string;
}

interface Place {
  id: string;
  place_id: string;
  name: string;
  address: string;
  description: string;
  create_by: string;
  manager_id?: string | null;
  manager?: {
    username: string;
    email: string;
  } | null;
}

const API_BASE_URL = "http://localhost:8080";

const sortUsers = (items: User[]) => {
  return [...items].sort((left, right) => {
    const leftIsAdmin = left.role.toLowerCase() === "admin";
    const rightIsAdmin = right.role.toLowerCase() === "admin";

    if (leftIsAdmin !== rightIsAdmin) {
      return leftIsAdmin ? -1 : 1;
    }

    return left.username.localeCompare(right.username);
  });
};

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingPlaceId, setUpdatingPlaceId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [usersResponse, placesResponse] = await Promise.all([
        axios.get<User[]>(`${API_BASE_URL}/users`),
        axios.get<Place[]>(`${API_BASE_URL}/places`),
      ]);

      setUsers(sortUsers(usersResponse.data));
      setPlaces(placesResponse.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      setError("ไม่สามารถโหลดข้อมูลผู้ใช้และสถานที่ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/users/${id}`);

      if (res.status === 200) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setPlaces((prev) =>
          prev.map((place) => {
            const deletedUser = users.find((user) => user.id === id);

            if (!deletedUser || place.manager_id !== deletedUser.user_id) {
              return place;
            }

            return {
              ...place,
              manager_id: null,
              manager: null,
            };
          })
        );
      } else {
        alert("Failed to delete user");
      }
    } catch (deleteError) {
      console.error("Failed to delete user", deleteError);
      alert("Failed to delete user");
    }
  };

  const handleAssignManager = async (placeId: string, managerId: string) => {
    const selectedManagerId = managerId || null;

    try {
      setUpdatingPlaceId(placeId);
      await axios.put(`${API_BASE_URL}/places/${placeId}`, {
        manager_id: selectedManagerId,
      });

      setPlaces((prev) =>
        prev.map((place) => {
          if (place.id !== placeId) {
            return place;
          }

          const manager = users.find((user) => user.user_id === selectedManagerId);

          return {
            ...place,
            manager_id: selectedManagerId,
            manager: manager
              ? {
                  username: manager.username,
                  email: manager.email ?? "",
                }
              : null,
          };
        })
      );
    } catch (assignError) {
      console.error("Failed to update place manager", assignError);
      alert("ไม่สามารถอัปเดตผู้ดูแล PlaceManagement ได้");
    } finally {
      setUpdatingPlaceId(null);
    }
  };

  return (
    <TestPage
      users={users}
      places={places}
      loading={loading}
      error={error}
      updatingPlaceId={updatingPlaceId}
      onRefresh={fetchData}
      onDelete={handleDelete}
      onAssignManager={handleAssignManager}
    />
  );
};

export default UserManager;