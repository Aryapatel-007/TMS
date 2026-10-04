// Review screenshots with Playwright.
//
//   node scripts/shoot.mjs <folder> <path> [options]
//
//   <folder>          subfolder of assets/review/screens, for example phase-3
//   <path>            page path, for example / or /styleguide
//   --name <n>        file name prefix (default: page)
//   --widths <list>   comma list of widths, or w x h pairs (default: 390x844,1440x900)
//   --full            full-page screenshot
//   --selector <css>  screenshot one element only
//   --scroll <css>    scroll this element into view first
//   --reduced         emulate prefers-reduced-motion: reduce
//   --wait <ms>       wait before the screenshot (default 600)
//   --click <css>     click this element before the screenshot
//   --session-played  pretend the hero sequence already played this session
//
// Needs a running server. Set BASE_URL (default http://localhost:3100).

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const [folder, pagePath, ...rest] = process.argv.slice(2);
if (!folder || !pagePath) {
  console.error("Usage: node scripts/shoot.mjs <folder> <path> [options]");
  process.exit(1);
}

const opts = { name: "page", widths: "390x844,1440x900", wait: "600" };
for (let i = 0; i < rest.length; i++) {
  const key = rest[i].replace(/^--/, "");
  const next = rest[i + 1];
  if (next && !next.startsWith("--")) {
    opts[key] = next;
    i++;
  } else {
    opts[key] = true;
  }
}

const base = process.env.BASE_URL ?? "http://localhost:3100";
const outDir = path.join(root, "assets/review/screens", folder);
fs.mkdirSync(outDir, { recursive: true });

const sizes = String(opts.widths)
  .split(",")
  .map((s) => {
    const [w, h] = s.split("x").map(Number);
    return { width: w, height: h || (w < 700 ? 844 : 900) };
  });

const browser = await chromium.launch();
for (const viewport of sizes) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: opts.reduced ? "reduce" : "no-preference",
    hasTouch: viewport.width < 700,
    isMobile: viewport.width < 700,
  });
  if (opts["session-played"]) {
    await context.addInitScript(() => sessionStorage.setItem("tms-hero-played", "1"));
  }
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + pagePath, { waitUntil: "networkidle" });
  if (opts.scroll) await page.locator(opts.scroll).first().scrollIntoViewIfNeeded();
  if (opts.click) await page.locator(opts.click).first().click();
  if (opts.full) {
    // scroll through once so lazy images load
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
  }
  await page.waitForTimeout(Number(opts.wait));
  const file = path.join(outDir, `${opts.name}-${viewport.width}.png`);
  if (opts.selector) {
    await page.locator(opts.selector).first().screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: Boolean(opts.full) });
  }
  console.log("saved", path.relative(root, file), errors.length ? `console errors: ${errors.join(" | ")}` : "");
  await context.close();
}
await browser.close();
