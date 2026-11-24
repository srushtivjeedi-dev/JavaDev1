# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Running locally

Requirements: Java 17+, Node 20+, Docker Desktop (engine running).

1. Start the backend (port 8080):
   ```
   cd backend
   .\mvnw spring-boot:run
   ```
2. Start the frontend (port 5173) in a second terminal:
   ```
   cd frontend
   npm run dev
   ```
3. Open http://localhost:5173, click **Create environment**, then **Select**, and run SQL from the editor.

Optional CDC source database (port 5433, `wal_level=logical`):
```
cd infra
docker compose up -d
```