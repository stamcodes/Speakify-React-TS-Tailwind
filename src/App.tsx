// App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Authentication from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authentication" element={<Authentication />} />
    </Routes>
  );
}

export default App;
