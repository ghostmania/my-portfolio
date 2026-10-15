import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { siteMetadata } from "./scripts/siteMetadata.ts";
import { profile } from "./src/data/profile.ts";
import { projects } from "./src/data/projects.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const metadata = siteMetadata(env.SITE_URL || "");
  return {
    base: `${(env.VITE_BASE_PATH || "/").replace(/\/+$/, "")}/`,
    build: {
      rolldownOptions: {
        input: {
          main: resolve("index.html"),
          projects: resolve("projects/index.html"),
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "portfolio-publishing",
        buildStart() {
          const assets = [
            profile.resume,
            ...projects.map((project) => project.screenshot?.path),
            ...projects.flatMap((project) =>
              (project.gallery ?? []).map((screenshot) => screenshot.path),
            ),
          ].filter((path): path is string => !!path);
          for (const asset of assets) {
            if (
              asset.startsWith("/") ||
              asset.includes("..") ||
              !existsSync(resolve("public", asset))
            ) {
              this.error(
                `Configured portfolio asset does not exist in public/: ${asset}`,
              );
            }
          }
        },
        transformIndexHtml(_html, context) {
          return metadata.tags.map((tag) => {
            if (
              context.path.endsWith("/projects/index.html") &&
              tag.attrs &&
              (tag.attrs.rel === "canonical" || tag.attrs.property === "og:url")
            ) {
              const key = tag.attrs.rel === "canonical" ? "href" : "content";
              return {
                ...tag,
                attrs: {
                  ...tag.attrs,
                  [key]: new URL("projects/", String(tag.attrs[key])).href,
                },
              };
            }
            return tag;
          });
        },
        generateBundle() {
          if (!metadata.sitemap) return;
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: metadata.sitemap,
          });
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: metadata.robots,
          });
        },
      },
    ],
  };
});
