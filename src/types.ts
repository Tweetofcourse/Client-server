export type Op = "+" | "-" | "*" | "/";

export type EvaluationPayload = {
  a: number;
  b: number;
  op: Op;
  answer: number;
};

export type EvaluationRow = EvaluationPayload & {
  id: number;
  createdAt: string;
};
