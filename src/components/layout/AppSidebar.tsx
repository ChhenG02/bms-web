import {
  DesktopOutlined,
  RiseOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

type AppSidebarProps = {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
};

function AppSidebar({ collapsed }: AppSidebarProps) {
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (
      location.pathname.includes("/users") ||
      location.pathname.includes("/departments")
    ) {
      setOpenKeys(["employee-management"]);
    }
  }, [location.pathname]);

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DesktopOutlined />,
      label: <NavLink to="/dashboard">ផ្ទាំងគ្រប់គ្រង</NavLink>,
    },

    {
      type: "divider",
    },

    {
      type: "group",
      label: "គ្រប់គ្រងព័ត៌មាន",
      children: [
        {
          key: "/attendance",
          icon: <TeamOutlined />,
          label: <NavLink to="/attendance">អតិថិជន</NavLink>,
        },

        {
          key: "/reports",
          icon: <RiseOutlined />,
          label: <NavLink to="/reports">ទំហំថាមពលប្រើប្រាស់</NavLink>,
        },
      ],
    },

    {
      type: "divider",
    },

    {
      type: "group",
      label: "រដ្ឋបាល",
      children: [
        {
          key: "employee-management",
          icon: <UserOutlined />,
          label: "អ្នកប្រើប្រាស់",
          children: [
            {
              key: "/users",
              // icon: <TeamOutlined />,
              label: <NavLink to="/users">គ្រប់គ្រងអ្នកប្រើប្រាស់</NavLink>,
            },
            {
              key: "/departments",
              // icon: <RiseOutlined />,
              label: <NavLink to="/departments">តួនាទី​ & សិទ្ធិ</NavLink>,
            },
          ],
        },
        {
          key: "/settings",
          icon: <SettingOutlined />,
          label: <NavLink to="/settings">ការកំណត់</NavLink>,
        },
      ],
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      collapsedWidth={88}
      theme="dark"
      trigger={null}
      width={250}
      style={{
        background:
          "linear-gradient(180deg, #4f74e8 0%, #456ce5 45%, #3e63db 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: collapsed ? "16px 14px" : "18px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: collapsed ? "center" : "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <Typography.Title
              level={2}
              style={{
                color: "#ffffff",
                margin: 0,
                lineHeight: 1,
                fontWeight: 800,
                fontSize: collapsed ? 22 : 28,
                letterSpacing: -1.5,
              }}
            >
              {collapsed ? "PA" : "PATech"}
            </Typography.Title>

            {!collapsed && (
              <Typography.Text
                style={{
                  color: "rgba(255,255,255,0.68)",
                  fontSize: 13,
                  fontWeight: 500,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Pisnuk AutoTech
              </Typography.Text>
            )}
          </div>
        </div>
      </div>

      <Menu
        inlineCollapsed={collapsed}
        items={items}
        mode="inline"
        openKeys={collapsed ? [] : openKeys}
        onOpenChange={(keys) => setOpenKeys(keys as string[])}
        selectedKeys={[location.pathname]}
        theme="dark"
        style={{
          background: "transparent",
          borderInlineEnd: "none",
          paddingInline: 10,
          fontSize: 14,
          fontWeight: 600,
        }}
      />
    </Sider>
  );
}

export default AppSidebar;
