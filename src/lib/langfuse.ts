// Langfuse (SDK v6, OpenTelemetry-based) for AI/LLM observability.
// Returns null when credentials are missing so AI routes can short-circuit cleanly.
//
// Uses an isolated tracer provider so Langfuse never touches the global OTEL
// provider that Sentry or @vercel/otel registers. Start observations with
// `startObservation` from "@langfuse/tracing" inside
// `context.with(ROOT_CONTEXT, ...)` from "@opentelemetry/api", or an unsampled
// parent span drops them.
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { setLangfuseTracerProvider } from "@langfuse/tracing";
import { AlwaysOnSampler, NodeTracerProvider } from "@opentelemetry/sdk-trace-node";

let processor: LangfuseSpanProcessor | null = null;

export function getLangfuse(): LangfuseSpanProcessor | null {
  if (!process.env.LANGFUSE_SECRET_KEY || !process.env.LANGFUSE_PUBLIC_KEY) return null;
  if (!processor) {
    processor = new LangfuseSpanProcessor({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl:
        process.env.LANGFUSE_BASE_URL || process.env.LANGFUSE_HOST || "https://cloud.langfuse.com",
      // Serverless: export each span as it ends instead of batching.
      exportMode: "immediate",
    });
    setLangfuseTracerProvider(
      new NodeTracerProvider({
        // Record every call; the default parent-based sampler would inherit
        // the Sentry sample rate and drop most generations.
        sampler: new AlwaysOnSampler(),
        spanProcessors: [processor],
      }),
    );
  }
  return processor;
}

export async function flushLangfuse(): Promise<void> {
  await processor?.forceFlush();
}
