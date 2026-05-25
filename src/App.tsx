import { App as AntApp, ConfigProvider, theme } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ClientPage from "./pages/ClientPage";
import DashboardPage from "./pages/DashboardPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import kmKH from "antd/locale/km_KH";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      locale={kmKH}
      form={{
        requiredMark: false,
      }}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f74e8",
          colorInfo: "#4f74e8",
          colorSuccess: "#41c98f",
          colorWarning: "#ffbe45",
          colorError: "#ff6b6b",
          colorText: "#20304d",
          colorTextSecondary: "#6f7f98",
          colorBgBase: "#eef3fb",
          colorBgContainer: "#ffffff",
          colorBorderSecondary: "#e6ecf5",
          borderRadius: 18,
          fontFamily:
            "'Kantumruy Pro', 'Noto Sans Khmer', 'Segoe UI', sans-serif",
          boxShadowSecondary: "0 20px 48px rgba(79, 116, 232, 0.12)",
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="client" element={<ClientPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
