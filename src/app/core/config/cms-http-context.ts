import { HttpContext, HttpContextToken } from '@angular/common/http';

/** Enables session CSRF protection for a custom CMS write, without forcing Cookie credentials. */
export const CMS_CSRF_PROTECTION = new HttpContextToken<boolean>(() => false);

/** Creates request-local context for custom writes. JSON:API writes are handled automatically. */
export function cmsWriteContext(): HttpContext {
  return new HttpContext().set(CMS_CSRF_PROTECTION, true);
}
