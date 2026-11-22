// Regenerates public/social-card.png (1200×630) from the Portrait and the
// site's own typefaces. Run with: node scripts/generateSocialCard.mjs
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const dataUrl = (path, type) =>
  `data:${type};base64,${readFileSync(resolve(path)).toString("base64")}`;
const font = dataUrl(
  "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  "font/woff2",
);
const portrait = dataUrl("public/portrait.webp", "image/webp");

const html = `<!doctype html>
<style>
  @font-face { font-family: Display; font-weight: 300 700; src: url(${font}) format("woff2"); }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; padding: 72px 80px; background: #f5f6f8; color: #12151c;
    font-family: Display, sans-serif; display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: center; }
  .domain { font-size: 30px; font-weight: 500; letter-spacing: -0.02em; }
  .domain span { color: #1f3fd0; }
  h1 { margin-top: 56px; font-size: 84px; font-weight: 500; line-height: 1; letter-spacing: -0.04em; }
  p { margin-top: 28px; font-size: 34px; color: #4d5665; letter-spacing: -0.01em; }
  img { width: 380px; height: 380px; border-radius: 36px; object-fit: cover; }
</style>
<div>
  <div class="domain">igorborisenko<span>.dev</span></div>
  <h1>Igor Borisenko</h1>
  <p>Senior Full-stack Developer</p>
</div>
<img src="${portrait}" alt="" />`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.waitForFunction('document.fonts.status === "loaded"');
await page.screenshot({ path: "public/social-card.png" });
await browser.close();
