import {
  validateAll,
  validateConsent,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateRequired,
  validateSubject,
  type Rules,
  type Values,
} from "./form-validation";

// Enquiry form rules, shared by the form (src/components/page/Explorers.tsx) and /api/enquiries.

export const ENQUIRY_KINDS = ["admission", "appointment", "contact"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export function enquiryRules(kind: EnquiryKind): Rules {
  return {
    name: (v) => validateName(v),
    phone: (v) => validatePhone(v),
    email: (v) => validateEmail(v),
    ...(kind === "admission"
      ? {
          // The value is the Programs entry's documentId; Strapi checks it is a published programme.
          programme: (v) => validateRequired(v, "Please select a programme."),
        }
      : { city: (v) => validateSubject(v) }),
    message: (v) => validateMessage(v),
    consent: (v) => validateConsent(v),
  };
}

export const isEnquiryKind = (value: unknown): value is EnquiryKind =>
  typeof value === "string" && (ENQUIRY_KINDS as readonly string[]).includes(value);

/** Validates a submission; returns { field: message } for invalid fields (empty when valid). */
export function validateEnquiry(kind: EnquiryKind, values: Values) {
  return validateAll(values, enquiryRules(kind));
}
