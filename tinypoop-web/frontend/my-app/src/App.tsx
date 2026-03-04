import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/UI/MainLayout";
import Dashboard from "./components/UI/Dashboard";
import EIEI from "./components/TestUI";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout ครอบทุกหน้า */}
        <Route path="/" element={<MainLayout />}>

          {/* default redirect */}
          <Route index element={<Navigate to="/dashboard" />} />

          <Route path="dashboard" element={<Dashboard/>} />

          <Route path="TestUi" element={<EIEI />} />

          <Route path="templates" element={<EIEI />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;