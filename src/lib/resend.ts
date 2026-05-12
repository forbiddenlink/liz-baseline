// Resend transactional email helper.
// No-ops when RESEND_API_KEY is missing (useful in preview / local dev).
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from = "noreply@yourdomain.com",
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[Email] Skipped (no API key):", subject);
    return null;
  }
  return resend.emails.send({ from, to, subject, html });
}
