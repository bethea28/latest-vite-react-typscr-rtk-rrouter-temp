# Project Name (Replace with your project's name)

This project is a React application built with Vite, TypeScript, and ESLint.

## Prerequisites

- **Node.js:** Version v20.18.1 was used here. You can download and install it from [nodejs.org](https://nodejs.org/).
- **npm:** npm is included with Node.js and will be used to install dependencies.

## Installation

1.  **Install dependencies:**

    ```bash
    npm install
    ```

## Scripts

The following scripts are available in the `package.json` file:

- **`npm run dev`:** Starts the development server with Vite. This will enable hot module replacement (HMR) for rapid development.
- **`npm run build`:** Builds the application for production. This will compile TypeScript files, bundle the application with Vite, and output the production-ready files to the `dist` directory.
- **`npm run lint`:** Runs ESLint to check for code quality and style issues.
- **`npm run preview`:** Starts a local server to preview the production build.
- **`npx vitest`:** Runs unit tests using Vitest.// must run vite test do not run jest test it will fail because jest doesnht have sufficient dom support for d3
- **`npm run type-check`:** Runs the TypeScript compiler in watch mode to check for type errors without emitting any output files. This is useful for continuous type checking during development.

## Development

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the URL displayed in the terminal (usually `http://localhost:5173`).

3.  Make changes to the source code, and the browser will automatically reload.

## Building for Production

1.  Build the application:

    ```bash
    npm run build
    ```

2.  The production build will be located in the `dist` directory.

3.  To preview the production build locally:

    ```bash
    npm run preview
    ```

## Linting

To check for code quality and style issues:

```bash
npm run lint
```
