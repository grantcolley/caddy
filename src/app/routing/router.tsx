import { createBrowserRouter } from 'react-router-dom';
import { MODULE_CONFIG } from '@/shared/config/module-config';
import { mapModulesToRoutesBreadcrumbsAndNav } from './route-mapper';
import { App } from '@/./App.tsx';

function buildRoutesFromModules() {
  const { routes, modules } =
    mapModulesToRoutesBreadcrumbsAndNav(MODULE_CONFIG);

  return [
    {
      path: '/',
      element: <App modules={modules} />,
      children: routes,
    },
  ];
}

export const router = createBrowserRouter(buildRoutesFromModules());
