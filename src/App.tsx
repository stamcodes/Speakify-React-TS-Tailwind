// App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Authentication from "./pages/Auth";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
