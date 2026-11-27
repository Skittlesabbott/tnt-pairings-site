// Tiny static file server for Laravel Cloud (Node runtime). No dependencies.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(file, (err, data) => {
    if (err) {
      // Unknown paths fall back to the home page
      return fs.readFile(path.join(ROOT, 'index.html'), (e2, home) => {
        res.writeHead(e2 ? 500 : 404, { 'Content-Type': TYPES['.html'] });
        res.end(e2 ? 'Server error' : home);
      });
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800'
    });
    res.end(data);
  });
});

// Laravel Cloud reaches apps over IPv6, so listen on '::' (which also accepts IPv4).
// Fall back to IPv4-only on machines without IPv6.
server.on('error', (err) => {
  if (err.code === 'EAFNOSUPPORT') server.listen(PORT, '0.0.0.0');
  else throw err;
});
server.on('listening', () => console.log(`TnT Pairings running on port ${PORT}`));
server.listen(PORT, '::');
