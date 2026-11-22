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
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "portfolio-publishing",
        buildStart() {
          const assets = [
            profile.resume,
            profile.portrait.path,
            ...projects.flatMap((project) =>
              project.screenshots.map((screenshot) => screenshot.path),
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
        transformIndexHtml() {
          return metadata.tags;
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
