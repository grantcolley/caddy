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

Create the main header component `<AppSidebarHeader>`.

`/src/app/layout/components/app-sidebar-header.tsx`

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

`/src/app/layout/components/app-sidebar.tsx`

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

`/src/app/layout/components/main-layout.tsx`

```TypeScript
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/app/layout/components/app-sidebar';
import { AppSidebarHeader } from '@/app/layout/components/app-sidebar-header';
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

Replace the contents of the <App> component to simply return <MainLayout />.

`/src/App.tsx`

```TypeScript
import './App.css';
import { MainLayout } from './app/layout/components/main-layout';

function App() {
  return <MainLayout />;
}

export default App;
```

In `main.tsx` wrap <App> with <BrowserRouter>.

```TypeScript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 👈 import
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 👈 add
      <App />
    </BrowserRouter> 👈 add
  </StrictMode>
);
```

`http://localhost:5173/`
![Alt text](/readme-images/caddy-main-layout.png?raw=true 'Caddy main layout')
