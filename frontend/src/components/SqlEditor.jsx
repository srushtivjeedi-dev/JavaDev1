import { useState } from "react";
import Editor from "@monaco-editor/react";

const DEFAULT_SQL = `-- Write your migration script here
ALTER TABLE orders ADD COLUMN notes TEXT;
`;

export default function SqlEditor() {
  const [sql, setSql] = useState(DEFAULT_SQL);

  // For now the Run button only logs the SQL.
  // It will call the backend seed endpoint in a later step.
  const handleRun = () => {
    console.log("Run clicked. SQL:", sql);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <button onClick={handleRun}>Run on shadow database</button>
      </div>
      <Editor
        height="50vh"
        language="sql"
        theme="vs-dark"
        value={sql}
        onChange={(value) => setSql(value ?? "")}
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />
    </div>
  );
}