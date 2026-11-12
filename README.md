# ShadowBase: Zero-Downtime Schema Migration Sandbox

ShadowBase lets database admins safely test risky schema changes.
It creates a temporary clone of a database, copies live production
traffic onto it, and shows in real time whether the new schema
causes SQL errors, before anything touches production.

## How it works
1. Spin up a temporary PostgreSQL clone (Testcontainers)
2. Capture live database changes (Debezium + Kafka)
3. Replay them on the clone (Java Streams)
4. Apply a migration script and watch the error rate in the UI

## Tech Stack
Java 17, Spring Boot, Testcontainers, Debezium, Kafka, PostgreSQL,
React, Vite, Monaco Editor, Docker

## Project Structure
| Folder | Purpose |
|---|---|
| backend/ | Spring Boot application |
| frontend/ | React + Monaco developer UI |
| infra/ | Docker Compose for Kafka and Debezium |
| docs/ | Architecture notes and weekly logs |

## Progress

### Week 1
- [x] Repo setup
- [x] Spring Boot skeleton
- [ ] Environment endpoints (create / list / destroy)
- [ ] Seed endpoint
- [ ] React + Monaco scaffold
- [ ] UI connected to backend