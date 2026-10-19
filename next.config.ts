import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 31536000,
    // Beta server can't run sharp (old glibc): serve pre-resized WebP files instead of the runtime optimiser.
    ...(process.env.NEXT_PUBLIC_OPT_IMAGES ? { loader: "custom" as const, loaderFile: "./src/lib/imageLoader.ts" } : {}),
  },
  async redirects() {
    return [
      { source: "/about", destination: "/university/about", permanent: false },
      { source: "/brochure", destination: "/admissions#resources", permanent: false },
      { source: "/prospectus", destination: "/admissions#resources", permanent: false },
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
