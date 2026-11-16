package com.shadowbase.backend.environment;

/** Outcome of running a SQL script against a shadow database. */
public record ScriptResult(boolean success, String message) {
}