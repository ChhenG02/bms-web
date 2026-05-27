// src/components/layout/AppSidebar.tsx

import {
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import avatarImage from "../../assets/avatar.png";
import { navigationItems } from "../../data/navigation";

const { Sider } = Layout;

type AppSidebarProps = {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
};

function AppSidebar({ collapsed }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
    },
  ];

  const buildMenuItems = (
    items: typeof navigationItems,
  ): MenuProps["items"] => {
    return items.map((item) => {
      if (item.group) {
        return {
          type: "group",
          label: item.label,
          children: buildMenuItems(item.children || []),
        };
      }

      return {
        key: item.key,
        icon: item.icon,
        label: item.path ? (
          <NavLink to={item.path}>{item.label}</NavLink>
        ) : (
          item.label
        ),
        children: item.children
          ? buildMenuItems(item.children)
          : undefined,
      };
    });
  };

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
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            flex: 1,
            overflow: "hidden auto",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: collapsed
                ? "16px 14px"
                : "18px 20px",
              borderBottom:
                "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: collapsed
                  ? "center"
                  : "space-between",
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
                      color:
                        "rgba(255,255,255,0.68)",
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

          {/* MENU */}
          <Menu
            inlineCollapsed={collapsed}
            items={buildMenuItems(navigationItems)}
            mode="inline"
            openKeys={collapsed ? [] : openKeys}
            onOpenChange={(keys) =>
              setOpenKeys(keys as string[])
            }
            selectedKeys={[location.pathname]}
            theme="dark"
            style={{
              background: "transparent",
              borderInlineEnd: "none",
              paddingInline: 10,
              paddingTop: 10,
              fontSize: 14,
              fontWeight: 600,
            }}
          />
        </div>

        {/* BOTTOM PROFILE */}
        <div
          style={{
            padding: collapsed ? 12 : 16,
            borderTop:
              "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Dropdown
            arrow
            placement="topRight"
            trigger={["click"]}
            menu={{
              items: profileMenuItems,
              onClick: ({ key }) => {
                if (key === "profile") {
                  navigate("/profile");
                }

                if (key === "logout") {
                  console.log("logout");
                }
              },
            }}
          >
            <div
              style={{
                cursor: "pointer",
                borderRadius: 16,
                padding: collapsed
                  ? "10px 0"
                  : "10px 12px",
                background:
                  "rgba(255,255,255,0.08)",
                transition: "all 0.2s ease",
                display: "flex",
                justifyContent: collapsed
                  ? "center"
                  : "space-between",
                alignItems: "center",
              }}
            >
              <Space size={12}>
                <Avatar
                  size={42}
                  src={avatarImage}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#4f74e8",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  SA
                </Avatar>

                {!collapsed && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: 1.2,
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        color: "#ffffff",
                        fontSize: 14,
                      }}
                    >
                      Sokchan
                    </Typography.Text>

                    <Typography.Text
                      style={{
                        color:
                          "rgba(255,255,255,0.68)",
                        fontSize: 12,
                      }}
                    >
                      Admin
                    </Typography.Text>
                  </div>
                )}
              </Space>
            </div>
          </Dropdown>
        </div>
      </div>
    </Sider>
  );
}

export default AppSidebar;