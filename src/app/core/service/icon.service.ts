import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private ds = inject(DomSanitizer);
  private ir = inject(MatIconRegistry);
  private screenService = inject(ScreenService);

  loadSvgResources(): void {
    if (this.screenService.isPlatformServer()) {
      this.ir.addSvgIconSetLiteral(this.ds.bypassSecurityTrustHtml('<svg></svg>'));
    } else {
      // mdi
      // https://pictogrammers.com/docs/library/mdi/getting-started/angular/
      const mdiPath = '/assets/mdi.svg';
      this.ir.addSvgIconSet(this.ds.bypassSecurityTrustResourceUrl(mdiPath));

      // custom
      const svgPath = '/assets/icons/icons.svg';
      const url = this.ds.bypassSecurityTrustResourceUrl(svgPath);
      this.ir.addSvgIconSet(url);
    }
  }
}
