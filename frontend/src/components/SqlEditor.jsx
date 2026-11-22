import { useState } from "react";
import Editor from "@monaco-editor/react";
import { runSql } from "../api";

const STARTER_SQL =
  "-- Write your migration script here\nALTER TABLE orders ADD COLUMN notes TEXT;\n";

function SqlEditor({ selectedId }) {
  const [sql, setSql] = useState(STARTER_SQL);
  const [result, setResult] = useState(null); // { success, message }
  const [running, setRunning] = useState(false);

  async function handleRun() {
    if (!selectedId) {
      setResult({ success: false, message: "Select an environment first." });
      return;
    }
    try {
      setRunning(true);
      setResult(null);
      const response = await runSql(selectedId, sql);
      setResult(response);
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div>
      <button onClick={handleRun} disabled={running}>
        {running ? "Running..." : "Run on shadow database"}
      </button>

      <Editor
        height="400px"
        language="sql"
        theme="vs-dark"
        value={sql}
        onChange={(value) => setSql(value ?? "")}
      />

      {result && (
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            whiteSpace: "pre-wrap",
            color: result.success ? "green" : "crimson",
            background: result.success ? "#e8f5e9" : "#fdecea",
          }}
        >
          {result.success ? "Success: " : "Error: "}
          {result.message}
        </pre>
      )}
    </div>
  );
}

export default SqlEditor;