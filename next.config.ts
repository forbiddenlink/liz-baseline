import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders() }];
  },
};

// Wrap with Sentry. The actual upload of source maps only runs when
// SENTRY_AUTH_TOKEN is set (typically in CI).
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "imkindageeky",
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
