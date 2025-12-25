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
  - [Install Zod](#install-zod)
  - [Install Tailwind](#install-tailwind)
  - [Edit `tsconfig` files](#edit-tsconfig-files)
  - [Update `vite.config.ts`](#update-viteconfigts)
  - [Install shadcn](#install-shadcn)
  - [Install tabler icons](#install-tabler-icons)
  - [Run](#run)
- [Create the Main Layout](#create-the-main-layout)
- [Support Dark/Light Theme](#support-darklight-theme)

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

Create the main layout component `<MainLayout>` to host the `<AppSidebar>` and `<AppSidebarHeader>`.

`/src/app/layout/main-layout.tsx`

```TypeScript
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/features/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/features/sidebar/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const MainLayout = () => {
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

Replace the contents of the `<App>` component to simply return `<MainLayout />`.

`/src/App.tsx`

```TypeScript
import './App.css';
import { MainLayout } from './app/layout/main-layout';

function App() {
  return <MainLayout />;
}

export default App;
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

import { useTheme } from './theme-provider';

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
import { ThemeProvider } from './app/providers/theme-provider.tsx'; // 👈 import
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
