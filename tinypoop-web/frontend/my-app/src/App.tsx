import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "./components/UI/MainLayout";
import Dashboard from "./components/UI/Dashboard";
import UserManager from "./components/UserManager";
import LoginPage from "./components/LoginPage";
import { AUTH_STORAGE_KEY } from "./types/auth";
import type { AuthUser } from "./types/auth";

const getLandingPath = (role?: string) => {
  if ((role ?? "").toLowerCase() === "admin") {
    return "/admin/dashboard";
  }

  return "/dashboard";
};

const getStoredUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch (error) {
    console.error("Failed to parse stored auth user", error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

function App() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getStoredUser());

  const normalizedRole = authUser?.role.toLowerCase() ?? "";
  const landingPath = useMemo(() => getLandingPath(normalizedRole), [normalizedRole]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [authUser]);

  const handleLogout = () => {
    setAuthUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to={landingPath} replace />
            ) : (
              <LoginPage onLoginSuccess={setAuthUser} />
            )
          }
        />

        <Route
          path="/"
          element={
            authUser ? (
              <MainLayout currentUser={authUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >

          <Route index element={<Navigate to={landingPath} replace />} />

          <Route
            path="dashboard"
            element={
              normalizedRole === "manager" ? (
                <Dashboard currentUser={authUser!} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            }
          />

          <Route
            path="TestUI"
            element={
              normalizedRole === "manager" ? (
                <UserManager />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            }
          />

          <Route
            path="admin/dashboard"
            element={
              normalizedRole === "admin" ? (
                <Dashboard currentUser={authUser!} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to={landingPath} replace />} />

        </Route>

        <Route path="*" element={<Navigate to={authUser ? landingPath : "/login"} replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;