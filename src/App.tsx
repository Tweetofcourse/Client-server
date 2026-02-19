import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CalculatorPage } from "./pages/calculatorPage";
import { HistoryPage } from "./pages/History";
import "./App.css";

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="app-nav">
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
