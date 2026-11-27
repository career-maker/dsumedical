// Form options from Strapi collection types (published programmes for the admission dropdown).
export async function GET() {
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) return Response.json({ data: { programmes: [] } }, { status: 503 });

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/enquiry-options`, { cache: "no-store" });
  if (!response.ok) return Response.json({ data: { programmes: [] } }, { status: 502 });
  return new Response(await response.arrayBuffer(), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=60, stale-while-revalidate=300"
    }
  });
}
