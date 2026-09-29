import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScreenService } from '@core/service/screen.service';
import DOMPurify from 'dompurify';
import isString from 'lodash-es/isString';
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  private screenService = inject(ScreenService);
  private sanitizer = inject(DomSanitizer);

  /** Sanitizes content before rendering it in both the initial HTML and the hydrated page. */
  transform(html: unknown): SafeHtml | undefined {
    if (!isString(html)) {
      return;
    }
    // DOMPurify needs a browser DOM; Angular's server sanitizer keeps SSR content safe and visible.
    const sanitizedContent = this.screenService.isPlatformBrowser()
      ? DOMPurify.sanitize(html)
      : this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }
}
