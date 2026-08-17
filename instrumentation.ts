// Next.js instrumentation file - runs once per server start.
// Wires OpenTelemetry via @vercel/otel and bridges Sentry into the runtime.
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME || "app",
  });

  if (process.env.NEXT_RUNTIME === "nodejs") {
    import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    import("./sentry.edge.config");
  }
}

export const onRequestError: import("next").Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(err, request, context);
};
