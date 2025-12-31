import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import type { Module } from '@/shared/models/module';
import type { PageRoute } from '@/shared/models/page-route';
import type { BreadcrumbEntry, BreadcrumbItem } from './types';
import {
  buildPath,
  joinPaths,
  must,
  slug,
  prettifySegment,
} from './path-utils';

type Mapped = {
  modules: Module[]; // same shape, but pages now have fullPath
  routes: RouteObject[];
  breadcrumbs: BreadcrumbEntry[];
  breadcrumbByPattern: Map<string, BreadcrumbItem[]>;
};

export function mapModulesToRoutesBreadcrumbsAndNav(modules: Module[]): Mapped {
  const routes: RouteObject[] = [];
  const breadcrumbs: BreadcrumbEntry[] = [];
  const breadcrumbByPattern = new Map<string, BreadcrumbItem[]>();

  // shallow clone modules so we don't mutate the imported constant
  const mappedModules: Module[] = modules.map((m) => ({
    ...m,
    categories: m.categories.map((c) => ({
      ...c,
      pages: c.pages.map((p) => ({ ...p })),
    })),
  }));

  for (const module of mappedModules) {
    const moduleSeg = slug(module.name);
    const moduleBase = buildPath(moduleSeg);
    const moduleCrumb: BreadcrumbItem = {
      label: module.name,
      path: moduleBase,
    };

    for (const category of module.categories) {
      const categorySeg = slug(category.name);
      const categoryBase = buildPath(moduleSeg, categorySeg);
      const categoryCrumb: BreadcrumbItem = {
        label: category.name,
        path: categoryBase,
      };

      for (const page of category.pages) {
        const parentPattern = categoryBase;

        const pagePattern = page.index
          ? parentPattern
          : joinPaths(
              parentPattern,
              must(page.path, 'Non-index Page must have a path')
            );

        // ✅ make it available for navigation
        page.fullPath = pagePattern;

        const pageTrail: BreadcrumbItem[] = [
          moduleCrumb,
          categoryCrumb,
          { label: page.name, path: pagePattern },
        ];

        registerCrumbs(
          pagePattern,
          pageTrail,
          breadcrumbs,
          breadcrumbByPattern
        );

        const Element = page.element;
        const ErrorElement = page.errorElement;

        if (page.index) {
          if (page.children?.length) {
            const childrenRoutes = mapChildrenAndEnrich(
              page.children,
              pagePattern,
              pageTrail,
              breadcrumbs,
              breadcrumbByPattern
            );

            routes.push({
              path: pagePattern,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <Element />,
                  errorElement: ErrorElement ? <ErrorElement /> : undefined,
                },
                ...childrenRoutes,
              ],
            });
          } else {
            routes.push({
              index: true,
              element: <Element />,
              errorElement: ErrorElement ? <ErrorElement /> : undefined,
            });
          }
        } else {
          routes.push({
            path: pagePattern,
            element: <Element />,
            errorElement: ErrorElement ? <ErrorElement /> : undefined,
            children: page.children?.length
              ? mapChildrenAndEnrich(
                  page.children,
                  pagePattern,
                  pageTrail,
                  breadcrumbs,
                  breadcrumbByPattern
                )
              : undefined,
          });
        }
      }
    }
  }

  return { modules: mappedModules, routes, breadcrumbs, breadcrumbByPattern };
}

function mapChildrenAndEnrich(
  children: PageRoute[],
  parentPattern: string,
  parentTrail: BreadcrumbItem[],
  breadcrumbs: BreadcrumbEntry[],
  breadcrumbByPattern: Map<string, BreadcrumbItem[]>
): RouteObject[] {
  const out: RouteObject[] = [];

  for (const child of children) {
    const childPattern = child.index
      ? parentPattern
      : joinPaths(
          parentPattern,
          must(child.path, 'Non-index child route must have a path')
        );

    // ✅ make it available for navigation
    child.fullPath = childPattern;

    const label = child.index
      ? '(index)'
      : prettifySegment(
          must(child.path, 'Non-index child route must have a path')
        );

    const childTrail: BreadcrumbItem[] = [
      ...parentTrail,
      { label, path: childPattern },
    ];

    registerCrumbs(childPattern, childTrail, breadcrumbs, breadcrumbByPattern);

    const Element = child.element;
    const ErrorElement = child.errorElement;

    if (child.index) {
      if (child.children?.length) {
        const grandchildren = mapChildrenAndEnrich(
          child.children,
          childPattern,
          childTrail,
          breadcrumbs,
          breadcrumbByPattern
        );

        out.push({
          path: childPattern,
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Element />,
              errorElement: ErrorElement ? <ErrorElement /> : undefined,
            },
            ...grandchildren,
          ],
        });
      } else {
        out.push({
          index: true,
          element: <Element />,
          errorElement: ErrorElement ? <ErrorElement /> : undefined,
        });
      }
      continue;
    }

    out.push({
      path: childPattern,
      element: <Element />,
      errorElement: ErrorElement ? <ErrorElement /> : undefined,
      children: child.children?.length
        ? mapChildrenAndEnrich(
            child.children,
            childPattern,
            childTrail,
            breadcrumbs,
            breadcrumbByPattern
          )
        : undefined,
    });
  }

  return out;
}

function registerCrumbs(
  pattern: string,
  trail: BreadcrumbItem[],
  list: BreadcrumbEntry[],
  map: Map<string, BreadcrumbItem[]>
) {
  if (map.has(pattern)) return;
  map.set(pattern, trail);
  list.push({ pattern, trail });
}
