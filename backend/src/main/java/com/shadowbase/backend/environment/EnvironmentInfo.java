package com.shadowbase.backend.environment;

import java.time.Instant;

/**
 * Details of one shadow database that the API returns to the UI.
 */
public record EnvironmentInfo(
        String id,
        String jdbcUrl,
        String username,
        String password,
        String status,
        Instant createdAt) {
}