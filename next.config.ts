import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: { inlineCss: true }, // no render-blocking stylesheet requests
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 31536000,
    // Beta server can't run sharp (old glibc): serve pre-resized WebP files instead of the runtime optimiser.
    ...(process.env.NEXT_PUBLIC_OPT_IMAGES ? { loader: "custom" as const, loaderFile: "./src/lib/imageLoader.ts" } : {}),
  },
  async redirects() {
    return [
      { source: "/news", destination: "/events", permanent: false },
      { source: "/about", destination: "/university/about", permanent: false },
      { source: "/brochure", destination: "/docs/admission-brochure.pdf", permanent: false },
      { source: "/prospectus", destination: "/docs/admission-brochure.pdf", permanent: false },
      { source: "/research/ongoing-activities", destination: "/research/ongoing-research-activities", permanent: true },
      { source: "/research/student-activities", destination: "/research/student-research-activities", permanent: true },
      { source: "/university/policies/anti-ragging", destination: "/university/policies/anti-ragging-policy", permanent: true },
      { source: "/university/policies/grievance-redressal", destination: "/university/policies/grievance-redressal-committee", permanent: true },
      { source: "/university/policies/pwbd-committee", destination: "/university/policies/pw-bd-committee", permanent: true },
      { source: "/university/policies/anti-ragging-committee", destination: "/university/anti-ragging-committee", permanent: true },
      { source: "/department/gastroenterology", destination: "/department/general-medicine", permanent: true },
      // Truncated links present in CMS content.
      { source: "/admiss", destination: "/admissions", permanent: true },
      { source: "/admissi", destination: "/admissions", permanent: true },
      { source: "/admissio", destination: "/admissions", permanent: true },
      { source: "/admission", destination: "/admissions", permanent: true },
      { source: "/enquir", destination: "/enquiry", permanent: true },
      { source: "/enquire", destination: "/enquiry", permanent: true },
      { source: "/progra", destination: "/programs", permanent: true },
      { source: "/program", destination: "/programs", permanent: true },
    ];
  },
  // Beta stage: block indexing at the HTTP level too.
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }] },
      { source: "/icons/:file*", headers: immutable },
      { source: "/images/:file*", headers: immutable },
      { source: "/_opt/:path*", headers: immutable },
    ];
  },
};

export default nextConfig;
