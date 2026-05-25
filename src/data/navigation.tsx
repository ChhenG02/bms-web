import {
  ApartmentOutlined,
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

export type NavigationItem = {
  icon: ReactNode
  label: string
  path: string
  subtitle: string
  title: string
}

export const navigationItems: NavigationItem[] = [
  {
    icon: <HomeOutlined />,
    label: 'Dashboard',
    path: '/dashboard',
    subtitle: 'Monitor operations, approvals, and workforce performance from one place.',
    title: 'Dashboard',
  },
  {
    icon: <TeamOutlined />,
    label: 'Users',
    path: '/users',
    subtitle: 'Manage staff records, onboarding, roles, and employee details.',
    title: 'Users',
  },
  {
    icon: <ApartmentOutlined />,
    label: 'Departments',
    path: '/departments',
    subtitle: 'Organize teams, structures, and permissions in one place.',
    title: 'Departments',
  },
  {
    icon: <CalendarOutlined />,
    label: 'Attendance',
    path: '/attendance',
    subtitle: 'Track check-ins, schedules, overtime, and attendance trends.',
    title: 'Attendance',
  },
  {
    icon: <BarChartOutlined />,
    label: 'Reports',
    path: '/reports',
    subtitle: 'Build insights, payroll summaries, and executive reports.',
    title: 'Reports',
  },
  {
    icon: <SettingOutlined />,
    label: 'Settings',
    path: '/settings',
    subtitle: 'Configure system preferences, roles, and workspace behavior.',
    title: 'Settings',
  },
]
