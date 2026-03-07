import React from "react";

interface UsersListProps {
  users: {
    id: string;
    user_id: string;
    username: string;
    role: string;
  }[];
  onDelete?: (userId: string) => void;
}

const TestPage: React.FC<UsersListProps> = ({ users, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">ไม่มีผู้ใช้ในระบบ</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
           สวัสดีครับจารย์วินสุดหล่อ
        </h1>
        <p className="text-gray-500 mt-2">
          รายชื่อผู้ใช้ทั้งหมดในระบบ
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Card Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Users
          </h2>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {users.length} คน
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
  {users.map((user) => (
    <tr
      key={user.user_id}
      className="border-t hover:bg-gray-50 transition"
    >
      <td className="py-3 px-6 font-medium">{user.user_id}</td>

      <td className="py-3 px-6 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        {user.username}
      </td>

      <td className="py-3 px-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* ปุ่ม Action */}
      <td className="py-3 px-6 text-right">
        <button
          onClick={() => onDelete && onDelete(user.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

      </div>
    </main>
  );
};

export default TestPage;