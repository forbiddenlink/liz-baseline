export type HeaderEntry = { key: string; value: string };

// Content-Security-Policy ships report-only: Next.js emits inline bootstrap
// scripts, and a strict enforced policy needs per-request nonces. Tighten this
// (and rename the header) once the site's real script sources are known.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://us.i.posthog.com https://us-assets.i.posthog.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export function securityHeaders(): HeaderEntry[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // X-Frame-Options is enforced because frame-ancestors is ignored in
    // report-only CSP.
    { key: "X-Frame-Options", value: "DENY" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    },
    { key: "Content-Security-Policy-Report-Only", value: csp },
  ];
}
