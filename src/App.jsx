import Home from "./pages/Home";
import SummaryPage from "./pages/SummaryPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="summary/:id" element={<SummaryPage />} />
      </Routes>
    </div>
  );
}
