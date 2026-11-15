/**
 * Canonical site origin. Set NEXT_PUBLIC_APP_URL per project; the localhost
 * fallback keeps a fresh template from advertising a host it does not own.
 */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  return (raw || "http://localhost:3000").replace(/\/+$/, "");
}
