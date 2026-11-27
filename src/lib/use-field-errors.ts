"use client";

import { useState } from "react";
import { validateAll, type Rules, type Values } from "./form-validation";

/** Per-field error state: validate(name, values) on blur/change, validateForm(values) on submit. */
export function useFieldErrors(rules: Rules) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = (name: string, values: Values) =>
    setErrors((prev) => ({ ...prev, [name]: rules[name]?.(values[name], values) ?? "" }));
  const validateForm = (values: Values) => {
    const next = validateAll(values, rules);
    setErrors(next);
    return next;
  };
  const reset = () => setErrors({});
  /** Replace all errors, e.g. with field errors returned by the server. */
  const setAll = (next: Record<string, string>) => setErrors(next);
  return { errors, validate, validateForm, reset, setAll };
}
