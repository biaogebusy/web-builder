import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScreenService } from '@core/service/screen.service';
import DOMPurify from 'dompurify';
import { isString } from 'lodash';
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  screenService = inject(ScreenService);
  sanitizer = inject(DomSanitizer);

  transform(html: any): any {
    if (this.screenService.isPlatformBrowser() && isString(html)) {
      const sanitizedContent = DOMPurify.sanitize(html);
      return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
    }
  }
}
