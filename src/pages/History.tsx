import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import type { EvaluationRow } from "../types";

export function HistoryPage(): JSX.Element {
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
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>History</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
              Created
            </th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
              Expression
            </th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
              Answer
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {new Date(r.createdAt).toLocaleString()}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {r.a} {r.op} {r.b}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {r.answer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
