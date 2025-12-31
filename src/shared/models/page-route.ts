import React from 'react';

type IndexRouteShape = {
  index: true;
  path?: never;
};

type PathRouteShape = {
  index?: false;
  path: string;
};

export type BreadcrumbLabel =
  | string
  | ((ctx: { segment: string; fullPath: string }) => string);

export class PageRoute {
  routeId!: number;

  // NOTE: we still keep these as runtime fields, but TS safety comes from the union below
  index?: boolean;
  path?: string;
  fullPath?: string;

  element!: React.ComponentType;
  errorElement?: React.ComponentType;
  args?: string;

  /** Optional breadcrumb label override for child routes like ":id" */
  breadcrumb?: BreadcrumbLabel;

  children?: PageRoute[];
}

// The actual shape used by the router + mapper (index-safe)
export type RouterPageRoute = Omit<PageRoute, 'index' | 'path' | 'children'> &
  (IndexRouteShape | PathRouteShape) & {
    children?: RouterPageRoute[];
  };
