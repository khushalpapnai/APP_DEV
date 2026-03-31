// src/utils/calc.ts
import { Parser } from "expr-eval";

/**
 * Auto-close unmatched parentheses.
 * Handles nested parentheses by counting opens vs closes.
 */
export function autoCloseParentheses(expr: string): string {
  const openCount = (expr.match(/\(/g) || []).length;
  const closeCount = (expr.match(/\)/g) || []).length;
  const diff = openCount - closeCount;
  return diff > 0 ? expr + ")".repeat(diff) : expr;
}

/**
 * Normalize display symbols to evaluator-friendly symbols.
 * e.g., replace '×' with '*', '÷' with '/'
 */
function normalizeForEval(expr: string): string {
  return expr.replace(/×/g, "*").replace(/÷/g, "/");
}

/**
 * Evaluate expression safely using expr-eval.
 * Returns 'Error' on failure.
 */
export function calculate(rawExpr: string): string {
  try {
    const fixed = autoCloseParentheses(rawExpr);
    const normalized = normalizeForEval(fixed);
    const parser = new Parser();
    const value = parser.evaluate(normalized);
    // Format result: remove trailing .0 for integers
    if (typeof value === "number" && Number.isFinite(value)) {
      const intVal = Math.trunc(value);
      return value === intVal ? String(intVal) : String(value);
    }
    return String(value);
  } catch {
    return "Error";
  }
}
