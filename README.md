# caddy

# [Setup](#setup)

# Setup

### [Install Vite](#install-vite)

### [Install dependencies](#install-dependencies)

### [Run the Development Server](#run-the-development-server)

### [Install ESLint & Prettier](#install-eslint--prettier)

### Install Vite

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
