import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import ClientPage from "../pages/client/ClientPage";
import ClientPageDetail from "../pages/client/ClientPageDetail";

import DashboardPage from "../pages/dashboard/DashboardPage";

import DepartmentsPage from "../pages/DepartmentsPage";
import SettingsPage from "../pages/SettingsPage";
import UsersPage from "../pages/UsersPage";
import EnergyUsagePage from "../pages/EnergyUsagePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* DASHBOARD */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* USERS */}
        <Route path="users" element={<UsersPage />} />

        {/* DEPARTMENTS */}
        <Route path="departments" element={<DepartmentsPage />} />

        {/* CLIENT */}
        <Route path="client" element={<ClientPage />} />
        <Route path="client/:id" element={<ClientPageDetail />} />

        {/* ENERGY USAGE */}
        <Route path="energy-usage" element={< EnergyUsagePage />} />

        {/* SETTINGS */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;