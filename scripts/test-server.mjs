// Quick test server — serves dist/ with prerendered HTML routing
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const PORT = 5050;

const server = createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const distPath = path.join(DIST, urlPath);

  // Try exact file first
  if (existsSync(distPath) && !require('fs').statSync(distPath).isDirectory()) {
    const ext = path.extname(distPath);
    const mimeTypes = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon' };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(await readFile(distPath));
    return;
  }

  // Try index.html inside path dir (prerendered routes)
  const indexPath = path.join(DIST, urlPath, 'index.html');
  if (existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(await readFile(indexPath));
    return;
  }

  // Fallback to SPA shell
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(await readFile(path.join(DIST, 'index.html')));
});

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
