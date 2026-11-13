package com.shadowbase.backend.environment;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.testcontainers.postgresql.PostgreSQLContainer;

import jakarta.annotation.PreDestroy;

/**
 * Starts, lists and destroys temporary PostgreSQL shadow databases.
 */
@Service
public class EnvironmentService {

    // One running container plus the time it was created
    private record Entry(PostgreSQLContainer container, Instant createdAt) {
    }

    // id -> running environment (thread-safe map)
    private final Map<String, Entry> environments = new ConcurrentHashMap<>();

    /** Start a new PostgreSQL container and remember it. */
    public EnvironmentInfo create() {
        PostgreSQLContainer container = new PostgreSQLContainer("postgres:16")
                .withDatabaseName("shadow")
                .withUsername("shadow")
                .withPassword("shadow");
        container.start();

        String id = UUID.randomUUID().toString();
        Entry entry = new Entry(container, Instant.now());
        environments.put(id, entry);
        return toInfo(id, entry);
    }

    /** List every environment that is currently running. */
    public List<EnvironmentInfo> list() {
        return environments.entrySet().stream()
                .map(e -> toInfo(e.getKey(), e.getValue()))
                .toList();
    }

    /** Stop and remove one environment. Returns false if the id is unknown. */
    public boolean destroy(String id) {
        Entry entry = environments.remove(id);
        if (entry == null) {
            return false;
        }
        entry.container().stop();
        return true;
    }

    /** When the backend shuts down, stop all containers so none are left behind. */
    @PreDestroy
    public void destroyAll() {
        environments.values().forEach(entry -> entry.container().stop());
        environments.clear();
    }

    private EnvironmentInfo toInfo(String id, Entry entry) {
        PostgreSQLContainer c = entry.container();
        String status = c.isRunning() ? "RUNNING" : "STOPPED";
        return new EnvironmentInfo(id, c.getJdbcUrl(), c.getUsername(),
                c.getPassword(), status, entry.createdAt());
    }
}