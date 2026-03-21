import React, { useState } from "react";
import axios from "axios";
import type { AuthUser } from "../types/auth";

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    user_id: string;
    username: string;
    email?: string;
    password?: string;
    role: string;
  };
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<LoginResponse>("http://localhost:8080/users/login", {
        username: username.trim(),
        password,
      });

      const safeUser: AuthUser = {
        id: response.data.user.id,
        user_id: response.data.user.user_id,
        username: response.data.user.username,
        email: response.data.user.email,
        role: response.data.user.role,
      };

      onLoginSuccess(safeUser);
    } catch (loginError) {
      console.error("Login failed", loginError);
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_30%,_#e2e8f0_100%)] px-4 py-10">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_-50px_rgba(15,23,42,0.55)]">
        <section className="hidden w-[45%] flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
          <div>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-cyan-200">
              TinyPoop Web
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight">
              Sign In
              <br />
              Place Management
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              ระบบจะพาไปหน้าที่เหมาะกับ role โดยอัตโนมัติ
              manager จะเข้าหน้าควบคุมทั้งหมด และ admin จะเข้าหน้าสถานที่ที่ตนรับผิดชอบ
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>1. ล็อกอินด้วยชื่อผู้ใช้และรหัสผ่าน</p>
            <p>2. ระบบจำสถานะการล็อกอินไว้ให้</p>
            <p>3. กดไอคอนผู้ใช้บน Navbar เพื่อออกจากระบบ</p>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-600">Welcome Back</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">เข้าสู่ระบบ</h2>
              <p className="mt-2 text-sm text-slate-500">กรอกข้อมูลเพื่อเข้าหน้าจัดการของคุณ</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
                placeholder="your_username"
                autoComplete="username"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {error && (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
