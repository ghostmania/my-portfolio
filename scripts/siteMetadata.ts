import type { HtmlTagDescriptor } from "vite";

export function siteMetadata(siteUrl: string): {
  tags: HtmlTagDescriptor[];
  sitemap: string;
  robots: string;
} {
  if (!siteUrl) return { tags: [], sitemap: "", robots: "" };
  const url = new URL(siteUrl);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTPS public URL without credentials, query or fragment.",
    );
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  const canonical = url.href;
  const image = new URL("social-card.png", canonical).href;
  const xmlUrl = canonical
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return {
    tags: [
      { tag: "link", attrs: { rel: "canonical", href: canonical } },
      { tag: "meta", attrs: { property: "og:url", content: canonical } },
      { tag: "meta", attrs: { property: "og:image", content: image } },
      {
        tag: "meta",
        attrs: {
          property: "og:image:alt",
          content: "Igor — building digital products that make an impact.",
        },
      },
      { tag: "meta", attrs: { name: "twitter:image", content: image } },
    ],
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlUrl}</loc></url><url><loc>${xmlUrl}projects/</loc></url></urlset>\n`,
    robots: `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n`,
  };
}
