import { siteMetadata } from "./siteMetadata";

it("omits canonical links and sitemap when the public URL is unknown", () => {
  expect(siteMetadata("")).toEqual({ tags: [], sitemap: "", robots: "" });
});

it("uses a normalized project subpath for canonical, social image and sitemap", () => {
  const metadata = siteMetadata("https://test.github.io/portfolio");
  expect(metadata.tags).toContainEqual({
    tag: "link",
    attrs: { rel: "canonical", href: "https://test.github.io/portfolio/" },
  });
  expect(metadata.tags).toContainEqual({
    tag: "meta",
    attrs: {
      property: "og:image",
      content: "https://test.github.io/portfolio/social-card.png",
    },
  });
  expect(metadata.sitemap).toContain(
    "<loc>https://test.github.io/portfolio/</loc>",
  );
  expect(metadata.sitemap).toContain(
    "<loc>https://test.github.io/portfolio/projects/</loc>",
  );
  expect(metadata.robots).toContain(
    "Sitemap: https://test.github.io/portfolio/sitemap.xml",
  );
});

it.each([
  "javascript:alert(1)",
  "file:///tmp/site",
  "https://user:password@example.com/",
  "not a url",
  "https://example.com/?query=1",
  "https://example.com/#hash",
])("rejects invalid public URL %s", (url) => {
  expect(() => siteMetadata(url)).toThrow();
});
