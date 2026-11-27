// Shared form validators (ported from the WordPress jQuery rules; same rules as dsu-frontend's
// src/lib/form-validation.js). Each returns an error message, or "" when the value is valid.
// Pure functions: used by the enquiry form in the browser and by /api/enquiries on the server.

const LETTERS = "\\u0900-\\u097F\\u00C0-\\u024Fa-zA-Z";
const NAME_RE = new RegExp(`^[${LETTERS}\\s'.\\-]+$`);
const SUBJECT_RE = new RegExp(`^[${LETTERS}0-9\\s',.\\-]+$`);
const HAS_LETTER_RE = new RegExp(`[${LETTERS}]`);
const TEXT_RE = /^[a-zA-Z0-9\s.,!?'"()\-:;@#&%$*]+$/;
const SQL_RE = /literal|select|insert|update|delete|drop|union|--|;|\/\*|\*\/|exec|xp_/i;
const UNSAFE_RE = /[<>$%^&*#@!~`]/;
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

export const MAX = { name: 50, email: 256, subject: 50, message: 500 };

/** Collapse repeated spaces and trim, as the WordPress blur/submit handlers did. */
export const clean = (v: unknown) => String(v ?? "").trim().replace(/\s{2,}/g, " ");

const tooShort = "Minimum 2 characters required.";

export function validateName(value: unknown, required = true) {
  const v = clean(value);
  if (!v) return required ? "Please enter your name." : "";
  if (v.length < 2) return tooShort;
  if (v.length > MAX.name) return `Please enter no more than ${MAX.name} characters.`;
  if (!NAME_RE.test(v)) return "Only letters and spaces are allowed.";
  return "";
}

export function validateEmail(value: unknown, required = true) {
  const v = clean(value);
  if (!v) return required ? "Please enter your email address." : "";
  if (v.length > MAX.email) return `Please enter no more than ${MAX.email} characters.`;
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return "";
}

export function validatePhone(value: unknown, required = true) {
  const v = clean(value);
  if (!v) return required ? "Please enter your phone number." : "";
  const digits = v.replace(/\D/g, "");
  if (!PHONE_RE.test(v) || digits.length < 7 || digits.length > 15 || /^(\d)\1+$/.test(digits)) {
    return "Please enter a valid phone number with 7–15 digits.";
  }
  return "";
}

export function validateSubject(value: unknown, required = false) {
  const v = clean(value);
  if (!v) return required ? "This field is required." : "";
  if (v.length < 2) return tooShort;
  if (v.length > MAX.subject) return `Please enter no more than ${MAX.subject} characters.`;
  if (UNSAFE_RE.test(v)) return "Invalid input. Special characters and tags are not allowed.";
  if (!SUBJECT_RE.test(v) || !HAS_LETTER_RE.test(v)) {
    return "Only letters, numbers, spaces, and common punctuation are allowed.";
  }
  return "";
}

export function validateMessage(value: unknown, required = false) {
  const v = clean(value);
  if (!v) return required ? "Please enter a message." : "";
  if (v.length < 2) return tooShort;
  if (v.length > MAX.message) return `Please enter no more than ${MAX.message} characters.`;
  if (/[<>]/.test(v)) return "Invalid input. Special characters and tags are not allowed.";
  if (!TEXT_RE.test(v) || SQL_RE.test(v)) {
    return "Only letters, numbers, spaces, and common punctuation are allowed.";
  }
  return "";
}

/** Required choice (select). */
export function validateRequired(value: unknown, message = "This field is required.") {
  return clean(value) ? "" : message;
}

/** Required consent checkbox. */
export function validateConsent(value: unknown) {
  return value === true || value === "true" || value === "on" ? "" : "Please agree to be contacted to continue.";
}

export type Values = Record<string, unknown>;
export type Rules = Record<string, (value: unknown, values: Values) => string>;

/** Runs { field: (value) => message } rules over values; returns { field: message } for invalid ones. */
export function validateAll(values: Values, rules: Rules) {
  const errors: Record<string, string> = {};
  for (const key of Object.keys(rules)) {
    const message = rules[key](values[key], values);
    if (message) errors[key] = message;
  }
  return errors;
}
