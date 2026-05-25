// src/layouts/DashboardLayout.tsx

import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppNavbar from "../components/layout/AppNavbar";
import AppSidebar from "../components/layout/AppSidebar";

import "../styles/sidebar.css";
import AppContentHeader from "./AppContentHeader";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#eef3fb",
      }}
    >
      <div className="custom-sidebar">
        <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      <Layout>
        {/* NAVBAR */}
        <AppNavbar />

        <Layout.Content
          style={{
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 20,
              minHeight: "100%",
              boxShadow: "0 20px 48px rgba(79, 116, 232, 0.12)",
            }}
          >
            <AppContentHeader />

            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
