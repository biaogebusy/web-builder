import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl',
    standalone: false
})
export class SafeUrlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  constructor() {}
  transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
