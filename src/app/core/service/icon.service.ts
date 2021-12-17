import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private ds: DomSanitizer,
    private ir: MatIconRegistry,
    private screenService: ScreenService
  ) {}

  loadSvgResources(): void {
    const svgPath = '/assets/icons/icons.svg';
    const domain = this.screenService.isPlatformServer()
      ? 'http://localhost:4000/'
      : '';
    const url = this.ds.bypassSecurityTrustResourceUrl(domain + svgPath);
    this.ir.addSvgIconSet(url);
  }
}
