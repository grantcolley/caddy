# caddy

### Table of contents

- [Tooling Setup](#tooling-setup)
  - [Install Vite](#install-vite)
  - [Install dependencies](#install-dependencies)
  - [Run the Development Server](#run-the-development-server)
  - [Install ESLint & Prettier](#install-eslint--prettier)
  - [Install TypeScript type definitions for Node.js](#install-typescript-type-definitions-for-nodejs)
  - [Install React Router](#install-react-router)
  - [Install React Hook Form](#install-react-hook-form)
  - [Install React Error Boundary](#install-react-error-boundary)
  - [Install Zod](#install-zod)
  - [Install Tailwind](#install-tailwind)
  - [Edit `tsconfig` files](#edit-tsconfig-files)
  - [Update `vite.config.ts`](#update-viteconfigts)
  - [Install shadcn](#install-shadcn)
  - [Install tabler icons](#install-tabler-icons)
  - [Run](#run)
- [Create the Main Layout](#create-the-main-layout)
- [Support Dark/Light Theme](#support-darklight-theme)
- [Create Routing](#create-routing)
  - [Create Models for Config Driven Sidebar and Routing](#create-models-for-config-driven-sidebar-and-routing)
  - [Create Components to Route to](#create-components-to-route-to)
  - [Create Config Driven Routing](#create-config-driven-routing)
  - [Create the Router](#create-the-router)
  - [Create the `<AppSidebarContent>`](#)
  - [Update Existing Components to Implement Routing](#update-existing-components-to-implement-routing)

# Tooling Setup

### Install Vite

[Vite](https://vite.dev/) is a fast frontend build tool for web development consisting of a development server, allowing you to run React applications locally.

Create a `vite` project selecting `React` for the framework, and `TypeScript` for the variant.

```bash
npm create vite@latest caddy
```

### Install dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

### Install ESLint & Prettier

[ESLint](https://eslint.org/) is a tool that analyzes your code for potential errors, bugs, stylistic issues, and code quality problems.

[Prettier](https://prettier.io/) is a tool for formatting React and TypeScript code.

```bash
npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
```

Create `ESLint` config. Add a `.eslintrc.json` file in your project root:

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "@typescript-eslint", "jsx-a11y", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

Create `Prettier` config. Add a `.prettierrc` file.

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
```

Update `package.json` with linting scripts:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.tsx",
  "lint:fix": "eslint . --ext .ts,.tsx --fix"
}
```

### Install TypeScript type definitions for Node.js

TypeScript type definitions for Node.js adds Node.js environment typings so TypeScript can understand Node APIs.

```bash
npm install -D @types/node
```

### Install React Router

[React Router](https://reactrouter.com/) is a routing library for React applications, and is responsible for selecting what to show in the app for a requested path.

```bash
npm install react-router-dom
```

### Install React Hook Form

[React Hook Form](https://react-hook-form.com/) is a library for building forms for React applications.

```bash
npm install react-hook-form
```

### Install React Error Boundary

[React Error Boundary](https://github.com/bvaughn/react-error-boundary) component wraps around other React components to "catch" errors and render a fallback UI.

```bash
npm install react-error-boundary
```

### Install Zod

[Zod](https://github.com/colinhacks/zod) is a TypeScript-first schema validation with static type inference.

```bash
npm install zod
```

### Install Tailwind

[Tailwind](https://tailwindcss.com/) is a CSS framework made of small utility classes that help you build custom, responsive designs fast.

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace the contents of `src/index.css` with:

```TypeScript
@import 'tailwindcss';
```

### Edit `tsconfig` files

Update `tsconfig.json`.

```JSON
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".", 👈 add to resolve paths
    "paths": {
      "@/*": ["./src/*"] 👈 add to resolve paths
    }
  }
}
```

Update `tsconfig.app.json`.

```JSON
{
  "compilerOptions": {

    //...

    👇 add

    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }

    👆 add

    //...
  }
}
```

### Update `vite.config.ts`

```TypeScript
import path from "path" // 👈 add import
import tailwindcss from "@tailwindcss/vite" // 👈 add import
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // 👈 add tailwindcss() plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👈 add to resolve paths
    },
  },
})
```

### Install shadcn

Run the shadcn init command to setup your project.

```bash
npx shadcn@latest init
```

### Install tabler icons

```bash
npm install @tabler/icons-react
```

Set `iconLibrary` in `components.js` to `tabler`.

```JSON
{
  "$schema": "https://ui.shadcn.com/schema.json",

  // ...

  "iconLibrary": "tabler", 👈 change to tabler

   // ...

  "registries": {}
}
```

### Run

```bash
npm run dev
```

`http://localhost:5173/`
![Alt text](/readme-images/caddy-template.png?raw=true 'Caddy template')

# Create the Main Layout

Change the browser tab's title and icon in `index.html`.

```HTML
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 👇 change icon -->
    <link rel="icon" type="image/png" href="/globe.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Caddy</title>
    <!-- 👆 change title -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

In `App.css` change the `max-width` and `padding`.

```CSS
#root {
  max-width: 100%; 👈 change
  margin: 0 auto;
  padding: 0%; 👈 change
  text-align: center;
}
```

Add `shadcn` components.

```bash
npx shadcn@latest add sidebar
npx shadcn@latest add collapsible
```

Create the main sidebar header component `<AppSidebarHeader>`.

`/src/features/sidebar/app-sidebar-header.tsx`

```TypeScript
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { IconBrandGithub } from '@tabler/icons-react';

export function AppSidebarHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="hidden sm:flex"
            aria-label="GitHub"
          >
            <a
              href="https://github.com/grantcolley/caddy"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub className="!size-5" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
```

Create the main sidebar component `<AppSidebar>`.

`/src/features/sidebar/app-sidebar.tsx`

```TypeScript
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IconWorld } from '@tabler/icons-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type Props = {} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconWorld className="!size-5" />
                <span className="text-base font-semibold">Caddy</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
```

Replace the contents of the `<App>` component to to host the `<AppSidebar>` and `<AppSidebarHeader>`.

`/src/App.tsx`

```TypeScript
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/features/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/features/sidebar/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const App = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
```

In `main.tsx` wrap `<App>` with `<BrowserRouter>`.

`/src/main.tsx`

```TypeScript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 👈 import
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  👈 add
      <App />
    </BrowserRouter> 👈 add
  </StrictMode>
);
```

`http://localhost:5173/`
![Alt text](/readme-images/caddy-main-layout.png?raw=true 'Caddy main layout')

# Support Dark/Light Theme

Install `dropdown` and `tooltip` components.

```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tooltip
```

Create the `<ThemeProvider>` component.

`/src/app/providers/theme-provider.tsx`

```TypeScript
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

function getSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'caddy-ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored ?? defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (t: Theme) => {
      root.classList.remove('light', 'dark');
      root.classList.add(t === 'system' ? getSystemTheme() : t);
    };

    applyTheme(theme);

    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');

    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        localStorage.setItem(storageKey, t);
        setThemeState(t);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

Create the `<ThemeToggle>` component.

`/src/features/theme/theme-toggle.tsx`

```TypeScript
import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useTheme } from '@/app/providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <IconSun
                  className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
                  aria-label="Light mode"
                />
                <IconMoon
                  className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                  aria-label="Dark mode"
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <span className="mr-2 inline-flex w-4">
              {theme === 'light' ? <IconCheck className="h-4 w-4" /> : null}
            </span>
            Light
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <span className="mr-2 inline-flex w-4">
              {theme === 'dark' ? <IconCheck className="h-4 w-4" /> : null}
            </span>
            Dark
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme('system')}>
            <span className="mr-2 inline-flex w-4">
              {theme === 'system' ? <IconCheck className="h-4 w-4" /> : null}
            </span>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
```

In `main.tsx` wrap `<App>` with the `<ThemeProvider>`.

`/src/main.tsx`

```TypeScript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx'; // 👈 import
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="caddy-ui-theme"> 👈 add
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>  👈 add
  </StrictMode>
);
```

Add `<ThemeToggle>` to `sidebar-header.tsx`.

`/src/features/sidebar/app-sidebar-header.tsx`

```TypeScript
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { IconBrandGithub } from '@tabler/icons-react';
import { ThemeToggle } from '@/features/theme/theme-toggle'; // 👈 import

export function AppSidebarHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle /> // 👈 add
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="hidden sm:flex"
            aria-label="GitHub"
          >
            <a
              href="https://github.com/grantcolley/caddy"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub className="!size-5" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
```

`http://localhost:5173/`
![Alt text](/readme-images/caddy-theme.png?raw=true 'Caddy theme')

# Add Routing with `<RouterProvider>`

Add the classes so support a sidebar structure containing `modules`, `categories`, and `pages`, that will be mapped to `<Routes>`'s.

## Create Models for Config Driven Sidebar and Routing

Create the `PageRoute` class containing memebers required for mapping pages to `<Route>`'s.

`src/shared/models/page-route.tsx`

```TypeScript
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
```

Create the `Page` class which extends `PageRoute`.

`src/shared/models/page.tsx`

```TypeScript
import type { Icon as TablerIcon } from '@tabler/icons-react';
import { PageRoute } from './page-route';

export class Page extends PageRoute {
  name!: string;
  icon!: TablerIcon;
  permission!: string;
}
```

Create the `Category` class which contains a list of `pages`.

`src/shared/models/category.tsx`

```TypeScript
import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Page } from './page';

export class Category {
  categoryId!: number;
  name!: string;
  icon!: TablerIcon;
  permission!: string;
  pages: Page[] = [];
}
```

Create the `module` class which contains a list of `categories`.

`src/shared/models/module.tsx`

```TypeScript
import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Category } from './category';

export class Module {
  moduleId!: number;
  name!: string;
  icon!: TablerIcon;
  permission!: string;
  categories: Category[] = [];
}
```

## Create Components to Route to

`/src/features/dashboard/dashboard.tsx`

```TypeScript
const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-20">
          Dashboard!
        </h4>
      </div>
      <div className="flex justify-center">
        <p className="text-muted-foreground text-xl">
          This is the dashboard page.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
```

`/src/features/users/users.tsx`

```TypeScript
const Users: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-20">
          Users!
        </h4>
      </div>
      <div className="flex justify-center">
        <p className="text-muted-foreground text-xl">This is the users page.</p>
      </div>
    </div>
  );
};

export default Users;
```

`/src/features/errors/generic-error.tsx`

```TypeScript
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError();

  let message = '';
  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = 'The server encountered an error. Please try again later.';
    } else {
      message = `Unexpected error (status ${error.status}).`;
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-20">
          Oops!
        </h4>
      </div>
      <div className="flex justify-center">
        <p className="text-muted-foreground text-xl">Something went wrong.</p>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}
```

## Create Config Driven Routing

Create the `MODULE_CONFIG` returning an array of `module[]`.

`src/shared/config/module-config.tsx`

```TypeScript
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
```

## Create the Router

Create the `mapModulesToRoutesBreadcrumbsAndNav` and supporting files `breadcrumb-matcher.tsx`, `path-utils.tsx`, and `types.tsx`, which maps an array of `module[]` to routes.

`src/app/routing/types.tsx`

```TypeScript
export type BreadcrumbItem = { label: string; path: string };
export type BreadcrumbEntry = { pattern: string; trail: BreadcrumbItem[] };
```

`src/app/routing/path-utils.tsx`

```TypeScript
/**
 * Build an absolute path from URL-safe segments.
 * buildPath("admin", "users") -> "/admin/users"
 */
export function buildPath(...segments: string[]): string {
  return '/' + segments.map(stripSlashes).filter(Boolean).join('/');
}

/**
 * Join an absolute parent path with a child segment.
 * joinPaths("/admin/users", ":id") -> "/admin/users/:id"
 */
export function joinPaths(parent: string, child: string): string {
  return `${parent.replace(/\/+$/, '')}/${child.replace(/^\/+/, '')}`;
}

/**
 * Remove leading and trailing slashes.
 */
export function stripSlashes(value: string): string {
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * Assert a value exists (used to keep index routes safe).
 */
export function must(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

/**
 * Convert names into URL-safe slugs.
 */
export function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_/:%]+/g, '');
}

/**
 * Make a readable breadcrumb label from a path segment.
 */
export function prettifySegment(segment: string): string {
  if (segment.startsWith(':')) return segment.slice(1);
  return segment.replace(/-/g, ' ');
}
```

`src/app/routing/breadcrumb-matcher.tsx`

```TypeScript
import { type BreadcrumbItem } from './types';

export function getBreadcrumbTrail(
  pathname: string,
  breadcrumbByPattern: Map<string, BreadcrumbItem[]>
):
  | { pattern: string; trail: BreadcrumbItem[]; params: Record<string, string> }
  | undefined {
  const path = normalizePathname(pathname);

  let best:
    | {
        pattern: string;
        trail: BreadcrumbItem[];
        params: Record<string, string>;
        score: number;
      }
    | undefined;

  for (const [pattern, trail] of breadcrumbByPattern.entries()) {
    const m = match(pattern, path);
    if (!m.matched) continue;

    // Prefer more specific routes:
    // static segments > params > splats
    const score = m.staticCount * 1000 - m.paramCount * 10 - m.splatCount * 100;

    if (!best || score > best.score)
      best = { pattern, trail, params: m.params, score };
  }

  if (!best) return undefined;
  return { pattern: best.pattern, trail: best.trail, params: best.params };
}

function match(
  pattern: string,
  pathname: string
): {
  matched: boolean;
  params: Record<string, string>;
  staticCount: number;
  paramCount: number;
  splatCount: number;
} {
  const pat = split(pattern);
  const url = split(pathname);

  const params: Record<string, string> = {};
  let staticCount = 0;
  let paramCount = 0;
  let splatCount = 0;

  let i = 0;
  let j = 0;

  while (i < pat.length && j < url.length) {
    const p = pat[i]!;
    const u = url[j]!;

    if (p === '*') {
      params['*'] = url.slice(j).join('/');
      splatCount++;
      i++;
      j = url.length;
      break;
    }

    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(u);
      paramCount++;
      i++;
      j++;
      continue;
    }

    if (decodeURIComponent(p) !== decodeURIComponent(u)) {
      return {
        matched: false,
        params: {},
        staticCount: 0,
        paramCount: 0,
        splatCount: 0,
      };
    }

    staticCount++;
    i++;
    j++;
  }

  // Allow trailing splat
  if (i < pat.length && pat[i] === '*') {
    params['*'] = url.slice(j).join('/');
    splatCount++;
    i++;
    j = url.length;
  }

  const matched = i === pat.length && j === url.length;
  return {
    matched,
    params: matched ? params : {},
    staticCount,
    paramCount,
    splatCount,
  };
}

function split(p: string): string[] {
  const n = normalizePathname(p);
  if (n === '/') return [];
  return n.slice(1).split('/');
}

function normalizePathname(p: string): string {
  const s = p.trim() || '/';
  const withSlash = s.startsWith('/') ? s : `/${s}`;
  return withSlash !== '/' ? withSlash.replace(/\/+$/, '') : '/';
}
```

`src/app/routing/route-mapper.tsx`

```TypeScript
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

        // make it available for navigation
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

    // make it available for navigation
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
```

Create the `router.tsx` to build the routes using `react-router-dom`'s `createBrowserRouter`.

`src/app/routing/router.tsx`

```TypeScript
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
```

## Create the `<AppSidebarContent>`

Create the `<AppSidebarContent>` component to display navigation `modules`, `categories`, and `pages`.

`/src/features/sidebar/app-sidebar-content.tsx`

```TypeScript
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';
import { Module } from '@/shared/models/module';
import type { Icon as TablerIcon } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type Props = {
  modules: Module[];
};

function SidebarIcon({ icon: Icon }: { icon?: TablerIcon }) {
  if (!Icon) return null;
  // return <Icon className="mr-2 h-4 w-4 shrink-0" />;
  return <Icon />;
}

export function AppSidebarContent({ modules }: Props) {
  return (
    <>
      {modules.map((module) => (
        <SidebarGroup key={module.moduleId}>
          <SidebarGroupLabel>
            <SidebarIcon icon={module.icon} />
            <span>&nbsp;{module.name}</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {module.categories.map((category) => (
              <Collapsible
                key={category.categoryId}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={category.name}>
                      <SidebarIcon icon={category.icon} />
                      <span>{category.name}</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {category.pages?.map((page) => (
                        <SidebarMenuSubItem key={page.routeId}>
                          <SidebarMenuSubButton asChild>
                            {/* <Link to={page.fullPath ?? '/'}> */}
                            <Link to={page.fullPath}>
                              <SidebarIcon icon={page.icon} />
                              <span>{page.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
```

## Update Existing Components to Implement Routing

Update the `<AppSidebar>` component to receive `modules[]` and pass them to the `<AppSidebarContent>`.

`/src/features/sidebar/app-sidebar.tsx`

```TypeScript
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IconWorld } from '@tabler/icons-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Module } from '@/shared/models/module';
import { AppSidebarContent } from './app-sidebar-content';

type Props = { { /* 👈 Add */ }
  modules: Module[];
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ modules, ...props }: Props) { { /* 👈 update */ }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconWorld className="!size-5" />
                <span className="text-base font-semibold">Caddy</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarContent modules={modules}></AppSidebarContent> { /* 👈 update */ }
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
```

Update `App.tsx` component to receive `modules[]` and pass them to the `<AppSidebar>` .

`/src/App.tsx`

```TypeScript
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/features/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/features/sidebar/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Module } from '@/shared/models/module';

type Props = {   // 👈 add
  modules: Module[];
};

export const App = ({ modules }: Props) => {  { /* 👈 update */ }
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar modules={modules} variant="inset" />  { /* 👈 update */ }
      <SidebarInset>
        <AppSidebarHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
```

Finally, update `main.tsx` to replace `<>` with `<RouterProvider router={router} />`.

`src/main.tsx`

```TypeScript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';
import { router } from '@/app/routing/router'; // 👈 import
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="caddy-ui-theme">
      <RouterProvider router={router} /> { /* 👈 update */ }
    </ThemeProvider>
  </StrictMode>
);
```
