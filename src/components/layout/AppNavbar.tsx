import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";

import avatarImage from "../../assets/avatar.png";

function AppNavbar() {
  const items: MenuProps["items"] = [
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

  return (
    <header
      className="topbar"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 72,
        padding: "0 24px",
        background: "#ffffff",
        borderBottom: "1px solid #edf1f7",
      }}
    >
      <div className="topbar__right">
        <Dropdown
          arrow
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 14,
              transition: "all 0.2s ease",
            }}
          >
            <Space size={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1.2,
                  alignItems: "flex-end",
                }}
              >
                <Typography.Text
                  strong
                  style={{
                    color: "#20304d",
                    fontSize: 14,
                  }}
                >
                  Super Admin
                </Typography.Text>

                <Typography.Text
                  style={{
                    color: "#7b8ba7",
                    fontSize: 12,
                  }}
                >
                  Administrator
                </Typography.Text>
              </div>

              <Avatar
                size={42}
                src={avatarImage}
                style={{
                  backgroundColor: "#4f74e8",
                  fontWeight: 700,
                }}
              >
                SA
              </Avatar>
            </Space>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default AppNavbar;
