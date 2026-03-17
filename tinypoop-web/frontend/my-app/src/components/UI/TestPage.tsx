import React from "react";

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

interface UsersListProps {
  users: User[];
  places: Place[];
  loading: boolean;
  error: string | null;
  updatingPlaceId?: string | null;
  onDelete?: (userId: string) => void;
  onRefresh?: () => void;
  onAssignManager?: (placeId: string, managerId: string) => void;
}

const TestPage: React.FC<UsersListProps> = ({
  users,
  places,
  loading,
  error,
  updatingPlaceId,
  onDelete,
  onRefresh,
  onAssignManager,
}) => {
  const adminUsers = users.filter((user) => user.role.toLowerCase() === "admin");
  const usersWithAssignments = adminUsers.map((user) => ({
    ...user,
    assignedPlaces: places.filter((place) => place.manager_id === user.user_id),
  }));

  const unassignedPlaces = places.filter((place) => !place.manager_id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center text-white shadow-2xl backdrop-blur">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-amber-300 border-t-transparent" />
          <p className="text-lg font-medium">กำลังโหลดข้อมูลแอดมินและ PlaceManagement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="max-w-lg rounded-3xl border border-rose-300/30 bg-rose-100/90 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-rose-900">โหลดข้อมูลไม่สำเร็จ</h1>
          <p className="mt-3 text-rose-700">{error}</p>
          <button
            type="button"
            onClick={onRefresh}
            className="mt-6 rounded-full bg-rose-600 px-5 py-2.5 font-medium text-white transition hover:bg-rose-700"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff4cf,_#f8fafc_32%,_#dbeafe_68%,_#e2e8f0_100%)] px-6 py-10 text-slate-900 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 text-white shadow-[0_35px_120px_-45px_rgba(15,23,42,0.75)]">
          <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.4fr_0.9fr] lg:px-10">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm text-amber-200">
                Admin Control Center
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                ลำดับ Admin ที่ดูแล PlaceManagement 
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                การจัดการบทบาทของผู้ใช้ในระบบเพื่อมอบหมายสิทธิ์การดูแล PlaceManagement ให้กับผู้ใช้ที่มี role admin โดยเฉพาะ เพื่อความปลอดภัยและการควบคุมที่เหมาะสม
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Admins</p>
                <p className="mt-3 text-3xl font-bold text-amber-300">{adminUsers.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Places</p>
                <p className="mt-3 text-3xl font-bold text-cyan-300">{places.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Unassigned</p>
                <p className="mt-3 text-3xl font-bold text-rose-300">{unassignedPlaces.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-300/30 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Admin ที่พร้อมดูแลระบบ</h2>
                <p className="mt-1 text-sm text-slate-500">เรียงเฉพาะ role admin และสรุปสถานที่ที่รับผิดชอบอยู่ตอนนี้</p>
              </div>
              <button
                type="button"
                onClick={onRefresh}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                รีเฟรชข้อมูล
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {usersWithAssignments.map((user) => (
                <article
                  key={user.id}
                  className="rounded-3xl border border-amber-200 bg-[linear-gradient(135deg,_rgba(255,251,235,1),_rgba(255,255,255,1))] p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-amber-300">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{user.username}</h3>
                        <p className="text-sm text-slate-500">{user.user_id}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-rose-700">
                      {user.role}
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Assigned Places</p>
                    <p className="mt-2 text-3xl font-bold text-cyan-300">{user.assignedPlaces.length}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {user.assignedPlaces.length > 0 ? (
                        user.assignedPlaces.map((place) => (
                          <span
                            key={place.id}
                            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
                          >
                            {place.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">ยังไม่ได้รับมอบหมาย PlaceManagement</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {adminUsers.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                ยังไม่มีผู้ใช้ที่เป็น role admin ในระบบ
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-300/30 backdrop-blur">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Assign PlaceManagement</h2>
              <p className="mt-1 text-sm text-slate-500">เปลี่ยนผู้ดูแลของแต่ละ place ได้ทันที โดยเลือกจาก admin เท่านั้น</p>
            </div>

            <div className="mt-6 space-y-4">
              {places.map((place) => (
                <div
                  key={place.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5 transition hover:border-cyan-200 hover:bg-white"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{place.name}</h3>
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          {place.place_id}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{place.address}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {place.description || "ยังไม่มีคำอธิบายของสถานที่นี้"}
                      </p>
                    </div>

                    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Admin ที่รับผิดชอบ
                      </label>
                      <select
                        value={place.manager_id ?? ""}
                        onChange={(event) => onAssignManager?.(place.id, event.target.value)}
                        disabled={updatingPlaceId === place.id || adminUsers.length === 0}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-400"
                      >
                        <option value="">ยังไม่กำหนดผู้ดูแล</option>
                        {adminUsers.map((admin) => (
                          <option key={admin.id} value={admin.user_id}>
                            {admin.username} ({admin.user_id})
                          </option>
                        ))}
                      </select>
                      <p className="mt-3 text-xs text-slate-500">
                        ตอนนี้: {place.manager?.username ?? "ยังไม่มีผู้ดูแล"}
                      </p>
                      {updatingPlaceId === place.id && (
                        <p className="mt-2 text-xs font-medium text-cyan-600">กำลังอัปเดตข้อมูล...</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {places.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                ยังไม่มี PlaceManagement ในระบบ
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-300/30 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">ผู้ใช้ทั้งหมดในระบบ</h2>
              <p className="mt-1 text-sm text-slate-500">สำหรับตรวจสอบข้อมูลผู้ใช้ทั้งหมด *ข้อควรระวัง* การลบ user ในนี้หมายถึงลบสิทธิ์การเข้าถึงระบบทั้งหมดของผู้ใช้</p>
            </div>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              {users.length} คน
            </span>
          </div>

          {users.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              ไม่มีผู้ใช้ในระบบ
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-400">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Places</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const assignedCount = places.filter((place) => place.manager_id === user.user_id).length;

                    return (
                      <tr key={user.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{user.username}</p>
                              <p className="text-xs text-slate-500">{user.email || "-"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium">{user.user_id}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                              user.role.toLowerCase() === "admin"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{assignedCount}</td>
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => onDelete?.(user.id)}
                            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default TestPage;