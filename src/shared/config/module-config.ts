import {
  IconApps,
  IconChartBar,
  IconLayoutDashboard,
  IconSettings,
  IconShieldLock,
  IconUsers,
} from '@tabler/icons-react';
import type { Module } from '@/shared/models/module';
import Dashboard from '@/features/dashboard/dashboard';
import Users from '@/features/users/users';
import GenericError from '@/features/errors/generic-error';

export const MODULE_CONFIG: Module[] = [
  {
    moduleId: 1,
    name: 'Application',
    icon: IconApps,
    permission: 'application.access',
    categories: [
      {
        categoryId: 1,
        name: 'Reporting',
        icon: IconChartBar,
        permission: 'reporting.access',
        pages: [
          {
            routeId: 1,
            path: 'dashboard',
            element: Dashboard,
            errorElement: GenericError,
            args: '',
            name: 'Dashboard',
            icon: IconLayoutDashboard,
            permission: 'config.access',
          },
        ],
      },
    ],
  },
  {
    moduleId: 2,
    name: 'Settings',
    icon: IconSettings,
    permission: 'settings.access',
    categories: [
      {
        categoryId: 2,
        name: 'Administration',
        icon: IconShieldLock,
        permission: 'admin.access',
        pages: [
          {
            routeId: 2,
            path: 'users',
            element: Users,
            errorElement: GenericError,
            args: '',
            name: 'Users',
            icon: IconUsers,
            permission: 'users.view',
          },
        ],
      },
    ],
  },
];
