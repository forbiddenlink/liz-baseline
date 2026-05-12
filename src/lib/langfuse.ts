// Langfuse client for AI/LLM observability.
// Returns null when credentials are missing so AI routes can short-circuit cleanly.
import { Langfuse } from "langfuse";

let langfuse: Langfuse | null = null;

export function getLangfuse(): Langfuse | null {
  if (!process.env.LANGFUSE_SECRET_KEY) return null;
  if (!langfuse) {
    langfuse = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_BASE_URL,
    });
  }
  return langfuse;
}

export async function flushLangfuse(): Promise<void> {
  await langfuse?.flushAsync();
}
