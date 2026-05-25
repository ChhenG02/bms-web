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
        background: "#f6f8fb",
      }}
    >
      {/* SIDEBAR */}
      <div className="custom-sidebar">
        <AppSidebar
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />
      </div>

      {/* MAIN LAYOUT */}
      <Layout
        style={{
          background: "#f6f8fb",
        }}
      >
        {/* TOP NAVBAR */}
        <AppNavbar />

        {/* PAGE CONTENT */}
        <Layout.Content
          style={{
            padding: 20,
            background: "#f6f8fb",
          }}
        >
          <AppContentHeader />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;