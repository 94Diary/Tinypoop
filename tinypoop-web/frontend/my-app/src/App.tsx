import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/UI/MainLayout";
import Dashboard from "./components/UI/Dashboard";
import UserManager from "./components/UserManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout ครอบทุกหน้า */}
        <Route path="/" element={<MainLayout />}>

          {/* default redirect */}
          <Route index element={<Navigate to="/dashboard" />} />

          <Route path="dashboard" element={<Dashboard/>} />

          <Route path="TestUI" element={<UserManager />} />

          <Route path="templates" element={<UserManager />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;