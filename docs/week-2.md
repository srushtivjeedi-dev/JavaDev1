
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
## 20 Nov
- Built EnvironmentPanel (create / refresh / select / destroy) and added selectedId state in App.jsx.
- Fixed CORS: WebConfig.java was outside src/main/java, so Spring ignored it. Moved it into com.shadowbase.backend.
- Lesson: file names must match the import and the class name exactly.
## 20 Nov
- Built EnvironmentPanel (create / refresh / select / destroy) and added selectedId state in App.jsx.
- Fixed CORS: WebConfig.java was outside src/main/java, so Spring ignored it. Moved it into com.shadowbase.backend.

## 22 Nov
- Wired the Run button to the backend (runSql) and added a result panel that shows success or the PostgreSQL error.

## 23 Nov
- Added infra/docker-compose.yml with a source PostgreSQL (wal_level=logical) as the first CDC step.

## 24 Nov
- Fixed the Run button: App.jsx now passes selectedId to SqlEditor (the id was not being passed, so Run always said "Select an environment first").
- Added validation to the /seed endpoint: blank SQL now returns 400 "SQL must not be empty." instead of silently loading the sample schema. A missing body still loads the sample schema.
- Tested: starter script shows a red error about orders, CREATE TABLE demo shows green Success, and an empty editor shows a red "SQL must not be empty."