import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import ClientPage from "../pages/client/ClientPage";
import ClientPageDetail from "../pages/client/ClientPageDetail";

// import DashboardPage from "../pages/dashboard/DashboardPage";

import SettingsPage from "../pages/setting/SettingsPage";
import UsersPage from "../pages/profile/user/UsersPage";
import EnergyUsagePage from "../pages/energy-usage/EnergyUsagePage";
import ProfilePage from "../pages/ProfilePage";
import BillPage from "../pages/bill/BillPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/bill" replace />} />

        {/* DASHBOARD */}
        {/* <Route path="dashboard" element={<DashboardPage />} /> */}

        {/* USERS */}
        <Route path="users" element={<UsersPage />} />

        {/* CLIENT */}
        <Route path="client" element={<ClientPage />} />
        <Route path="client/:id" element={<ClientPageDetail />} />

        {/* Bill */}
        <Route path="bill" element={< BillPage />} />

        {/* ENERGY USAGE */}
        <Route path="energy-usage" element={< EnergyUsagePage />} />

        {/* SETTINGS */}
        <Route path="settings" element={<SettingsPage />} />

        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;