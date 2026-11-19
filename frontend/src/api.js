// Small client for the ShadowBase backend (Spring Boot on port 8080).
const BASE_URL = "http://localhost:8080/api/environments";

// Start a new shadow PostgreSQL database.
export async function createEnvironment() {
  const response = await fetch(BASE_URL, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Could not create environment (HTTP ${response.status})`);
  }
  return response.json();
}

// List every running environment.
export async function listEnvironments() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Could not list environments (HTTP ${response.status})`);
  }
  return response.json();
}

// Stop and remove one environment.
export async function destroyEnvironment(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Could not destroy environment (HTTP ${response.status})`);
  }
}

// Run SQL inside an environment. Returns { success, message }.
// A 400 is a normal outcome (a SQL error), so the JSON body is returned as is.
export async function runSql(id, sql) {
  const response = await fetch(`${BASE_URL}/${id}/seed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql }),
  });
  if (response.status === 404) {
    throw new Error("Environment not found");
  }
  return response.json();
}