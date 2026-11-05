export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin && origin !== requestOrigin) {
    return Response.json({ error: "Cross-origin form submission is not allowed." }, { status: 403 });
  }

  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) throw new Error("STRAPI_API_URL must be configured for form submissions.");

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/enquiries`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: await request.text(),
    cache: "no-store"
  });
  const body = await response.arrayBuffer();

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json"
    }
  });
}
