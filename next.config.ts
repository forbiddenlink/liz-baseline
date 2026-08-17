import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  disableLogger: true,
});
