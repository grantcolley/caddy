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
    "baseUrl": ".", // 👈 add to resolve paths
    "paths": {
      "@/*": ["./src/*"] // 👈 add to resolve paths
    }
  }
}
```

Update `tsconfig.app.json`.

```JSON
{
  "compilerOptions": {
    // ...

    // 👇 add

    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }

    // 👆 add

    // ...
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
