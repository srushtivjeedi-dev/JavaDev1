import { useCallback, useEffect, useState } from "react";
import {
  createEnvironment,
  destroyEnvironment,
  listEnvironments,
} from "../api";

// Shows the running shadow databases with Create / Destroy buttons.
export default function EnvironmentPanel({ selectedId, onSelect }) {
  const [environments, setEnvironments] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setEnvironments(await listEnvironments());
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Load the list once when the page opens
  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreate = async () => {
    setBusy(true);
    try {
      const env = await createEnvironment();
      await refresh();
      onSelect(env.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDestroy = async (id) => {
    try {
      await destroyEnvironment(id);
      if (selectedId === id) onSelect(null);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
      <h2>Shadow environments</h2>

      <button onClick={handleCreate} disabled={busy}>
        {busy ? "Starting database..." : "Create environment"}
      </button>
      <button onClick={refresh} style={{ marginLeft: "0.5rem" }}>
        Refresh
      </button>

      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {environments.length === 0 ? (
        <p>No environments running. Click "Create environment" to start one.</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {environments.map((env) => (
            <li
              key={env.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "0.5rem 0.75rem",
                marginTop: "0.5rem",
                background: env.id === selectedId ? "#e8f0fe" : "white",
              }}
            >
              <strong>{env.id.slice(0, 8)}</strong> &middot; {env.status}
              <br />
              <small>{env.jdbcUrl}</small>
              <br />
              <button onClick={() => onSelect(env.id)}>
                {env.id === selectedId ? "Selected" : "Select"}
              </button>
              <button
                onClick={() => handleDestroy(env.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Destroy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}