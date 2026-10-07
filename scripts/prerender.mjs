/**
 * Prerender script — generates static HTML per route using headless Chromium.
 * Runs after `vite build`. Replayable via `npm run build`.
 *
 * Routes: /, /blog, /blog/:slug (x3), /mentions-legales, /politique-confidentialite
 * Excludes: /404 (generic), invalid slugs (client-side only + noindex).
 */

import { createServer } from 'http';
import { createServer as createNetServer } from 'net';
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PREVIEW_PORT = 4173;
const ANIMATION_DELAY = 1200; // ms — covers framer-motion opacity:0→1 (500ms) + network settle

// ─── Find free port ───────────────────────────────────────────────────────────
async function findFreePort(startPort) {
  return new Promise((resolve) => {
    const s = createNetServer();
    s.on('error', () => {
      // try next port
      resolve(findFreePort(startPort + 1));
    });
    s.listen(startPort, () => {
      s.close(() => resolve(startPort));
    });
  });
}

// ─── Chromium path ────────────────────────────────────────────────────────────
// Local dev (Windows): preinstalled Chromium. Vercel build (Linux): no system
// browser → fall back to @sparticuz/chromium (serverless build of Chromium).
const CHROME_PATHS = [
  'C:/Users/Ludo/AppData/Local/hermes/tools/chromium-1208/chrome-win64/chrome.exe',
  'C:/Users/Ludo/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe',
  'C:/Users/Ludo/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe',
];

async function resolveChrome() {
  const local = CHROME_PATHS.find((p) => existsSync(p)) ?? null;
  if (local) return { executablePath: local, args: [] };
  try {
    const { default: chromium } = await import('@sparticuz/chromium');
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
    };
  } catch {
    return null;
  }
}

// ─── Routes to prerender ─────────────────────────────────────────────────────
const ROUTES = [
  { path: '/', label: 'home' },
  { path: '/blog', label: 'blog-index' },
  {
    path: '/blog/externaliser-gestion-administrative-pme',
    label: 'blog-article-1',
  },
  {
    path: '/blog/organiser-papiers-administratifs-particulier',
    label: 'blog-article-2',
  },
  {
    path: '/blog/preparer-dossier-retraite-sereinement',
    label: 'blog-article-3',
  },
  { path: '/mentions-legales', label: 'mentions-legales' },
  {
    path: '/politique-confidentialite',
    label: 'politique-confidentialite',
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForNetworkIdle(page, timeout = 5000) {
  await page.waitForFunction(
    () => {
      return (
        document.readyState === 'complete' &&
        window.fetch !== undefined &&
        performance.getEntriesByType('resource').every((r) => r.responseStatus < 400)
      );
    },
    { timeout }
  );
}

/** Wait for framer-motion animations to settle */
async function waitForAnimations(page) {
  await page.waitForFunction(
    () => {
      // Check that no element has opacity:0 from framer-motion initial state
      // framer-motion sets opacity via CSS custom properties or direct style
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const style = window.getComputedStyle(el);
        if (style.opacity === '0' && style.display !== 'none') return false;
      }
      return true;
    },
    { timeout: 5000 }
  );
}

// ─── HTTP server (serves dist/) ───────────────────────────────────────────────
// IMPORTANT: HTML is ALWAYS served from the in-memory pristine SHELL captured
// right after `vite build`. Never from disk: route files written during this
// run already contain a previous snapshot's Helmet tags, and serving them
// would accumulate duplicate meta/canonical on every rebuild.
function startPreviewServer(port, shellHtml) {
  const server = createServer(async (req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    const distPath = path.join(DIST, urlPath);

    // Check if it's a file
    if (existsSync(distPath) && !statSync(distPath).isDirectory()) {
      const ext = path.extname(distPath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.png': 'image/png',
        '.ico': 'image/x-icon',
      };
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'text/plain',
      });
      res.end(await readFile(distPath));
      return;
    }

    // Try index.html inside the path (for pre-rendered routes)
    // → volontairement ignoré : on sert toujours le SHELL vierge (voir ci-dessus).
    // Fallback to pristine SPA shell (in-memory, never the on-disk file which
    // this run is overwriting route by route)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(shellHtml);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

// ─── Puppeteer snapshot ──────────────────────────────────────────────────────
async function snapshotRouteWithPort(browser, route, port) {
  const { path: routePath, label } = route;
  const url = `http://localhost:${port}${routePath}`;

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 });

    // Wait for network to settle
    await sleep(300); // small settle gap

    // Wait for animations
    await sleep(ANIMATION_DELAY);

    // Also scroll to top (some sections animate on scroll)
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(200);

    // Capture full HTML
    const html = await page.content();

    // Build output path: dist/<route>/index.html
    const outDir = path.join(DIST, routePath === '/' ? '' : routePath);
    await mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');

    // Inject canonical if missing (some pages may not have it in static shell)
    // Write as-is; React has already rendered with correct Helmet tags
    await writeFile(outFile, html, 'utf-8');

    console.log(`  ✓ ${label} → ${outFile} (${(html.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ✗ ${label}: ${err.message}`);
  } finally {
    await page.close();
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const CHROME = await resolveChrome();
  if (!CHROME) {
    console.error('Error: No Chromium found (tried local paths + @sparticuz/chromium).');
    process.exit(1);
  }

  const port = await findFreePort(PREVIEW_PORT);

  console.log(`\n🔧 Prerender — dist: ${DIST}`);
  console.log(`🔧 Chromium: ${CHROME}`);
  console.log(`🔧 Preview port: ${port}\n`);

  // Ensure dist/index.html exists (vite build output)
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error('Error: dist/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Capture the pristine shell NOW (vite just built it) and wipe stale
  // route outputs: without this, a rebuild would snapshot its own previous
  // output and duplicate Helmet tags on every run (non-idempotent).
  const shellHtml = await readFile(path.join(DIST, 'index.html'), 'utf-8');
  for (const route of ROUTES) {
    if (route.path === '/') continue;
    await rm(path.join(DIST, route.path), { recursive: true, force: true });
  }

  // Start preview server
  console.log(`🚀 Starting preview server on port ${port}...`);
  const server = await startPreviewServer(port, shellHtml);

  // Launch browser
  const { default: puppeteer } = await import('puppeteer-core').catch(() => {
    throw new Error('puppeteer-core not installed. Run: npm install --save-dev puppeteer-core');
  });

  const browser = await puppeteer.launch({
    executablePath: CHROME.executablePath,
    headless: true,
    args: [
      ...CHROME.args,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  try {
    console.log('📸 Snapshotting routes...\n');
    for (const route of ROUTES) {
      await snapshotRouteWithPort(browser, route, port);
    }
    console.log('\n✅ Prerender complete.\n');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
