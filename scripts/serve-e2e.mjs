// Serves the actual production assets with a CSR entry for browser API fixtures.
import express from 'express';
import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

const browser = resolve(process.env['E2E_DIST'] || 'dist/performance', 'browser');
await access(resolve(browser, 'index.csr.html'));
const app = express();
app.use(express.static(browser, { index: false }));
app.use((req, res) => {
  // Missing assets must remain visible as failures instead of receiving the HTML shell.
  if (req.path.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(req.path)) {
    res.sendStatus(404);
    return;
  }
  res.sendFile(resolve(browser, 'index.csr.html'));
});
const server = app.listen(4201, 'localhost');
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
