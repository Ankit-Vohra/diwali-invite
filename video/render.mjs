import { chromium } from "/Users/ankit/jarvis/node_modules/playwright-core/index.mjs";
import { mkdirSync } from "node:fs";
const dir = process.argv[2], FPS = 24, D = 9, only = process.argv[3];
mkdirSync(`${dir}/frames`, { recursive: true });
const b = await chromium.launch({ executablePath: "/Users/ankit/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell", args: ["--allow-file-access-from-files"] });
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
await p.goto(`file://${dir}/index.html`); await p.waitForFunction("window.__ready === true");
const frames = only ? only.split(",").map(Number) : Array.from({ length: FPS * D }, (_, i) => i);
for (const f of frames) { await p.evaluate((t) => window.seek(t), f / FPS); await p.screenshot({ path: `${dir}/frames/${String(f).padStart(4, "0")}.jpg`, type: "jpeg", quality: 92 }); }
await b.close(); console.log("frames", frames.length);
