package com.shadowbase.backend.environment;

/** Body of a seed or script request. If sql is empty, the sample schema is used. */
public record ScriptRequest(String sql) {
}