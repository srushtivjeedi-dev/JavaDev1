
# Week 2 Log

## 17 Nov
- Created branch feature/monaco-editor from main
- Scaffolded the React frontend in frontend/ with Vite (React template, ESLint)
- Replaced the starter page with a ShadowBase heading and updated the page title
## 18 Nov
- Installed @monaco-editor/react in the frontend
- Added an SqlEditor component with SQL syntax highlighting and a dark theme
- Added a Run button that logs the editor contents (backend wiring comes later)
- Verified in the browser console that Run logs the editor text
- npm audit flagged dompurify (via monaco-editor); added an npm override to dompurify 3.4.17 and confirmed 0 vulnerabilities with npm audit --omit=dev
## 19 Nov
- Added WebConfig in the backend to allow CORS from the React dev server (localhost:5173)
- Added frontend/src/api.js with createEnvironment, listEnvironments, destroyEnvironment and runSql
- Added a temporary connection check in App.jsx that logs the environment list
- Verified the page can call GET /api/environments without CORS errors