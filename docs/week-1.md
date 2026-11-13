# Week 1 Log

## Day 1
- Created the repository and project structure
- Added README and .gitignore
- Set up the feature branch
- Generated Spring Boot 4.1.2 project (Java 17, Maven, Spring Web)
- Confirmed the server starts on port 8080
- Whitelabel Error Page confirmed the server is running
## Day 1 (continued)
- Merged PR #1 into main
- Found my Git email was set incorrectly and fixed it so commits link to my GitHub account
- Learned the dashboard counts only commits with 50+ changed characters
## Day 2
- Installed WSL 2 and Docker Desktop 4.99.0 (needed `wsl --install` in an admin PowerShell first)
- Confirmed the Docker engine is running, ready for Testcontainers
## Day 2(continued)
- Added Testcontainers 2.0 (testcontainers-postgresql) to the Spring Boot 4 backend
- Implemented EnvironmentService with create, list and destroy
- Exposed REST endpoints: POST/GET /api/environments, DELETE /api/environments/{id}
- Verified a PostgreSQL container starts and stops on demand (docker ps)