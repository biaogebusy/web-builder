import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Extensions and names that are never valid Angular routes but are common
// webshell/scanner probe targets. Blocking them here prevents full SSR render
// + branding API calls from firing on each scan request.
const SCANNER_EXT_RE = /\.(jsp|jspx|aspx?|php\d*|cgi|cfm|pl|py)$/i;
const SCANNER_NAME_RE = /(webshell|shell|spy|phpspy|aspxspy|jspspy|cmd|eval|upload|exec)/i;

export function blockScanners(req: Request, res: Response, next: NextFunction): void {
  const p = req.path;
  if (SCANNER_EXT_RE.test(p) || SCANNER_NAME_RE.test(p)) {
    res.status(404).end();
    return;
  }
  next();
}

// 100 requests per minute per IP for regular traffic.
// Static assets are served before this middleware runs so they are unaffected.
export const rateLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
