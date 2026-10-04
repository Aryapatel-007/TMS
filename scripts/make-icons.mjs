// Builds the app icons from public/brand/tms-mark.svg.
// Run after changing the mark:  node scripts/make-icons.mjs
//
// Writes src/app/icon.svg        (copper mark on night-walnut, rounded square)
//        src/app/apple-icon.png  (180 x 180, full-bleed, iOS rounds the corners itself)

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const mark = fs.readFileSync(path.join(root, "public/brand/tms-mark.svg"), "utf8");
const inner = mark
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .trim();

const COPPER = "#C99572"; // copper-glow reads better than copper at favicon size
const WALNUT = "#1A120E";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${WALNUT}"/>
  <g transform="translate(36 36) scale(1.4667)" fill="${COPPER}" style="color:${COPPER}">
    ${inner}
  </g>
</svg>
`;
fs.writeFileSync(path.join(root, "src/app/icon.svg"), icon);

const apple = icon.replace(`rx="104" `, "");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
await page.setContent(
  `<html><body style="margin:0;background:${WALNUT}"><div style="width:180px;height:180px">${apple.replace("<svg ", '<svg width="180" height="180" ')}</div></body></html>`,
);
await page.screenshot({ path: path.join(root, "src/app/apple-icon.png"), omitBackground: false });
await browser.close();
console.log("Wrote src/app/icon.svg and src/app/apple-icon.png");
