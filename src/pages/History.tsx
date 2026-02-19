import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import type { EvaluationRow } from "../types";
import "./History.css";

export function HistoryPage(): React.ReactElement {
  const [rows, setRows] = useState<EvaluationRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load(): Promise<void> {
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/evaluations`);
        if (!res.ok) {
          setError(`Server returned ${res.status}`);
          return;
        }
        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
          setError("Bad server response.");
          return;
        }
        setRows(data as EvaluationRow[]);
      } catch {
        setError("Could not reach server (partner may still be building it).");
      }
    }

    void load();
  }, []);

  return (
    <div className="history-container">
      <h1>History</h1>

      {error && <p className="error-message">{error}</p>}

      <table className="history-table">
        <thead>
          <tr>
            <th className="table-header">
              Created
            </th>
            <th className="table-header">
              Expression
            </th>
            <th className="table-header">
              Answer
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="table-cell">
                {new Date(r.createdAt).toLocaleString()}
              </td>
              <td className="table-cell">
                {r.a} {r.op} {r.b}
              </td>
              <td className="table-cell">
                {r.answer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
