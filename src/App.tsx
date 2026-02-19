import React from "react";
import { CalculatorPage } from "./pages/calculatorPage";
import { HistoryPage } from "./pages/History";
import "./App.css";
import {useState} from "react";

export default function App(): React.ReactElement {
  const [showCalculatorPage, setshowCalculatorPage] = useState<boolean>(true);
  return (
      <div className="app-container">
        
        { (showCalculatorPage == true ?<CalculatorPage /> : <HistoryPage />)}
        <button onClick={() => setshowCalculatorPage(!showCalculatorPage)}>Click me</button>

         
      </div>
  );
}