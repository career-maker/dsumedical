import { clean } from "@/lib/form-validation";
import { isEnquiryKind, validateEnquiry } from "@/lib/enquiry-validation";

// Per-visitor limit. Strapi only sees this server's IP, so the real per-visitor limit lives here.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_VISITOR = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function allow(ip: string, now = Date.now()) {
  if (hits.size > 5000) for (const [key, hit] of hits) if (hit.resetAt <= now) hits.delete(key);
  const hit = hits.get(ip);
  if (!hit || hit.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  hit.count += 1;
  return hit.count <= MAX_PER_VISITOR;
}

/**
 * Visitor IP as set by the reverse proxy (nginx). X-Real-IP first; otherwise the LAST X-Forwarded-For
 * entry, which nginx appends (earlier entries can be faked by the visitor). Shared key when unknown.
 */
function clientIp(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return realIp || forwarded || "unknown";
}

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin && origin !== requestOrigin) {
    return Response.json({ error: "Cross-origin form submission is not allowed." }, { status: 403 });
  }

  // Same rules as the form: the browser checks can be bypassed, so check again here.
  let input: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    input = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isEnquiryKind(input.kind)) {
    return Response.json({ error: "Unknown enquiry type." }, { status: 400 });
  }
  const errors = validateEnquiry(input.kind, input);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  }
  if (!allow(clientIp(request))) {
    return Response.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const admission = input.kind === "admission";
  const submission = {
    kind: input.kind,
    name: clean(input.name),
    phone: clean(input.phone),
    email: clean(input.email),
    ...(admission ? { programme: clean(input.programme) } : { city: clean(input.city) }),
    message: clean(input.message),
    consent: true,
    sourcePage: clean(input.sourcePage).slice(0, 200),
    website: clean(input.website) // honeypot, checked by Strapi
  };

  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) throw new Error("STRAPI_API_URL must be configured for form submissions.");

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/enquiries`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(submission),
    cache: "no-store"
  });
  if (response.ok) return Response.json({ ok: true }, { status: 201 });

  // Pass Strapi's field errors (e.g. a programme that is no longer published) back to the form.
  const payload = (await response.json().catch(() => null)) as
    | { error?: { message?: string; details?: { errors?: Record<string, string> } } }
    | null;
  return Response.json(
    {
      error: payload?.error?.message ?? "We could not submit your request.",
      ...(payload?.error?.details?.errors ? { errors: payload.error.details.errors } : {})
    },
    { status: response.status === 429 ? 429 : response.status === 400 ? 400 : 502 }
  );
}
