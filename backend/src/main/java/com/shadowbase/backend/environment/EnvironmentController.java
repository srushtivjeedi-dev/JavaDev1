package com.shadowbase.backend.environment;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST endpoints for managing shadow database environments.
 */
@RestController
@RequestMapping("/api/environments")
public class EnvironmentController {

    private final EnvironmentService service;

    public EnvironmentController(EnvironmentService service) {
        this.service = service;
    }

    @PostMapping
    public EnvironmentInfo create() {
        return service.create();
    }

    @GetMapping
    public List<EnvironmentInfo> list() {
        return service.list();
    }

    /**
     * Seed an environment. No SQL sent = sample schema; {"sql": "..."} = custom SQL;
     * blank SQL = 400.
     */
    @PostMapping("/{id}/seed")
    public ResponseEntity<ScriptResult> seed(
            @PathVariable String id,
            @RequestBody(required = false) ScriptRequest request) {

        String sql;
        if (request == null || request.sql() == null) {
            // No SQL sent at all: load the sample schema
            sql = service.sampleSchema();
        } else if (request.sql().isBlank()) {
            // SQL was sent but it is empty or only spaces: reject it
            return ResponseEntity.badRequest()
                    .body(new ScriptResult(false, "SQL must not be empty."));
        } else {
            sql = request.sql();
        }

        ScriptResult result = service.runScript(id, sql);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return result.success()
                ? ResponseEntity.ok(result)
                : ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> destroy(@PathVariable String id) {
        return service.destroy(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}