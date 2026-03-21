import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import type { AuthUser } from "../types/auth";

interface Place {
  id: string;
  place_id: string;
  name: string;
  manager_id?: string | null;
}

interface SideBarProps {
  currentUser: AuthUser;
}

const SideBar: React.FC<SideBarProps> = ({ currentUser }) => {
  const baseStyle = "block p-2 rounded transition";
  const role = currentUser.role.toLowerCase();
  const [adminPlaces, setAdminPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchAssignedPlaces = async () => {
      if (role !== "admin") {
        setAdminPlaces([]);
        return;
      }

      try {
        const response = await axios.get<Place[]>("http://localhost:8080/places");
        setAdminPlaces(
          response.data
            .filter((place) => (place.manager_id ?? "") === currentUser.user_id)
            .sort((left, right) => left.name.localeCompare(right.name))
        );
      } catch (error) {
        console.error("Failed to fetch assigned places for admin", error);
      }
    };

    fetchAssignedPlaces();
  }, [currentUser.user_id, role]);

  const placeLinks = useMemo(
    () =>
      adminPlaces.map((place) => ({
        ...place,
        to: `/admin/place/${encodeURIComponent(place.place_id)}`,
      })),
    [adminPlaces]
  );

  return (
    <aside className="relative z-10 w-72 h-screen bg-gray-900 p-6 flex flex-col shadow-2xl shadow-black/70">
      
      <div className="space-y-1 ml-2">

        <NavLink
          to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-gray-500/30 text-blue-400 font-semibold"
                : "text-white hover:bg-gray-500/20 rounded-2xl"
            }`
          }
        >
          {role === "admin" ? "My PlaceManagement" : "Place / Management"}
        </NavLink>

        {role === "manager" && (
          <NavLink
            to="/TestUI"
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? "bg-gray-500/30 text-blue-400 font-semibold"
                  : "text-white hover:bg-gray-500/20"
              }`
            }
          >
            User / Management
          </NavLink>
        )}

      </div>

      {role === "admin" && (
        <div className="mt-6 flex-1 overflow-y-auto border-t border-white/10 pt-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Assigned Places
          </p>

          {placeLinks.length === 0 ? (
            <p className="px-2 text-xs text-slate-400">ยังไม่มีสถานที่ที่ได้รับมอบหมาย</p>
          ) : (
            <div className="space-y-1">
              {placeLinks.map((place) => (
                <NavLink
                  key={place.id}
                  to={place.to}
                  className={({ isActive }) =>
                    `${baseStyle} text-sm ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-200 font-semibold"
                        : "text-slate-200 hover:bg-white/10"
                    }`
                  }
                >
                  <p className="truncate">{place.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">{place.place_id}</p>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default SideBar;