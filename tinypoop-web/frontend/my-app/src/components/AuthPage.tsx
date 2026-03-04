import React, { useState } from "react";
import { Button, Input, Card } from "./UI";

interface AuthPageProps {
  onLoginSuccess: (user: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // สำหรับ Prototype นี้ เราจะจำลองการ Login/Register ไปก่อน 
      // เนื่องจากระบบ Backend ยังไม่มีระบบ Session/JWT ที่สมบูรณ์
      // เราจะตรวจสอบว่ามี User นี้อยู่ในฐานข้อมูลจริงๆ หรือไม่
      
      const res = await fetch("http://localhost:8080/users");
      const users = await res.json();
      
      if (isLogin) {
        const user = users.find(
          (u: any) => u.username === formData.username && u.password === formData.password
        );
        
        if (user) {
          onLoginSuccess(user);
        } else {
          setError("Invalid username or password");
        }
      } else {
        // สำหรับ Register เราจะส่งข้อมูลไปสร้าง User ใหม่
        const registerRes = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            user_id: "USER_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
            uuid: Math.random().toString(36).substring(2, 15),
            role: "USER"
          }),
        });

        if (registerRes.ok) {
          const newUser = await registerRes.json();
          onLoginSuccess(newUser);
        } else {
          setError("Failed to register. Username or Email might be taken.");
        }
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-blue-600 tracking-tight">TinyPoop</h1>
        <p className="text-gray-500 mt-2">Environment management simplified.</p>
      </div>

      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            type="text"
            required
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />

          {!isLogin && (
            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          )}

          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            {isLogin ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
