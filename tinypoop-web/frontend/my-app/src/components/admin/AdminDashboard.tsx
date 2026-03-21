import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { AuthUser } from "../../types/auth";

interface Place {
  id: string;
  place_id: string;
  name: string;
  address: string;
  manager_id?: string | null;
}

interface AdminDashboardProps {
  currentUser: AuthUser;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Place[]>("http://localhost:8080/places");
        setPlaces(
          response.data.filter((place) => (place.manager_id ?? "") === currentUser.user_id)
        );
      } catch (error) {
        console.error("Failed to load admin places", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [currentUser.user_id]);

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_#ecfeff,_#f8fafc_36%,_#e2e8f0_100%)] px-8 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-300/30">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-sm font-medium text-cyan-700">
            Admin Workspace
          </span>
          <h1 className="mt-4 text-4xl font-black text-slate-900">จัดการสถานที่ที่คุณรับผิดชอบ</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            เลือกสถานที่เพื่อเข้าไปกำหนดโครงสร้าง ตึก ชั้น และห้องสำหรับการจัดการงานแม่บ้านในพื้นที่นั้นๆ
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-300/30">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">สถานที่ที่ได้รับมอบหมาย</h2>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {places.length} places
            </span>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-slate-500">กำลังโหลดข้อมูลสถานที่...</p>
          ) : places.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
              ยังไม่มีสถานที่ที่ถูกมอบหมายให้บัญชีนี้ กรุณาให้ manager มอบหมายก่อน
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {places.map((place) => (
                <article key={place.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{place.place_id}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{place.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{place.address}</p>
                  <Link
                    to={`/admin/place/${encodeURIComponent(place.place_id)}`}
                    className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    เข้าไปจัดการตึก/ชั้น/ห้อง
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
