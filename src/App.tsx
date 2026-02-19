import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CalculatorPage } from "./pages/CalculatorPage";
import { HistoryPage } from "./pages/HistoryPage";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div style={{ padding: 12, fontFamily: "system-ui" }}>
        <nav style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <Link to="/">Calculator</Link>
          <Link to="/history">History</Link>
        </nav>

        <Routes>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
