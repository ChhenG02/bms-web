import {
  BarChartOutlined,
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { ReactNode } from "react";

export type NavigationItem = {
  key: string;
  label: string;
  title: string;
  path?: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  group?: string;
};

export const navigationItems: NavigationItem[] = [
  {
    key: "/dashboard",
    label: "ផ្ទាំងគ្រប់គ្រង",
    title: "ផ្ទាំងគ្រប់គ្រង",
    path: "/dashboard",
    icon: <DesktopOutlined />,
  },

  {
    key: "information-management",
    label: "គ្រប់គ្រងព័ត៌មាន",
    title: "គ្រប់គ្រងព័ត៌មាន",
    group: "group",
    children: [
      {
        key: "/client",
        label: "អតិថិជន",
        title: "អតិថិជន",
        path: "/client",
        icon: <TeamOutlined />,
      },
      {
        key: "/reports",
        label: "ទំហំថាមពលប្រើប្រាស់",
        title: "Reports",
        path: "/reports",
        icon: <BarChartOutlined />,
      },
    ],
  },

  {
    key: "administration",
    label: "រដ្ឋបាល",
    title: "Administration",
    group: "group",
    children: [
      {
        key: "employee-management",
        label: "អ្នកប្រើប្រាស់",
        title: "User Management",
        icon: <UserOutlined />,
        children: [
          {
            key: "/users",
            label: "គ្រប់គ្រងអ្នកប្រើប្រាស់",
            title: "Users",
            path: "/users",
          },
          {
            key: "/departments",
            label: "តួនាទី​ & សិទ្ធិ",
            title: "Departments",
            path: "/departments",
          },
        ],
      },

      {
        key: "/settings",
        label: "ការកំណត់",
        title: "Settings",
        path: "/settings",
        icon: <SettingOutlined />,
      },
    ],
  },
];