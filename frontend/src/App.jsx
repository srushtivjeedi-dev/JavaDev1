import { useEffect } from "react";
import SqlEditor from "./components/SqlEditor";
import { listEnvironments } from "./api";

function App() {
  // Connection check: logs the list of environments (empty if none are running)
  useEffect(() => {
    listEnvironments()
      .then((envs) => console.log("Environments from backend:", envs))
      .catch((err) => console.error("Backend call failed:", err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ShadowBase</h1>
      <p>Zero-downtime schema migration sandbox</p>
      <SqlEditor />
    </div>
  );
}

export default App;