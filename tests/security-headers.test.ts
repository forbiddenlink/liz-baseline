import { describe, expect, it } from "vitest";
import { securityHeaders } from "../src/lib/security-headers";

const byKey = (key: string) => securityHeaders().find((h) => h.key === key);

describe("securityHeaders", () => {
  it("enforces the safe defaults", () => {
    expect(byKey("X-Content-Type-Options")?.value).toBe("nosniff");
    expect(byKey("Referrer-Policy")?.value).toBe("strict-origin-when-cross-origin");
    expect(byKey("X-Frame-Options")?.value).toBe("DENY");
    expect(byKey("Permissions-Policy")?.value).toContain("camera=()");
    expect(byKey("Strict-Transport-Security")?.value).toContain("max-age=");
  });

  it("ships CSP as report-only so a strict policy cannot break a new site", () => {
    expect(byKey("Content-Security-Policy")).toBeUndefined();
    const csp = byKey("Content-Security-Policy-Report-Only")?.value ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("allows the Sentry and PostHog hosts the template wires", () => {
    const csp = byKey("Content-Security-Policy-Report-Only")?.value ?? "";
    expect(csp).toContain("https://*.ingest.sentry.io");
    expect(csp).toContain("https://us.i.posthog.com");
  });
});
