import { useMemo, useState } from "react";
import type { Op } from "../types";
import type { EvaluationPayload } from "../types";
import { API_BASE_URL } from "../config";

type AnswerState =
  | { kind: "empty" }
  | { kind: "ready"; a: number; b: number; op: Op; answer: number }
  | { kind: "error"; message: string };

function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function postEvaluation(payload: EvaluationPayload): Promise<void> {
  // If server isn't running yet, this will fail. That's okay during dev.
  await fetch(`${API_BASE_URL}/evaluations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function CalculatorPage(): JSX.Element {
  const [aText, setAText] = useState<string>("");
  const [bText, setBText] = useState<string>("");
  const [status, setStatus] = useState<AnswerState>({ kind: "empty" });
  const [savingMsg, setSavingMsg] = useState<string | null>(null);

  const a = useMemo(() => parseNumber(aText), [aText]);
  const b = useMemo(() => parseNumber(bText), [bText]);

  async function compute(op: Op): Promise<void> {
    if (a === null || b === null) {
      setStatus({ kind: "error", message: "Enter both numbers first." });
      return;
    }
    if (op === "/" && b === 0) {
      setStatus({ kind: "error", message: "Divisor cannot be 0." });
      return;
    }

    const answer =
      op === "+"
        ? a + b
        : op === "-"
        ? a - b
        : op === "*"
        ? a * b
        : a / b;

    setStatus({ kind: "ready", a, b, op, answer });

    // attempt to save to server
    setSavingMsg("Saving...");
    try {
      await postEvaluation({ a, b, op, answer });
      setSavingMsg("Saved ✅");
    } catch {
      // server might not exist yet (partner working on it)
      setSavingMsg("Could not reach server (okay for now).");
    } finally {
      setTimeout(() => setSavingMsg(null), 1500);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>Calculator</h1>

      <div style={{ display: "flex", gap: 12 }}>
        <label style={{ flex: 1 }}>
          First number
          <input
            type="number"
            value={aText}
            onChange={(e) => setAText(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label style={{ flex: 1 }}>
          Second number
          <input
            type="number"
            value={bText}
            onChange={(e) => setBText(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => void compute("+")}>Add</button>
        <button onClick={() => void compute("-")}>Subtract</button>
        <button onClick={() => void compute("*")}>Multiply</button>
        <button onClick={() => void compute("/")}>Divide</button>
      </div>

      <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd" }}>
        <h2>Answer</h2>

        {status.kind === "empty" && <p>Enter numbers and click a button.</p>}
        {status.kind === "error" && (
          <p style={{ color: "crimson" }}>{status.message}</p>
        )}
        {status.kind === "ready" && (
          <p style={{ fontSize: 22 }}>
            {status.a} {status.op} {status.b} = {status.answer}
          </p>
        )}

        {savingMsg && <p>{savingMsg}</p>}
      </div>
    </div>
  );
}
