import SqlEditor from "./components/SqlEditor";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ShadowBase</h1>
      <p>Zero-downtime schema migration sandbox</p>
      <SqlEditor />
    </div>
  );
}

export default App;