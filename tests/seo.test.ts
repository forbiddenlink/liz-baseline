import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { metadata } from "../src/app/layout";
import NotFound from "../src/app/not-found";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { siteUrl } from "../src/lib/site";

afterEach(() => vi.unstubAllEnvs());

describe("seo defaults", () => {
  it("falls back to localhost when NEXT_PUBLIC_APP_URL is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    expect(siteUrl()).toBe("http://localhost:3000");
  });

  it("uses NEXT_PUBLIC_APP_URL without a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com/");
    expect(siteUrl()).toBe("https://example.com");
  });

  it("robots points at the sitemap on the site host", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");
    expect(robots().sitemap).toBe("https://example.com/sitemap.xml");
  });

  it("sitemap lists the home page on the site host", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");
    expect(sitemap().map((e) => e.url)).toEqual(["https://example.com"]);
  });

  it("layout sets metadataBase and canonical", () => {
    expect(metadata.metadataBase).toBeInstanceOf(URL);
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("not-found renders a heading and a way home", () => {
    const html = renderToStaticMarkup(createElement(NotFound));
    expect(html).toContain("<h1");
    expect(html).toContain('href="/"');
  });
});
