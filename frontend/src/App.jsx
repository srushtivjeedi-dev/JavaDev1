import { useState } from "react";
import EnvironmentPanel from "./components/EnvironmentPanel";
import SqlEditor from "./components/SqlEditor";

function App() {
  // The environment the user has selected (null = none yet)
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ShadowBase</h1>
      <p>Zero-downtime schema migration sandbox</p>

      <EnvironmentPanel
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <SqlEditor selectedId={selectedId} />
    </div>
  );
}

export default App;