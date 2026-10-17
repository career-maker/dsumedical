import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Beta stage: block indexing at the HTTP level too.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }] }];
  },
};

export default nextConfig;
