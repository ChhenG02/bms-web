import {
  BarChartOutlined,
  DesktopOutlined,
  FileTextOutlined,
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
        key: "/bill",
        label: "​វិក្កយបត្រ",
        title: "​វិក្កយបត្រ",
        path: "/bill",
        icon: <FileTextOutlined />,
      },
      {
        key: "/energy-usage",
        label: "ទំហំថាមពលប្រើប្រាស់",
        title: "របាយការណ៍",
        path: "/energy-usage",
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
        key: "/users",
        label: "អ្នកប្រើប្រាស់",
        title: "អ្នកប្រើប្រាស់",
        path: "/users",
        icon: <UserOutlined />,
        // children: [
        //   {
        //     key: "/users",
        //     label: "គ្រប់គ្រងអ្នកប្រើប្រាស់",
        //     title: "អ្នកប្រើប្រាស់",
        //     path: "/users",
        //   },
        //   {
        //     key: "/permissions",
        //     label: "តួនាទី​ & សិទ្ធិ",
        //     title: "តួនាទី & សិទ្ធិ",
        //     path: "/permissions",
        //   },
        // ],
      },

      {
        key: "/client",
        label: "អតិថិជន",
        title: "អតិថិជន",
        path: "/client",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    key: "/settings",
    label: "ការកំណត់",
    title: "ការកំណត់",
    path: "/settings",
    icon: <SettingOutlined />,
  },
];
