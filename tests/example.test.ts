import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../src/app/page";

const mail = vi.hoisted(() => ({ send: vi.fn(), construct: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mail.send };
    constructor(key?: string) {
      mail.construct(key);
      if (!key) throw new Error("Missing API key");
    }
  },
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("RESEND_API_KEY", undefined);
});
afterEach(() => vi.unstubAllEnvs());

describe("starter behavior", () => {
  it("renders the starter heading inside the main landmark", () => {
    const html = renderToStaticMarkup(createElement(HomePage));
    expect(html).toMatch(/<main\b/);
    expect(html).toMatch(/<h1[^>]*>liz-baseline<\/h1>/);
    expect(html).toContain("Replace this page.");
  });

  it("imports and skips email without an optional API key", async () => {
    const { sendEmail } = await import("../src/lib/resend");
    await expect(
      sendEmail({ to: "fixture@example.test", subject: "Fixture", html: "test" }),
    ).resolves.toBeNull();
    expect(mail.construct).not.toHaveBeenCalled();
    expect(mail.send).not.toHaveBeenCalled();
  });

  it("passes requested fields to a mocked client when configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "synthetic-fixture-only");
    mail.send.mockResolvedValue({ data: { id: "fixture" }, error: null });
    const { sendEmail } = await import("../src/lib/resend");
    const fields = {
      to: "fixture@example.test",
      from: "sender@example.test",
      subject: "Fixture",
      html: "test",
    };
    await expect(sendEmail(fields)).resolves.toEqual({ data: { id: "fixture" }, error: null });
    expect(mail.send).toHaveBeenCalledWith(fields);
  });
});
