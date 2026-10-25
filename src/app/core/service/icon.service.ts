import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ScreenService } from '@core/service/screen.service';
import { shareReplay } from 'rxjs';

// Guards the resolver URL: icon names come from CMS data.
const ICON_NAME = /^[a-z0-9_-]+$/;

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private ds = inject(DomSanitizer);
  private ir = inject(MatIconRegistry);
  private screenService = inject(ScreenService);
  private readonly iconNames = inject(HttpClient)
    .get<string[]>('/assets/svg-icons/names.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  /** Fetches the picker catalog on subscription and shares it across icon fields. */
  getIconNames() {
    return this.iconNames;
  }

  loadSvgResources(): void {
    if (this.screenService.isPlatformServer()) {
      this.ir.addSvgIconSetLiteral(this.ds.bypassSecurityTrustHtml('<svg></svg>'));
    } else {
      // One file per icon (MDI + custom, split by scripts/split-svg-icons.mjs), so a page
      // only downloads the icons it renders instead of the 3 MB MDI sprite.
      this.ir.addSvgIconResolver((name, namespace) =>
        !namespace && ICON_NAME.test(name)
          ? this.ds.bypassSecurityTrustResourceUrl(`/assets/svg-icons/${name}.svg`)
          : null
      );
    }
  }
}
